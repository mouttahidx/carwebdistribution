import { getAllTaxes, getShippingZoneLocations } from "@/lib/api";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

export default function CartTaxes({ selectedMethod, subtotal, location, setTaxesTotal , setTaxesRates:setParentTaxesRates,setSelectedMethod }) {
  const [loading, setLoading] = useState(false);
  const [taxesList, setTaxesList] = useState(null);
  const [taxeRates, setTaxesRates] = useState([]);


  /* get selected shipping location id , fetch its infos the state name with taxes rates and calculate total price with taxes  */
  const handleTaxesCalculation = () => {
    setLoading(true);
    getShippingZoneLocations(location).then((res) => {
      // check if response is defined else show error
      if (res) {
        if (res.status >= 200 && res.status <= 250) {
          const shippingState = res.data[0];
          console.log(shippingState)
          // check if state
          if (
            res.data.length > 0 &&
            shippingState &&
            shippingState.type === "state"
          ) {
            const code = shippingState.code.split(":")[1];
            const stateTaxes = taxesList.filter((taxe) => taxe.state === code);

            setTaxesRates(stateTaxes);
          }

          // check if country
          if (
            res.data.length > 0 &&
            shippingState &&
            shippingState.type === "country"
          ) {
            setTaxesRates({ name: "-", rate: 0 });
          }
        }
      } else {
        toast.error(
          "Une erreur est survenue , merci de réessayer ou contacter le support",
          { autoClose: 8000 }
        );
        setSelectedMethod(null);
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    if (taxeRates?.length > 0) {
      let taxesTotal = 0;
      taxeRates.forEach((taxe) => {
        taxesTotal += +taxe.rate;
      });
      setTaxesTotal(taxesTotal)
    }

    setParentTaxesRates(taxeRates)
  }, [taxeRates]);

  useEffect(() => {
    getTaxesList();
  }, []);

  useEffect(() => {
    if (selectedMethod) {
      handleTaxesCalculation();
    } else {
      setTaxesRates([]);
    }
  }, [selectedMethod]);
  /* ----------------------------- fetch all taxes ---------------------------- */
  const getTaxesList = async () => {
    setLoading(true);
    const { data, status } = await getAllTaxes();
    if (status >= 200 && status <= 250) {
      data.length > 0 && setTaxesList(data);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-between">
      <p className="text-sm">Taxes: </p>
      <span className="text-base font-semibold">
        {!selectedMethod && (
          <p className="text-sm font-normal">
            (Sélectionnez votre province/livraison)
          </p>
        )}
        <div className="flex flex-col text-sm divide-y-2">
          {!loading &&
            selectedMethod &&
            taxeRates.length > 0 &&
            taxeRates.map((taxe) => (
              <span key={taxe.id} className="flex justify-between py-2 gap-x-5">
                <span>{taxe.name} : </span>
                <span>
                  {new Intl.NumberFormat("fr-CA", {
                    style: "currency",
                    currency: "cad",
                  }).format(((Number(taxe.rate) * +subtotal) / 100).toFixed(2))}
                </span>
              </span>
            ))}

          {selectedMethod && loading && (
            <Spinner className="fill-rachel-red-700" />
          )}
        </div>
      </span>
    </div>
  );
}
