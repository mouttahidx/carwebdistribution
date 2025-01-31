import Head from "next/head";
import Footer from "./Footer";
import Header from "./header/Header";

export default function Layout({children }) {
  return (
    
    <>
    <Head>
    <meta name="robots" content="all" />
    </Head>
        <Header/>
        <main className="w-full py-5 bg-[#FDFDFD] overflow-x-hidden">
            {children}
        </main>
        <Footer/>
    </>
    )
}
