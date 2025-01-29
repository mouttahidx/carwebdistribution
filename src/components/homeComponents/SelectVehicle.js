import { useEffect, useState } from "react";
import Button from "../Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "../accountComponents/LoadingModal";
export default function SelectVehicle({ setVehicules }) {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const years = [
    "1975",
    "1976",
    "1977",
    "1978",
    "1979",
    "1980",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025"
  ];
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (vehicle.year.trim() !== "") {
      autoComplete();
    }
  }, [vehicle]);

  const autoComplete = () => {
    setLoading(true);
    if (
      vehicle.year.trim() !== "" &&
      vehicle.make.trim() !== "" &&
      vehicle.model.trim() !== ""
    ) {
      handleSubmit();
      return;
    }
    setVehicules([])
    axios
      .get(
        process.env.NEXT_PUBLIC_WEBSITE_URL +
          "wp-json/wc/v3/vehicles/autocomplete",
        {
          params: {
            year: vehicle.year,
            model: vehicle.model,
            make: vehicle.make,
          },
        }
      )
      .then((res) => {
        if (!res.data || res?.data?.length === 0) {
          toast.error("Aucun Résultat", {
            position: "bottom-right",
          });
        }
        if (res.data) {
          if (vehicle.year && vehicle.make && vehicle.model === "") {
            const temp = [...new Set(res.data)];
            setModels(temp);
          }
          if (vehicle.year && vehicle.make === "" && vehicle.model === "") {
            const temp = [...new Set(res.data)];
            setMakes(temp);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = () => {
    if (
      vehicle.year.trim() !== "" &&
      vehicle.make.trim() !== "" &&
      vehicle.model.trim() !== ""
    ) {
      setVehicules([]);
      setLoading(true);

      axios
        .get(
          process.env.NEXT_PUBLIC_WEBSITE_URL + "wp-json/wc/v3/vehicles/find",
          {
            params: {
              year: vehicle.year,
              model: vehicle.model,
              make: vehicle.make,
            },
            // headers: {'Authorization': 'Bearer '+data?.user?.token},
          }
        )
        .then((res) => {
          if (res.data.length === 0) {
            toast.error("Aucun Résultat", {
              position: "bottom-right",
            });
          }
          if (res.data.length > 0) {
            setVehicules(res.data);
            console.log(res.data)
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    } else {
      toast.warn("Merci de réessayer");
    }
  };

  return (
    <section className="lg:rounded-lg">
      <div className="rounded-t-md bg-rachel-black-900 w-full p-4 lg:px-6  ">
        <h3 className="text-white">Choisissez un vehicule</h3>

        <h5 className="text-white text-sm mt-2">
          Personnalisez, Modifiez, Réparez...
        </h5>
      </div>
      <div className="rounded-b-md border-t border-white p-4 lg:px-6 bg-rachel-black-900 flex flex-wrap md:flex-nowrap gap-2">
        <select
          className="flex-grow w-full md:w-3/12 px-2 text-sm rounded-sm p-1 cursor-pointer disabled:cursor-not-allowed"
          disabled={loading}
          defaultValue={"DEFAULT"}
          onChange={({ target }) =>
            {
              setVehicle({ make:"",model:"", year: target.value })
            }
          }
        >
          <option value="DEFAULT" disabled>
            Année
          </option>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="flex-grow w-full md:w-3/12 px-2 text-sm rounded-sm p-1 cursor-pointer disabled:cursor-not-allowed"
          disabled={loading || makes.length === 0}
          onChange={({ target }) =>{
            setVehicle((curr) => ({ ...curr, make: target.value,model:"" }))
            setModels([])
          }}
          value={vehicle.make === "" ? "DEFAULT" : vehicle.make}
          
        >
          <option value="DEFAULT" disabled>
            Marque
          </option>
          {makes.length > 0 &&
            makes.map((make, index) => (
              <option value={make} key={index}>
                {make}
              </option>
            ))}
        </select>
        <select
          className="flex-grow w-full md:w-3/12 px-2 text-sm rounded-sm p-1 cursor-pointer disabled:cursor-not-allowed"
          disabled={loading || models.length === 0}
          value={vehicle.model === "" ? "DEFAULT" : vehicle.model}

          onChange={({ target }) =>
            setVehicle((curr) => ({ ...curr, model: target.value }))
          }
        >
          <option value="DEFAULT" disabled>
            Modéle
          </option>
          {models.length > 0 &&
            models.map((model, index) => (
              <option value={model} key={index}>
                {model}
              </option>
            ))}
        </select>
        <Button
          text={"Chercher"}
          className="py-3 w-full text-center flex justify-center md:w-fit disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={loading}
        />
         <ToastContainer className={"!z-[99999999999999]"}/>
      </div>
      {loading && (
        <LoadingModal loading={"pop-up"} text="Recherche en cours..." />
      )}
    </section>
  );
}
