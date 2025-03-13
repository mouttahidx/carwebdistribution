/* eslint-disable react-hooks/exhaustive-deps */
import { getShippingZoneMethods, getShippingZones } from "@/lib/api";
import { Label, Select, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

export default function CartShipping({
  setSelectedMethod: setParentMethod,
  setShippingCost: setParentShippingCost,
  setAddress,
  setLocationid,
}) {
  const [loading, setLoading] = useState(false);
  const { metadata } = useCart();
  const [shippingZones, setShippingZones] = useState([]);
  const [shippingMethodList, setShippingMethodList] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [location, setLocation] = useState((metadata && metadata?.address) && metadata.address?.id || "DEFAULT");
  const [shippingCost, setShippingCost] = useState();

  const handleShippingZoneChange = () => {
    setLoading(true);
    setShippingMethodList([]);
    setSelectedMethod(null);
    getShippingZoneMethods(location)
      .then((res) => {
        if (res.status === 200) {
          setShippingMethodList(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleShippingMethodChange = (method) => {
    const selected = shippingMethodList.find((x) => +x.id === +method);
    selected && setSelectedMethod(selected);
    selected.settings.cost.value === ""
      ? setShippingCost(0)
      : setShippingCost(Number(selected.settings.cost.value));

    setLocationid(location);

  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await getShippingZones();
      data && setShippingZones(data);
    };

    getData();
  }, []);

  useEffect(() => {
    setParentMethod(selectedMethod);
    setParentShippingCost(shippingCost);

    if (shippingZones?.length > 0) {
      setAddress(shippingZones.find((x) => +x.id === +location));
    }
  }, [selectedMethod, shippingCost]);

  useEffect(()=>{
    handleShippingZoneChange();
  },[location])

  return (
    <>
      <div className="flex justify-between">
        <p className=" text-sm">Adresse de livraison: </p>
        <div className="flex flex-col gap-y-3">
          <div className="max-w-md" id="select">
            <div className="mb-2 block">
              <Label
                htmlFor="countries"
                value="Sélectionnez votre province"
                className="pr-1"
              />
              {loading && <Spinner className="fill-rachel-red-700" />}
            </div>
            <Select
              disabled={loading}
              required
              
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
              }}
            >
              <option disabled value={"DEFAULT"}>
                Sélectionnez
              </option>
              {shippingZones?.length > 0 &&
                shippingZones.slice(1).map((shippingZone) => (
                  <option key={shippingZone.id} value={shippingZone.id}>
                    {shippingZone.name}
                  </option>
                ))}
            </Select>
          </div>

          {/* ----------------------------------------shipping methods --------------------------------------------------*/}
          {shippingMethodList?.length > 0 && (
            <div className="max-w-md" id="select">
              <div className="mb-2 block">
                <Label
                  htmlFor="countries"
                  value="Sélectionnez la méthode de livraison"
                  className="pr-1"
                />
                {loading && <Spinner className="fill-rachel-red-700" />}
              </div>
              <Select
                disabled={loading || !location}
                required
                defaultValue={"DEFAULT"}
                onChange={(e) => {
                  handleShippingMethodChange(e.target.value);
                }}
              >
                <option disabled value={"DEFAULT"}>
                  Sélectionnez
                </option>
                {shippingMethodList?.length > 0 &&
                  shippingMethodList.map((shippingMethod) => (
                    <option key={shippingMethod.id} value={shippingMethod.id}>
                      {shippingMethod.title} - $
                      {shippingMethod.settings.cost.value === ""
                        ? 0
                        : new Intl.NumberFormat("fr-CA", {
                            style: "currency",
                            currency: "cad",
                          }).format(shippingMethod.settings.cost.value)}
                    </option>
                  ))}
              </Select>
              <p className="bg-rachel-red-700 bg-opacity-70 text-white text-xs p-1 rounded mt-4 font-semibold">
                Les produits "Oversize" peuvent avoir des frais supplémentaires
                pour la livraison. Frais de livraison final confirmé lors de
                l'envoie.
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-sm">Livraison: </p>
        <span className="text-base font-semibold">
          {!selectedMethod && (
            <p className="text-sm font-normal">
              (Sélectionnez votre province/livraison)
            </p>
          )}
          {selectedMethod &&
            new Intl.NumberFormat("fr-CA", {
              style: "currency",
              currency: "cad",
            }).format(Number(selectedMethod.settings.cost.value).toFixed(2))}
        </span>
      </div>
    </>
  );
}
