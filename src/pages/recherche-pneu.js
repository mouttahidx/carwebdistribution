'use client';
import Script from "next/script";
import Layout from "@/layout";
import Head from "next/head";

export default function recherchePneu() {


  return (
    <Layout>
      <Head>
        <title>Recherche de pneus | {process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title>
      </Head>
      <Script
        src="https://app.tireconnect.ca/js/widget.js"
      />
      <div id="tireconnect"></div>
      <Script strategy="lazyOnload" id="searchResultScript">
        {`TCWidget.init({
          apikey: '8cdb18299dcd865d3d8c20f9320a2a41',
          container: 'tireconnect',
          locationDetect: 'auto',
          locale: 'fr_CA'
        })`}
      </Script>
      
    </Layout>
  );
}
