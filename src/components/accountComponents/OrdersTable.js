import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import "moment/locale/fr";
import moment from "moment/moment";
import { Button, Modal } from "flowbite-react";
import "moment/locale/fr";
import { EyeIcon } from "@heroicons/react/24/outline";


export default function OrdersTable({
  orders,
  loading,
}) {
  const Loader = () => (
    <ContentLoader
      speed={2}
      viewBox="0 0 300 60"
      backgroundColor="#f3f3f3"
      foregroundColor="#e3e3e3"
      uniqueKey="form"
      className="w-full"
    >
      <rect x="5" y="15" rx="3" ry="3" width="80" height="5" />
    </ContentLoader>
  );

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    id: 0,
    date: "",
    line_items: [],
    subtotal: 0,
    shipping: 0,
    taxes: 0,
    total: 0,
    status: "",
  });
  /* -------------------------------------------------------------------------- */

  const translateStatus = (status) => {
    switch (status) {
      case "pending":
        return "Attente paiement";
        break;

      case "processing":
        return "en cours";
        break;

      case "on-hold":
        return "en attente";
        break;

      case "completed":
        return "complétée";
        break;

      case "cancelled":
        return "annulée";
        break;

      case "refunded":
        return "remboursé";
        break;

      case "failed":
        return "échouée";
        break;

      case "trash":
        return "Supprimée";
        break;

      default:
        return "";
        break;
    }
  };

  return (
    <div>
      <div className="bg-white lg:p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-2xl text-gray-600 font-semibold overflow-hidden text-ellipsis border-b w-fit ">
              Commandes
            </h2>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 lg:px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal table-auto">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Commande #
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      état
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <>
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Loader />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Loader />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Loader />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Loader />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Loader />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Loader />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Loader />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Loader />
                        </td>
                      </tr>
                    </>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="w-full text-center py-4">
                        <span>Aucune commandes trouvées.</span>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {orders.map((order, i) => (
                        <tr key={order.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center gap-x-2 ">
                              <EyeIcon
                                className="w-4 h-4 text-gray-500 hover:text-green-700 cursor-pointer"
                                onClick={() => {
                                  setOpenModal(true);
                                  setModalData({
                                    id: order.id,
                                    date: order.date_created,
                                    line_items: order.line_items,
                                    subtotal: order.total - order.total_tax,
                                    shipping: order.shipping_total,
                                    total: order.total,
                                    taxes: order.total_tax,
                                    status: order.status,
                                  });
                                }}
                              />

                              <p className="text-gray-900 whitespace-no-wrap w-[100px] md:w-fit text-ellipsis overflow-hidden">
                                #{order.id} - {order.billing.first_name}&nbsp;
                                {order.billing.last_name}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(order.date_created).diff(
                                moment(new Date()),
                                "days"
                              ) < 0
                                ? moment(order.date_created).format(
                                    "DD MMM YYYY"
                                  )
                                : moment(order.date_created).fromNow()}
                            </p>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span
                              className={`relative inline-block px-3 py-1 font-semibold rounded-full leading-3 ${
                                order.status === "on-hold" ||
                                order.status === "pending" ||
                                order.status === "processing"
                                  ? "bg-yellow-100"
                                  : order.status === "cancelled" ||
                                    order.status === "refunded" ||
                                    order.status === "failed" ||
                                    order.status === "trash"
                                  ? "bg-red-200"
                                  : "bg-green-200"
                              }`}
                            >
                              <span className="text-green-900 text-xs lg:text-sm">
                                {translateStatus(order.status)}
                              </span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              ${order.total}
                            </p>
                          </td>
                        </tr>
                      ))}

                      <Modal
                        show={openModal}
                        onClose={() => setOpenModal(false)}
                      >
                        <Modal.Header>Commande #{modalData.id}</Modal.Header>
                        <Modal.Body>
                          <div className="space-y-6">
                            <div className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 flex justify-between items-center">
                              {moment(modalData.date).format(
                                "DD MMM YYYY - HH:MM"
                              )}

                              <span
                                className={`relative inline-block px-3 py-1 font-semibold rounded-full leading-3 ${
                                  modalData.status === "on-hold" ||
                                  modalData.status === "pending" ||
                                  modalData.status === "processing"
                                    ? "bg-yellow-100"
                                    : modalData.status === "cancelled" ||
                                      modalData.status === "refunded" ||
                                      modalData.status === "failed" ||
                                      modalData.status === "trash"
                                    ? "bg-red-200"
                                    : "bg-green-200"
                                }`}
                              >
                                <span className="text-green-900 text-xs lg:text-sm">
                                  {translateStatus(modalData.status)}
                                </span>
                              </span>
                            </div>
                            {modalData.line_items.map((item) => (
                              <div key={item.id} className="mt-6 flex flex-row justify-start items-center space-x-6 xl:space-x-8 w-full">
                                <img
                                  className="w-[100px]"
                                  src={item?.image?.src || "/slider1.jpg"}
                                  alt={item.name}
                                />
                                <div className="border-b border-gray-200 flex-row  flex justify-between  w-full pb-8  ">
                                  <h3 className="md:text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                    {item.name}
                                  </h3>

                                  <div className="flex justify-between items-start ">
                                    <p className="text-base dark:text-white xl:text-lg leading-6"></p>

                                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                      ${(+item.total).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                <h3 className="text-left mb-4 text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                  Récapitulatif de la commande
                                </h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                  <div className="flex justify-between w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">
                                      Sous-total:
                                    </p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                      $
                                      {(
                                        modalData.subtotal - modalData.shipping
                                      ).toFixed(2)}
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">
                                      Livraison:
                                    </p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                      $
                                      {modalData.shipping &&
                                        (+modalData.shipping).toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">
                                      Taxes:
                                    </p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                      ${(+modalData.taxes).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                                    Total (TTC):
                                  </p>
                                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                    {(+modalData.total).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            color="gray"
                            onClick={() => setOpenModal(false)}
                          >
                            Retour
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
