import Button from "@/components/Button";
import Layout from "@/layout";
import { Accordion } from "flowbite-react";
import { useRouter } from "next/router";
import React from "react";

export default function Faq() {
  const router = useRouter();

  return (
    <Layout>
      <section className="flex justify-center">
        <div className="py-16 px-2 grid md:grid-cols-2 gap-y-12 items-start max-w-7xl">
          <div className="px-5 md:px-4 lg:px-20">
            <h1 className="lg:text-4xl text-4xl mb-2 font-bold">
              {"Questions fréquemment posées "}
            </h1>
            <h2 className="text-sm my-10">
              {
                "Chaque visite chez Rachel Auto se traduit par de précieux conseils, des services à juste prix et en prime toute notre appréciation."
              }
            </h2>
            <div className="flex mt-6 w-full ">
              <Button
                text={"Magasiner"}
                className="mr-4"
                onClick={() => {
                  router.push("/boutique");
                }}
              />
              <Button
                text={"Contacter Nous"}
                className="!bg-rachel-black-950 "
                onClick={() => {
                  router.push("/contact");
                }}
              />
            </div>
          </div>
          <div>
            <Accordion className="w-full">
              <Accordion.Panel>
                <Accordion.Title>
                  Quels types de pièces automobiles proposez-vous ?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Notre site propose une large sélection de pièces
                    automobiles, couvrant une gamme étendue de marques et de
                    modèles. Nous nous efforçons de fournir des pièces pour
                    toutes vos besoins automobiles.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  Comment garantissez-vous des prix compétitifs pour vos
                  produits ?{" "}
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Nous maintenons des prix compétitifs grâce à nos relations
                    étroites avec les fournisseurs et une analyse constante du
                    marché. Cela nous permet de proposer les meilleurs prix à
                    nos clients.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  Quelles sont les options de livraison disponibles et combien
                  de temps prennent-elles généralement ?{" "}
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Nous offrons plusieurs options de livraison, adaptées à vos
                    besoins. Le délai de livraison varie selon l'option choisie,
                    mais nous nous engageons à fournir un service rapide et
                    fiable.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                 Financement
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Nous offrons plusieurs options de livraison, adaptées à vos
                    besoins. Le délai de livraison varie selon l'option choisie,
                    mais nous nous engageons à fournir un service rapide et
                    fiable.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
}
