import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="fr" className="scroll-smooth">
        <Head />
      <body style={{ position: "relative" }} className="!overflow-y-auto !px-0 !overflow-x-hidden">
        <Main />
        <NextScript />
        <Script
          strategy="lazyOnload"
          id="tidio"
          src="//code.tidio.co/sqgpckhedgoq9xuxitjpegfroa9fpiej.js"
        />
        <Script
          id="smart-look"
          strategy="lazyOnload"
        >{`window.smartlook||(function(d) {
    var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
    var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
    c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
    })(document);
    smartlook('init', '962e14703b54cc931cc23f5e8c273be75f8918e5', { region: 'eu' });`}</Script>
      </body>
    </Html>
  );
}
