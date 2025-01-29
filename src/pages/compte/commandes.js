import DashboardLayout from "@/components/accountComponents/DashboardLayout";
import OrdersTable from "@/components/accountComponents/OrdersTable";
import { getCustomerOrders } from "@/lib/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";

export default function Commandes() {
  const [orders, setOrders] = useState([]);
  const { status, data } = useSession();
  const [loading,setLoading] = useState(false);

   /* ----------------------------- pagination data ---------------------------- */
   const page = useRef(1);
   const [perPage, setPerPage] = useState(10);
   const [pageTotal, setPageTotal] = useState(1);
   const [totalProduct, setTotalproducts] = useState(0);


   /* -------------------------------------------------------------------------- */
   /*                           handle next prev button                          */
   /* -------------------------------------------------------------------------- */
   function handlePageClick({ selected }) {
    page.current = selected + 1;

    fetchOrders(data.user.id);
  }
/* -------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------- */
  /*                            fetch order api call                            */
  /* -------------------------------------------------------------------------- */
  const fetchOrders = async (id) => {
    setLoading(true)
    const { data , headers } = await getCustomerOrders(id,page.current);
    if(data.length>0)
    {
      setOrders(data)
      setPageTotal(headers?.["x-wp-totalpages"]);
      setTotalproducts(headers?.["x-wp-total"]);
    }
    setLoading(false)
  };
/* -------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------- */
  /*                                  useffects                                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (status === "authenticated" && data.user ) {
      fetchOrders(data?.user?.id);
    }
  }, [status]);
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                              component render                              */
/* -------------------------------------------------------------------------- */
  return (
    <DashboardLayout>
      <Head>
        <title>Mes Commandes</title>
      </Head>

      <OrdersTable orders={orders} loading={loading}/>
      
      {!loading &&
                (pageTotal > 0 ? (
                  <ReactPaginate
                    previousLabel={"← Précedent"}
                    nextLabel={"Suivant →"}
                    pageCount={+pageTotal}
                    forcePage={page.current - 1}
                    onPageChange={handlePageClick}
                    containerClassName={
                      "pagination w-full flex gap-x-2 justify-center my-8"
                    }
                    previousLinkClassName={
                      "pagination__link hover:text-rachel-red-700"
                    }
                    nextLinkClassName={"pagination__link hover:text-rachel-red-700"}
                    disabledClassName={
                      "pagination__link--disabled text-gray-500 cursor-default hover:text-gray-500"
                    }
                    activeClassName={"pagination__link--active text-rachel-red-700"}
                  />
                ) : (
                  ""
                ))}
    </DashboardLayout>
  );
}
