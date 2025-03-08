/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/layout";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useCart } from "react-use-cart";
import "react-toastify/dist/ReactToastify.css";
import CartTable from "@/components/shopComponents/CartTable";
import PromoCode from "@/components/shopComponents/PromoCode";
import CartSummary from "@/components/shopComponents/CartSummary";
import Head from "next/head";

const Panier = () => {
  const { cartTotal, totalUniqueItems,} = useCart();
  const [couponApplied, setCouponApplied] = useState({
    applied: false,
    amount: 0,
    code: "",
  });

  return (
    <Layout suppressHydrationWarning={true}>
      <Head>
        <title>Panier - {process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title>
      </Head>
      <ToastContainer className={"!z-[99999999999999]"} />
      <div className="w-full lg:flex gap-x-5 pb-32 max-w-[1400px] mx-auto">
        {/* ------------------------------- Cart lines ------------------------------- */}
        <div className="lg:w-8/12">
          <PromoCode
            couponApplied={couponApplied}
            setCouponApplied={setCouponApplied}
            disabled={cartTotal === 0}
          />
          <CartTable />
        </div>

        {/* ------------------------------ Cart summary ------------------------------ */}
        {totalUniqueItems > 0 && (
          <div className="lg:w-4/12">
            <CartSummary setCouponApplied={setCouponApplied} couponApplied={couponApplied} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Panier), {
  ssr: false,
});
