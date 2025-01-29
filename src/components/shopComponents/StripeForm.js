"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const StripeForm = forwardRef(({ checkStripe }, ref) => {
  useImperativeHandle(ref, () => {
    return {
      onSubmit: onSubmit,
    };
  });
  
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const onSubmit = async (billing,total) => {
    const cardElement = elements?.getElement("card");
    const isInvalid = cardElement?._invalid;
    const isEmpty = cardElement?._empty;

    const isValid = !(isEmpty || isInvalid);
    try {
      if (!stripe || !cardElement || !isValid) return null;
      const { data } = await axios.post("/api/payment-intent", {
        data: { amount: (+total).toFixed(2) },
      });

      const clientSecret = data.data;

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: billing.billing_firstname + " " + billing.billing_lastname,
              email: billing.billing_email,
              address: {
                line1: billing.shipping_address_1,
                city: billing.billing_city,
                state: billing.billing_state,
                postal_code: billing.billing_postcode,
                country: "CA",
              },
            },
          },
        });

      if (stripeError) {
        // Show error to your customer (e.g., insufficient funds)
        setError(stripeError.message);
        return;
      }
      if (paymentIntent.status === "succeeded") {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };


  return (
    <form>
      <CardElement
        className="text-blue-500"
        onChange={(e) => {
          if (e.error) {
            setError(e.error.message);

            checkStripe(false);
          } else {
            setError();

            checkStripe(true);
          }
        }}
      />
      {error && (
        <span id="card-errors" className="block text-sm bg-gray-100  rounded text-red-600 w-full mt-8 p-2" role="alert">
          {error}
        </span>
      )}
    </form>
  );
});
export default StripeForm;
