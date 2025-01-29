import Layout from "@/layout";
import Head from "next/head";
import React from "react";

export default function Retours() {
  return (
    <>
      <Head>
        <title key={"Livraison et Retours"}>{`${
          "Livraison et Retours - " + process.env.NEXT_PUBLIC_WEBSITE_TITLE || "Check .ENV"
        }`}</title>
      </Head>
      <Layout>
        <div className="py-16 px-5 max-w-7xl mx-auto">
          <h1 className="text-4xl text-center font-semibold mb-8 ">
            Livraison et Retours
          </h1>
          <p className="text-center font-bold mb-10">
            Notre politique dure 30 jours. Si plus de 30 jours se sont écoulés
            depuis votre achat, nous ne pouvons malheureusement offrir ni
            remboursement ni échange.
          </p>
          {/* /* -------------------------------------------------------------------------- */}
          <p className="mb-5">
            Pour pouvoir être retourné, votre article doit être inutilisé et
            dans l'état où vous l'avez reçu. Il doit aussi être dans son
            emballage d'origine.
          </p>
          <p className="mb-5">
            Le retour de certains types de marchandises n'est pas autorisé.
            Ainsi, les denrées périssables, telles que les aliments, les fleurs,
            les journaux oles magazines, ne peuvent pas être retournées. De
            même, nous n'acceptons pas les produits intimes ou sanitaires, les
            matières ou substancesdangereuses, ni les liquides ou les gaz
            inflammables.
          </p>
          <div className="mb-5">
            Autres articles dont le retour n'est pas autorisé :
            <ul>
              <li>* Cartes-cadeaux</li>
              <li>* Logiciels téléchargeables</li>
              <li>* Certains produits de santé et de soin personnel</li>
            </ul>
          </div>
          <p className="mb-5">
            Pour compléter votre retour, nous exigeons un reçu ou une preuve
            d'achat. Ne retournez pas votre achat au fabricant.
          </p>
          <div className="mb-5">
            Dans certains cas, seuls des remboursements partiels sont accordés :
            (le cas échéant)
            <ul>
              <li>* Livres montrant des signes d'utilisation évidents </li>
              <li>
                * CD, DVD, cassettes VHS, logiciels, jeux vidéo, cassettes audio
                ou disques en vinyle ayant été ouverts.
              </li>
              <li>
                * Tout article qui n'est pas dans son état d'origine, qui est
                endommagé ou auquel il manque des pièces pour une raison non due
                à une erreur dnotre part.
              </li>
              <li>
                * Tout article retourné plus de 30 jours après sa livraison
              </li>
            </ul>
          </div>
          <h3 className="my-6 font-bold">Remboursements (le cas échéant)</h3>
          <p className="mb-5">
            Une fois votre retour reçu et inspecté, nous vous adresserons un
            e-mail pour vous indiquer que nous avons reçu l'article retourné.
            Nous vous préciserons également si votre remboursement est approuvé
            ou refusé. S'il est approuvé, votre remboursement est alors traité
            et votre carte de crédit ou moyen de paiement initial se voit
            crédité(e) automatiquemendans un délai de quelques jours.
          </p>

          <h3 className="my-6 font-bold">
            Remboursements retardés ou manquants (le cas échéant)
          </h3>
          <p className="mb-5">
            Si vous n'avez pas encore reçu de remboursement, revérifiez d'abord
            votre compte bancaire. Puis contactez la société émettrice de votre
            carte de crédit, car il se peut que l'affichage officiel de votre
            remboursement prenne un peu de temps.
            <br />
            Ensuite, contactez votre banque. L'affichage d'un remboursement est
            souvent précédé d'un délai de traitement. Si vous avez effectué
            toutes ces démarches et que vous n'avez toujours pas reçu votre
            remboursement, contactez-nous à l'adresse suivante :
            info@carwebdistribution.ca.
          </p>
          <h3 className="my-6 font-bold">
            Articles soldés ou en promotion (le cas échéant)
          </h3>
          <p className="mb-5">
            Seuls les articles à prix normal sont remboursables.
            Malheureusement, les articles soldés ou en promotion ne le sont pas.
          </p>
          <h3 className="my-6 font-bold">Échanges (le cas échéant)</h3>
          <p className="mb-5">
            Nous ne remplaçons que les articles initialement défectueux ou
            endommagés. Si vous devez remplacer le vôtre par le même article,
            adresseznous un e-mail à info@carwebdistribution.ca et envoyez votre
            article à : 3170 Rachel Est Montréal, QC, Montréal, QC, H2W 1E2,
            Canada.
          </p>
          <h3 className="my-6 font-bold">Cadeaux</h3>
          <p className="mb-5">
            Si l'article a été marqué comme cadeau au moment de l'achat et s'il
            vous a été expédié directement, vous recevrez un crédit cadeau d'une
            valeur équivalente à celle de l'article retourné. Une fois l'article
            retourné reçu, un bon cadeau vous sera envoyé par voie postale.
          </p>
          <p className="mb-5">
            Si l'article n'a pas été marqué comme cadeau au moment de l'achat,
            ou si la personne à l'origine du cadeau s'est fait envoyer la
            commande dans le but de vous la remettre plus tard, c'est à elle que
            nous adresserons le remboursement et elle saura donc que vous avez
            retourné son cadeau.
          </p>
          <h3 className="my-6 font-bold">Expédition</h3>
          <p className="mb-5">
            Pour retourner votre produit, vous devez l'envoyer à l'adresse
            postale suivante : 3170 Rachel Est Montréal, QC, Montréal, QC, H2W
            1E2, Canada.
          </p>
          <p className="mb-5">
            Les coûts d'expédition liés au retour de votre article sont à votre
            charge. Ils ne sont pas remboursables. Si vous recevez un
            remboursement, lecoût d'expédition du retour en sera déduit.
          </p>
          <p className="mb-5">
            Selon l'endroit où vous vivez, le délai de réception de votre
            produit échangé peut varier
          </p>
          <p className="mb-5">
            Si vous expédiez un article d'une valeur supérieure à 75 €, nous
            vous recommandons d'utiliser un service de suivi d'expédition ou de
            faire assurer votre envoi. Nous ne garantissons pas que nous
            recevrons l'article retourné.
          </p>
          <h3 className="my-6 font-bold">Ramassage au 3170 Rachel</h3>
          <p className="mb-5">
            Optez pour la commodité avec notre service de ramassage au 3170 Rue
            Rachel E, Montréal, QC H1W 1A2. Choisissez cette option lors de
            votre commande, puis récupérez rapidement vos articles à l'heure
            convenue.
          </p>
        </div>
      </Layout>
    </>
  );
}
