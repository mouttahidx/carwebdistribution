import { getSafeChargeTokken } from "@/hooks/getSafeChargeTokken";
import { sha256 } from "js-sha256";
import moment from "moment";
import React, {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useState,
} from "react";
import { toast } from "react-toastify";

export const SafeChargeCC = forwardRef(({ setStripePaid, setLoading }, ref) => {
  const [cardNumber, setCardNumber] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [expDateMM, setExpDateMM] = useState("");
  const [expDateYY, setExpDateYY] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardHN, setCardHN] = useState("");
  const clientId = useId();
  const [safeCharge, setSafeCharge] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(false);
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const scriptElem = Object.assign(document.createElement("script"), {
        type: "text/javascript",
        defer: true,
        src,
        onerror: (e) => {
          reject(e);
        },
      });
      scriptElem.onload = () => {
        resolve();
      };
      document.body.appendChild(scriptElem);
    });

  useImperativeHandle(ref, () => {
    return {
      onSubmit: createPayment,
    };
  });

  // fields validation
  const validation = () => {
    if (
      cardNumber.trim().length === 0 ||
      cardHN.trim().length === 0 ||
      expDateMM.trim().length === 0 ||
      expDateYY.trim().length === 0
    ) {
      setError(true);
      toast.warn("Merci de remplir les champs de la carte bancaire");
      return false;
    }

    setError(false);
    return true;
  };

  useEffect(() => {}, [error]);

  // submit payment
  const createPayment = async (billing, total) => {
    if (!validation()) {
      return false;
    }
    const token = await getTokken(billing, total);
    if (token) {
      setError(false);
      try {
        safeCharge.createPayment(
          {
            sessionToken: token,
            paymentOption: {
              card: {
                cardNumber: cardNumber,
                cardHolderName: cardHN,
                expirationMonth: expDateMM,
                expirationYear: expDateYY,
                CVV: cardCVV,
              },
            },
            billingAddress: {
              email: billing.billing_email,
              country: "CA",
            },
          },
          (resp) => {
            respCallback(resp);
          }
        );
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const respCallback = (resp) => {
    if (resp.result === "APPROVED") {
      setStripePaid(true);
      toast.success("Paiement effectué avec succès, préparation de la commande...");
    } else if (resp.result === "DECLINED") {
      setError(true);
      setLoading(false)
      toast.error("Carte non valide.");
      setStripePaid(false);
    } else if (resp.result === "ERROR") {
      setStripePaid(false);
      setLoading(false)
      setError(true);

      resp.errorDescription && toast.error(resp.errorDescription);
    } else {
      if (resp.reason) {
        setError(true);
        setLoading(false)
        setStripePaid(false);
        toast.warn(resp.reason);
      }
    }
  };

  // get tokken function
  const getTokken = async (billing, total) => {
    const time = moment(new Date()).format("YYYYMMDDHHmmss");
    let reqObject;

    if (process.env.NEXT_PUBLIC_ENV === "prod") {
      reqObject = {
        merchantSiteId: process.env.NEXT_PUBLIC_MERCHANT_SITE_ID,
        merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
        clientRequestId: clientId,
        timeStamp: time,
        checksum: sha256(
          process.env.NEXT_PUBLIC_MERCHANT_ID +
            process.env.NEXT_PUBLIC_MERCHANT_SITE_ID +
            clientId +
            total +
            "CAD" +
            time +
            process.env.NEXT_PUBLIC_KEY_SECRET_NUVEI
        ),
        amount: total,
        currency: "CAD",
        country: "CA",
        fullName: billing.billing_firstname + " " + billing.billing_lastname,
        email: billing.billing_email,
        billingAddress: {
          email: billing.billing_email,
          country: "CA",
        },
      };
    } else {
      reqObject = {
        merchantSiteId: process.env.NEXT_PUBLIC_MERCHANT_SITE_ID_TEST,
        merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID_TEST,
        clientRequestId: clientId,
        timeStamp: time,
        checksum: sha256(
          process.env.NEXT_PUBLIC_MERCHANT_ID_TEST +
            process.env.NEXT_PUBLIC_MERCHANT_SITE_ID_TEST +
            clientId +
            total +
            "CAD" +
            time +
            process.env.NEXT_PUBLIC_KEY_SECRET_NUVEI_TEST
        ),
        amount: total,
        currency: "CAD",
        country: "CA",
        fullName: billing.billing_firstname + " " + billing.billing_lastname,
        email: billing.billing_email,
        billingAddress: {
          email: billing.billing_email,
          country: "CA",
        },
      };
    }
    try {
      const res = await getSafeChargeTokken(reqObject);

      if (res) {
        return res;
      } else {
        toast.warn("Merci de réssayer");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // init the safecharge and get token
  useEffect(() => {
    if(process.env.NEXT_PUBLIC_ENV === "prod") {
      sessionToken === "" &&
        loadScript(
          "https://cdn.safecharge.com/safecharge_resources/v1/websdk/safecharge.js" //production
        ).then(() => {
          setSafeCharge(
            window.SafeCharge({
              env: "prod",
              merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
              merchantSiteId: process.env.NEXT_PUBLIC_MERCHANT_SITE_ID,
            })
          );
        });
    } else {
      sessionToken === "" &&
        loadScript(
          "https://cdn.safecharge.com/safecharge_resources/v1/websdk/safecharge.js" //production
        ).then(() => {
          setSafeCharge(
            window.SafeCharge({
              env: "int",
              merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID_TEST,
              merchantSiteId: process.env.NEXT_PUBLIC_MERCHANT_SITE_ID_TEST,
            })
          );
        });
    }
  }, [sessionToken]);

  useEffect(() => {
    if (paymentSuccess) {
      console.log("paid now: ", paymentSuccess);
      setPaymentSuccess(false);
    }
  }, [paymentSuccess]);

  return (
    <>
      <div className="flex flex-col gap-y-4 ">
        <div className="flex flex-col items-start w-full justify-start">
          <label htmlFor="cardHolderName">Nom du titulaire</label>
          <input
            id="cardHolderName"
            placeholder="Nom du titulaire"
            type="text"
            value={cardHN}
            onChange={(e) => setCardHN(e.target.value)}
            className={`w-full !rounded ${error && "border border-red-700"}`}
          />
        </div>

        <div className="flex flex-col items-start w-full justify-start">
          <label htmlFor="card-number">Numéro de carte</label>
          <input
            id="card-number"
            placeholder="Numéro de carte"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className={`w-full !rounded ${error && "border border-red-700"}`}
          />
        </div>
        <div className="flex w-full gap-4">
          <div className="flex flex-col items-start min-w-[120px] mr-12 justify-start">
            <label htmlFor="exp-dateMM">Date d'expiration</label>
            <div className="flex gap-x-1">
              <input
                id="exp-dateMM"
                placeholder="MM"
                type="text"
                value={expDateMM}
                onChange={(e) => setExpDateMM(e.target.value)}
                className={`w-14 exp-date !rounded" ${
                  error && "border border-red-700"
                }`}
              />
              <input
                id="exp-dateYY"
                placeholder="AA"
                type="text"
                value={expDateYY}
                onChange={(e) => setExpDateYY(e.target.value)}
                className={`w-14 exp-date !rounded" ${
                  error && "border border-red-700"
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full justify-start">
            <label htmlFor="card-cvc">CVC</label>
            <input
              id="card-cvc"
              placeholder="CVC"
              type="text"
              value={cardCVV}
              onChange={(e) => setCardCVV(e.target.value)}
              className={`w-20 !rounded ${error && "border border-red-700"}`}
            />
          </div>
        </div>
      </div>
    </>
  );
});
