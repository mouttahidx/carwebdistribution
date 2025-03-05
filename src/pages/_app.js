import ErrorBoundary from "@/components/ErrorBoundary";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { CartProvider } from "react-use-cart";
import localFont from "next/font/local";
import CookieConsent from "@/components/CookieConsent";
import Head from "next/head";

const roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});
export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <style jsx global>{`
        html,
        body {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <NextNProgress
        color="#500000"
        options={{ showSpinner: false }}
        height={5}
      />
      <SessionProvider session={pageProps.session}>
        <CartProvider>
          <Head>
          <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

          </Head>
          <main className={`${roboto.variable} font-sans`}>
            {Component.PageLayout ? (
              <Component.PageLayout>
                <Component {...pageProps} />
              </Component.PageLayout>
            ) : (
              <Component {...pageProps} />
            )}
            <CookieConsent />
          </main>
     
        </CartProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
