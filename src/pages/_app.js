import ErrorBoundary from "@/components/ErrorBoundary";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { CartProvider } from "react-use-cart";
import localFont from "next/font/local";
import CookieConsent from "@/components/CookieConsent";
import Head from "next/head";
import { VehicleProvider } from "@/components/Providers";

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
        color="#d00000"
        options={{ showSpinner: false }}
        height={5}
      />
      <SessionProvider session={pageProps.session}>
        <CartProvider>
          <VehicleProvider>
            <Head>
            <script src="https://analytics.ahrefs.com/analytics.js" data-key="wpr0aQUTdU1PskABGAU9Hg" async></script>
              <link
                rel="sitemap"
                type="application/xml"
                title="Sitemap"
                href="/sitemap.xml"
              />
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
          </VehicleProvider>
        </CartProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
