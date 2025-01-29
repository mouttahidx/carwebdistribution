import React, { useEffect } from "react";
import Button from "../Button";
import { useRouter } from "next/router";
import 'aos/dist/aos.css'
import Aos from "aos";

export default function CreateAccount() {
  const router = useRouter();
  useEffect(() => {
    Aos.init();
  }, [])
  return (
    <section className="my-16 rounded bg-no-repeat bg-cover cover-top" style={{ backgroundImage: `url('/img/interior.jpg')` }}
    data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="100"

    >
      <div className="py-8 px-4 mx-auto bg-black bg-opacity-30 sm:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="capitalize mb-4 text-4xl tracking-tight font-extrabold leading-tight text-white dark:text-white" style={{ textShadow: "1px 1px 5px black" }}>
            obtenir un accès complet
          </h2>
          <p className="mb-6 font-light text-gray-50 dark:text-gray-400 md:text-lg" style={{ textShadow: "1px 1px 5px black" }}>
            inscrivez-vous et commencez à parcourir notre boutique maintenant
          </p>
          <Button text={"S'inscrire"} className="mx-auto !text-lg mt-10" icon={false} onClick={()=>{router.push("/sinscrire")}}/>
        </div>
      </div>
    </section>
  );
}
