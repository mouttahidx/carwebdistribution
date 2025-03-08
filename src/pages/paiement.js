import Layout from "@/layout";
import { createOrder, getCustomerByEmail, getCustomerData } from "@/lib/api";
import { Button, Label, Spinner } from "flowbite-react";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "react-use-cart";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Head from "next/head";
import * as Yup from "yup";
// import { loadStripe } from "@stripe/stripe-js/pure";
import Image from "next/image";

import { SafeChargeCC } from "@/components/shopComponents/SafeCharge";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

const Paiement = () => {
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
    metadata,
    setCartMetadata,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { status, data } = useSession();
  const [shippingDifferent, setShippingDifferent] = useState(false);
  const [stripePaid, setStripePaid] = useState(0);
  const router = useRouter();
  const formRef = useRef();
  const [values, setValues] = useState(null);
  const stripeRef = useRef();

  /* -------------------------------------------------------------------------- */
  /*                           fetch user information                           */
  /* -------------------------------------------------------------------------- */

  /* ------------------------ fetch user data function ------------------------ */
  const getUser = async (id) => {
    setLoading(true);

    const { data, headers } = await getCustomerData(id);

    data && setUser(data);

    setLoading(false);
  };

  const getUserByEmail = async (email) => {
    const { data, headers } = await getCustomerByEmail(email);

    return data;
  };
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- useEffects ------------------------------- */

  useEffect(() => {
    if (status === "authenticated") {
      getUser(data?.user?.id);
    }
  }, [status]);

  useEffect(() => {
    console.log("stripe updated: ", stripePaid);
    if (stripePaid) {
      prepareOrder();
    }
  }, [stripePaid]);

  useEffect(() => {
    if (!metadata || Object.keys(metadata).length === 0) {
      router.push("/panier");
    }
  }, [metadata]);

  /* --------------------------------- styling -------------------------------- */
  const styles = {
    form: "flex flex-col",
    fieldContainer: "flex flex-col gap-y-1 mb-2",
    sectionTitle: "font-semibold border-b mb-8 md:w-fit",
    formSection: "grid md:grid-cols-2 gap-3",
    label: "",
    error: "text-rachel-red-700 text-sm bg-rachel-red-100 rounded p-1",
    field: "!rounded",
    button:
      "lg:w-fit mt-5 bg-rachel-red-700 hover:bg-rachel-red-800 duration-200 hover:!text-white mx-auto",
  };

  /* ------------------------------ order submit ------------------------------ */
  const FormSchema = Yup.object().shape({
    billing_firstname: Yup.string()
      .min(2, "Trop court")
      .required("Champ obligatoire")
      .max(56, "Maximum 56, caractères"),
    billing_lastname: Yup.string()
      .min(4, "Trop court")
      .required("Champ obligatoire")
      .max(56, "Maximum 56, caractères")
      .required("Champ obligatoire"),
    billing_email: Yup.string()
      .email("Courriel invalide")
      .required("Champ obligatoire"),
    billing_phone: Yup.string()
      .min(8, "Trop court")
      .max(12, "Maximum 12, caractères")
      .required("Champ obligatoire"),
    billing_postcode: Yup.string()
      .required("Champ obligatoire")
      .max(12, "Maximum 12, caractères"),
    billing_city: Yup.string()
      .required("Champ obligatoire")
      .min(2, "Trop court")
      .max(56, "Maximum 56, caractères"),
    billing_address_1: Yup.string()
      .required("Champ obligatoire")
      .min(2, "Trop court")
      .max(256, "Maximum 256, caractères"),
  });

  const submitOrder = async (values, setSubmitting) => {
    setLoading(true);
    setValues(values);
    await stripeRef.current.onSubmit(values, metadata.total);
  };

  const prepareOrder = async () => {
    if (stripePaid === false) {
      toast.warn("Merci de compléter le paiement", { position: "top-right" });
      setLoading(false);
      return;
    } else if (stripePaid === 0) {
      setLoading(false);
      return;
    }

    let customer_id = 0;

    if (values.billing_email) {
      const customer = await getUserByEmail(values.billing_email);

      if (customer && customer?.length > 0) {
        customer_id = customer[0].id;
      }
    }

    let data;

    let lineitems = items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    if (shippingDifferent) {
      data = {
        payment_method: "NUVEI",
        set_paid: true,
        customer_id,
        billing: {
          first_name: values.billing_firstname,
          last_name: values.billing_lastname,
          address_1: values.billing_address_1,
          address_2: values.billing_address_2,
          city: values.billing_city,
          state: values.billing_state,
          postcode: values.billing_postcode,
          country: "CA",
          email: values.billing_email,
          phone: values.billing_phone,
        },
        shipping: {
          first_name: values.shipping_firstname,
          last_name: values.shipping_lastname,
          address_1: values.shipping_address_1,
          address_2: values.shipping_address_2,
          city: values.shipping_city,
          state: values.shipping_state,
          postcode: values.shipping_postcode,
          country: "CA",
        },
        line_items: lineitems,
        shipping_lines: [
          {
            method_id: metadata.shipping.id,
            method_title: metadata.shipping.name,
            total: metadata.shipping.cost,
          },
        ],
        ...(metadata.fees && {
          name: "Frais de manutention",
          total: metadata.fees,
        }),
        ...(metadata.couponApplied.applied && {
          coupon_lines: [
            {
              code: metadata.couponApplied.code,
              discount: String(metadata.couponApplied.amount),
            },
          ],
        }),
        status: "processing",
      };
    } else {
      data = {
        payment_method: "NUVEI",
        set_paid: true,
        customer_id,

        billing: {
          first_name: values.billing_firstname,
          last_name: values.billing_lastname,
          address_1: values.billing_address_1,
          address_2: values.billing_address_2,
          city: values.billing_city,
          state: values.billing_state,
          postcode: values.billing_postcode,
          country: "CA",
          email: values.billing_email,
          phone: values.billing_phone,
        },
        shipping: {
          first_name: values.billing_firstname,
          last_name: values.billing_lastname,
          address_1: values.billing_address_1,
          address_2: values.billing_address_2,
          city: values.billing_city,
          state: values.billing_state,
          postcode: values.billing_postcode,
          country: "CA",
        },
        line_items: lineitems,
        shipping_lines: [
          {
            method_id: metadata.shipping.id,
            method_title: metadata.shipping.name,
            total: metadata.shipping.cost,
          },
        ],
        ...(metadata.fees && {
          name: "Frais de manutention",
          total: metadata.fees,
        }),
        ...(metadata.couponApplied.applied && {
          coupon_lines: [
            {
              code: metadata.couponApplied.code,
              discount: String(metadata.couponApplied.amount),
            },
          ],
        }),
        status: "processing",
      };
    }

    createOrder(data)
      .then((res) => {
        if (res) {
          toast.success("Commande créé avec succès!", {
            position: "bottom-left",
          });
          router.push({
            pathname: "/remerciement",
            query: { data: JSON.stringify(res.data) },
          });
        } else {
          toast.warn("Une erreur, merci de réessayer!", {
            position: "bottom-left",
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.warn(err.message, {
          position: "bottom-left",
        });
        formRef.current.setSubmitting(false);
        setLoading(false);
      });
  };

  /* -------------------------------------------------------------------------- */
  if (!metadata || Object.keys(metadata).length === 0) {
    return (
      <Layout>
        <h1 className="text-center text-xl">Redirection vers panier</h1>
      </Layout>
    );
  }
  return (
    <Layout>
      <Head>
        <title>{"Paiement"}</title>
      </Head>
      <div className="w-full lg:flex gap-x-5 pb-32">
        {/* ------------------------------- FORM ------------------------------- */}
        <div className="px-2 lg:px-10 xl-px-20 py-3 xl:max-w-3xl xl:mx-auto  rounded w-full lg:w-8/12 xl:w-7/12 mb-10 lg:mb-0">
          <div className="flex flex-col">
            <h5 className="font-semibold capitalize text-lg">
              Finalisation de la commande
            </h5>
            <p className="text-gray-500 text-sm">
              {
                "Remplissez le formulaire ci-dessous et choisissez votre mode de paiement préféré."
              }
            </p>
          </div>
          <hr className="my-3" />

          {loading && (
            <div className="text-center fixed left-0 top-0 z-50 flex justify-center items-center bg-gray-400 p-0 h-screen w-screen bg-opacity-80 gap-x-4">
              <Spinner
                color="info"
                size="xl"
                className="text-white fill-rachel-red-700"
              />
              <span className="text-white">Chargement...</span>
            </div>
          )}
          {!loading && (
            <Formik
              validationSchema={FormSchema}
              innerRef={formRef}
              onSubmit={(values, { setSubmitting }) => {
                submitOrder(values, setSubmitting);
              }}
              initialValues={
                values || {
                  /* ------------------------------ billing info ------------------------------ */
                  billing_email: user?.billing.email,
                  billing_phone: user?.billing.phone,
                  billing_firstname: user?.billing.first_name,
                  billing_lastname: user?.billing.last_name,
                  billing_address_1: user?.billing.address_1,
                  billing_address_2: user?.billing.address_2,
                  billing_city: user?.billing.city,
                  billing_postcode: user?.billing.postcode,
                  billing_state:
                    metadata.taxeRates?.length > 0
                      ? metadata.taxeRates[0].state
                      : user?.billing.state,
                  billing_company: user?.billing.company,

                  /* ------------------------------ shipping info ----------------------------- */
                  shipping_firstname: user?.shipping.first_name,
                  shipping_lastname: user?.shipping.last_name,
                  shipping_address_1: user?.shipping.address_1,
                  shipping_address_2: user?.shipping.address_2,
                  shipping_city: user?.shipping.city,
                  shipping_postcode: user?.shipping.postcode,
                  shipping_state:
                    metadata.taxeRates?.length > 0
                      ? metadata.taxeRates[0].state
                      : user?.billing.state,
                  shipping_company: user?.shipping.company,
                }
              }
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="mt-2">
                  <h2 className={styles.sectionTitle}>
                    {"Détails de facturation"}
                  </h2>
                  <section className={styles.formSection}>
                    <div className={styles.fieldContainer}>
                      <Label value="Prénom" />
                      <Field
                        type="text"
                        name="billing_firstname"
                        className={styles.field}
                      />
                      {errors.billing_firstname && touched.billing_firstname ? (
                        <div className={styles.error}>
                          {errors.billing_firstname}
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.fieldContainer}>
                      <Label value="Nom" />
                      <Field
                        type="text"
                        name="billing_lastname"
                        className={styles.field}
                      />
                      {errors.billing_lastname && touched.billing_lastname ? (
                        <div className={styles.error}>
                          {errors.billing_lastname}
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.fieldContainer}>
                      <Label value="Courriel" />
                      <Field
                        type="email"
                        name="billing_email"
                        className={styles.field}
                      />
                      {errors.billing_email && touched.billing_email ? (
                        <div className={styles.error}>
                          {errors.billing_email}
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.fieldContainer}>
                      <Label value="Téléphone" />
                      <Field
                        type="tel"
                        name="billing_phone"
                        className={styles.field}
                      />
                      {errors.billing_phone && touched.billing_phone ? (
                        <div className={styles.error}>
                          {errors.billing_phone}
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.fieldContainer}>
                      <Label value="Adresse ligne 1" />
                      <Field
                        type="text"
                        name="billing_address_1"
                        className={styles.field + " rounded"}
                      />
                      {errors.billing_address_1 && touched.billing_address_1 ? (
                        <div className={styles.error}>
                          {errors.billing_address_1}
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.fieldContainer}>
                      <Label value="Adresse ligne 2" />
                      <Field
                        type="text"
                        name="billing_address_2"
                        className={styles.field}
                      />
                    </div>
                    <div className={styles.fieldContainer}>
                      <Label value="Entreprise" />
                      <Field
                        type="text"
                        name="billing_company"
                        className={styles.field}
                      />
                    </div>
                    <div className={styles.fieldContainer}>
                      <Label value="Ville" />
                      <Field
                        type="text"
                        name="billing_city"
                        className={styles.field}
                      />
                      {errors.billing_city && touched.billing_city ? (
                        <div className={styles.error}>
                          {errors.billing_city}
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.fieldContainer}>
                      <Label value="Code postal" />
                      <Field
                        type="text"
                        name="billing_postcode"
                        className={styles.field}
                      />
                      {errors.billing_postcode && touched.billing_postcode ? (
                        <div className={styles.error}>
                          {errors.billing_postcode}
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.fieldContainer}>
                      <Label value="Province" />
                      <Field
                        as="select"
                        name="billing_state"
                        className={styles.field}
                      >
                        <option value={"AB"}>Alberta</option>
                        <option value={"BC"}>Colombie-Britannique</option>
                        <option value={"PE"}>Île-du-Prince-Édouard</option>
                        <option value={"MB"}>Manitoba</option>
                        <option value={"NB"}>Nouveau-Brunswick</option>
                        <option value={"NS"}>Nouvelle-Écosse</option>
                        <option value={"NU"}>Nunavut</option>
                        <option value={"ON"}>Ontario</option>
                        <option value={"QC"}>Québec</option>
                        <option value={"SK"}>Saskatchewan</option>
                        <option value={"NL"}>Terre-Neuve-et-Labrador</option>
                        <option value={"NT"}>Territoires du Nord-Ouest</option>
                        <option value={"YT"}>Yukon</option>
                      </Field>
                    </div>
                  </section>
                  <div className="flex my-8 items-center">
                    <input
                      type="checkbox"
                      checked={shippingDifferent}
                      onChange={(e) => {
                        setShippingDifferent((curr) => !curr);
                      }}
                      className="mr-1"
                    />
                    <Label
                      value="Expédier à une adresse différente ?"
                      className="text-base"
                    />
                  </div>

                  {/* ------------------------------ Shipping Info ----------------------------- */}
                  <section className={shippingDifferent ? "block" : "hidden"}>
                    <hr className="my-10" />

                    <h2 className={styles.sectionTitle}>
                      Adresse de livraison{" "}
                    </h2>
                    <section className={styles.formSection}>
                      <div className={styles.fieldContainer}>
                        <Label value="Prénom" />
                        <Field
                          type="text"
                          name="shipping_firstname"
                          className={styles.field}
                        />
                      </div>
                      <div className={styles.fieldContainer}>
                        <Label value="Nom" />
                        <Field
                          type="text"
                          name="shipping_lastname"
                          className={styles.field}
                        />
                      </div>
                      <div className={styles.fieldContainer}>
                        <Label value="Entreprise" />
                        <Field
                          type="text"
                          name="shipping_company"
                          className={styles.field}
                        />
                      </div>
                      <div className={styles.fieldContainer}>
                        <Label value="Adresse ligne 1" />
                        <Field
                          type="text"
                          name="shipping_address_1"
                          className={styles.field}
                        />
                      </div>
                      <div className={styles.fieldContainer}>
                        <Label value="Adresse ligne 2" />
                        <Field
                          type="text"
                          name="shipping_address_2"
                          className={styles.field}
                        />
                      </div>
                      <div className={styles.fieldContainer}>
                        <Label value="Ville" />
                        <Field
                          type="text"
                          name="shipping_city"
                          className={styles.field}
                        />
                      </div>
                      <div className={styles.fieldContainer}>
                        <Label value="Code postal" />
                        <Field
                          type="text"
                          name="shipping_postcode"
                          className={styles.field}
                        />
                      </div>
                      <div className={styles.fieldContainer}>
                        <Label value="Province" />
                        <Field
                          as="select"
                          name="shipping_state"
                          className={styles.field}
                        >
                          <option value={"AB"}>Alberta</option>
                          <option value={"BC"}>Colombie-Britannique</option>
                          <option value={"PE"}>Île-du-Prince-Édouard</option>
                          <option value={"MB"}>Manitoba</option>
                          <option value={"NB"}>Nouveau-Brunswick</option>
                          <option value={"NS"}>Nouvelle-Écosse</option>
                          <option value={"NU"}>Nunavut</option>
                          <option value={"ON"}>Ontario</option>
                          <option value={"QC"}>Québec</option>
                          <option value={"SK"}>Saskatchewan</option>
                          <option value={"NL"}>Terre-Neuve-et-Labrador</option>
                          <option value={"NT"}>
                            Territoires du Nord-Ouest
                          </option>
                          <option value={"YT"}>Yukon</option>
                        </Field>
                      </div>
                    </section>
                  </section>
                </Form>
              )}
            </Formik>
          )}

          {isEmpty ? (
            <h3 className="text-sm">Le panier est vide</h3>
          ) : (
            <div className="max-h-[550px] overflow-auto"></div>
          )}
        </div>

        {/* ------------------------------ Cart summary ------------------------------ */}
        {totalUniqueItems > 0 && (
          <div className="bg-white mt-14  py-3 lg:py-5 border rounded w-full lg:w-4/12 xl:w-5/12  xl:max-w-2xl xl:mx-auto">
            <div className="px-2 lg:px-5 border-b pb-5">
              <h4 className="font-semibold capitalize text-lg">
                {"Récapitulatif de la commande"}
              </h4>
              <h4 className="text-xs  text-gray-400">
                {totalUniqueItems} {"élement"}(s) dans le panier
              </h4>
            </div>
            <div className="px-2 lg:px-5 py-5 ">
              {/* ----------------------------- subtotal ----------------------------- */}
              <div className="flex justify-between items-center">
                <p className="text-sm">Sous-total: </p>
                <span className="text-base font-semibold">
                  {new Intl.NumberFormat("fr-CA", {
                    style: "currency",
                    currency: "cad",
                  }).format(Number(cartTotal))}
                </span>
              </div>
              <hr className="my-4" />

              {/* ----------------------------- shipping price ----------------------------- */}
              <div className="flex justify-between items-center">
                <p className="text-sm">Frais de livraison: </p>
                <span className="text-base font-semibold">
                  <span className="text-sm font-light">
                    ({metadata.shipping && metadata.shipping.name})
                  </span>{" "}
                  {metadata.shipping.cost &&
                    new Intl.NumberFormat("fr-CA", {
                      style: "currency",
                      currency: "cad",
                    }).format(Number(metadata.shipping.cost))}
                </span>
              </div>
              <hr className="my-4" />
              {/* ----------------------------- FEES ----------------------------- */}
              {metadata.fees && metadata.fees > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Frais de manutention: </p>
                    <span className="text-base font-semibold">
                      {new Intl.NumberFormat("fr-CA", {
                        style: "currency",
                        currency: "cad",
                      }).format(Number(metadata.fees))}
                    </span>
                  </div>
                  <hr className="my-4" />
                </>
              )}


              {/* ----------------------------- total before taxes ----------------------------- */}
              <div className="flex justify-between items-center">
                <p className="text-sm">
                  Total HT:{" "}
                  {metadata.couponApplied.applied && (
                    <b>
                      {"(Coupon appliqué -" +
                        metadata.couponApplied.amount +
                        "%)"}
                    </b>
                  )}{" "}
                </p>
                <span className="text-base font-semibold">
                  {metadata.couponApplied.applied ? (
                    <div className="flex flex-col">
                      <span className="text-gray-500 line-through">
                        {new Intl.NumberFormat("fr-CA", {
                          style: "currency",
                          currency: "cad",
                        }).format(
                          metadata.subtotal /
                            (1 - metadata.couponApplied.amount / 100)
                        )}
                      </span>

                      <span>
                        {new Intl.NumberFormat("fr-CA", {
                          style: "currency",
                          currency: "cad",
                        }).format(metadata.subtotal)}
                      </span>
                    </div>
                  ) : (
                    new Intl.NumberFormat("fr-CA", {
                      style: "currency",
                      currency: "cad",
                    }).format(metadata.subtotal)
                  )}
                </span>
              </div>

              <hr className="my-4" />

              {/* ---------------------------------- Taxes --------------------------------- */}
              <div className="flex justify-between items-center">
                <p className="text-sm">Taxes: </p>
                <span className="text-base font-semibold">
                  <div className="flex flex-col text-sm divide-y-2">
                    {metadata.taxeRates &&
                      metadata.taxeRates?.length > 0 &&
                      metadata.taxeRates.map((taxe) => (
                        <span
                          key={taxe.id}
                          className="flex justify-between items-center py-2 gap-x-5"
                        >
                          <span>{taxe.name} : </span>
                          <span>
                            {new Intl.NumberFormat("fr-CA", {
                              style: "currency",
                              currency: "cad",
                            }).format(
                              (Number(taxe.rate) * +metadata.subtotal) / 100
                            )}
                          </span>
                        </span>
                      ))}
                  </div>
                </span>
              </div>

              {/* ----------------------Total-------------------- */}
              <hr className="my-4" />
              <div className="flex justify-between items-center">
                <p className="font-semibold">Total: </p>
                <span className="text-lg font-semibold text-red-600">
                  {metadata.total &&
                    new Intl.NumberFormat("fr-CA", {
                      style: "currency",
                      currency: "cad",
                    }).format(metadata.total)}
                </span>
              </div>
              {/* --------------------------------------paiement button-------------------------------- */}
            </div>

            <hr className="my-4" />
            <div className="px-2 mt-8 py-4 bg-gray-100 text-center">
              <div className="w-full md:w-8/12 lg:w-full m-auto flex items-center justify-between mb-3">
                <h4 className="font-bold text-center ">
                  Paiement par carte bancaire
                </h4>
                <Image
                  src="/cards-nuvei.png"
                  width="130"
                  height="80"
                  className=""
                  alt="stripe logo"
                  unoptimized
                />
              </div>

              {/* <div className="w-full md:w-8/12 lg:w-full m-auto py-8 px-2 bg-white rounded-lg">
                <Elements stripe={stripePromise} options={{ locale: "fr" }}>
                  <StripeForm checkStripe={setStripePaid} ref={stripeRef} />
                </Elements>
              </div> */}
              <div className="w-full md:w-8/12 lg:w-full m-auto py-8 px-2 bg-white rounded-lg">
                <hr />
                <SafeChargeCC
                  setStripePaid={setStripePaid}
                  isCheckPaid={stripePaid}
                  ref={stripeRef}
                  setLoading={setLoading}
                />
              </div>
            </div>

            <Button
              disabled={loading || stripePaid}
              type="submit"
              className={styles.button}
              onClick={() => {
                if (formRef.current) {
                  formRef.current.handleSubmit();
                }
              }}
            >
              Passer votre commande
            </Button>
          </div>
        )}
      </div>
      <ToastContainer className={"!z-[99999999999999]"} />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Paiement), {
  ssr: false,
});
