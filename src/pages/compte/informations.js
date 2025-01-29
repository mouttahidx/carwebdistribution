"use client";

import DashboardLayout from "@/components/accountComponents/DashboardLayout";
import LoadingModal from "@/components/accountComponents/LoadingModal";
import { getCustomerData, updateCustomerData } from "@/lib/api";
import { Button, Label } from "flowbite-react";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css'

export default function Informations() {
  const [user, setUser] = useState(null);
  const { data, status } = useSession();
  const [loading, setLoading] = useState(false);

  const MyLoader = () => (
    <ContentLoader
      speed={2}
      viewBox="0 0 300 60"
      backgroundColor="#f3f3f3"
      foregroundColor="#f9f9f9"
      uniqueKey="form"
    >
      <rect x="0" y="0" rx="3" ry="3" width="80" height="4" />
      <rect x="0" y="10" rx="3" ry="3" width="300" height="15" />
    </ContentLoader>
  );

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
  /* -------------------------------------------------------------------------- */

  useEffect(() => {

    // check if authentificated to get user object from session
    if (status === "authenticated" && data.user && !user) {
      getUser(data?.user?.id);
    }
  }, [status]);

  /* --------------------------------- styling -------------------------------- */
  const styles = {
    form: "flex flex-col",
    fieldContainer: "flex flex-col gap-y-1",
    sectionTitle: "font-semibold border-b mb-8 md:w-fit",
    formSection: "grid md:grid-cols-2 gap-10",
    label: "",
    error: "text-rachel-red-700 text-sm bg-rachel-red-100 rounded p-1",
    field: "",
    button:
      "lg:w-fit mt-10 bg-rachel-red-700 hover:bg-rachel-red-800 duration-200 hover:!text-white",
  };
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                             handle form submit                             */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = async (values, setSubmitting) => {
    const userData = {
      first_name: values.firstname,
      last_name: values.lastname,
      billing: {
        phone: values.billing_phone,
        first_name: values.billing_firstname,
        last_name: values.billing_lastname,
        address_1: values.billing_address_1,
        address_2: values.billing_address_2,
        city: values.billing_city,
        zipcode: values.billing_postcode,
        country: "CA",
        state: values.billing_state,
        company: values.billing_company,
        postcode: values.billing_postcode
      },

      shipping: {
        first_name: values.shipping_firstname,
        last_name: values.shipping_lastname,
        address_1: values.shipping_address_1,
        address_2: values.shipping_address_2,
        city: values.shipping_city,
        zipcode: values.shipping_postcode,
        country: "CA",
        state: values.shipping_state,
        company: values.shipping_company,
        postcode: values.shipping_postcode
      },
    };
    values.billing_email && (userData.billing.email = values.billing_email)
    values.email && values.email !== user.email && (userData.email = values.email) 

    // call api

    const res = await updateCustomerData(user.id, userData);
    if(!res){
      toast.error('Une erreur est survenue! merci de réessayer',{
        position:"bottom-left",
        theme:"dark",
        autoClose:2500
      })
    } else if(res && res.status > 200 && res.status < 250){
      toast.success('Informations enregistrées avec succès !',{
        position:"bottom-left",
        theme:"dark",
        autoClose:2500
      })
    }

    setSubmitting(false);
    
  };
  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Form validation ---------------------------- */
  const FormSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Trop court")
      .max(56, "Maximum 56, caractère"),
    username: Yup.string()
      .min(4, "Trop court")
      .max(56, "Maximum 56, caractère")
      .required("Champ obligatoire"),
    lastName: Yup.string()
      .min(2, "Trop court")
      .max(56, "Maximum 56, caractère"),
    email: Yup.string()
      .email("Courriel invalide")
      .required("Champ obligatoire"),
  });
  /* -------------------------------------------------------------------------- */
  return (
    <DashboardLayout>
      <h3 className="text-3xl font-semibold overflow-hidden text-ellipsis border-b w-fit mb-16">
        Vos informations
      </h3>
      <section className="w-full bg-white rounded-lg p-5">
        {!loading && user ? (
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
            initialValues={{
              email: user.email,
              username: user.username,
              firstname: user.first_name,
              lastname: user.last_name,
              /* ------------------------------ billing info ------------------------------ */
              billing_email: user.billing.email,
              billing_phone: user.billing.phone,
              billing_firstname: user.billing.first_name,
              billing_lastname: user.billing.last_name,
              billing_address_1: user.billing.address_1,
              billing_address_2: user.billing.address_2,
              billing_city: user.billing.city,
              billing_postcode: user.billing.postcode,
              billing_state: user.billing.state,
              billing_company: user.billing.company,

              /* ------------------------------ shipping info ----------------------------- */

              shipping_firstname: user.shipping.first_name,
              shipping_lastname: user.shipping.last_name,
              shipping_address_1: user.shipping.address_1,
              shipping_address_2: user.shipping.address_2,
              shipping_city: user.shipping.city,
              shipping_postcode: user.shipping.postcode,
              shipping_state: user.shipping.state,
              shipping_company: user.shipping.company,
            }}
            validationSchema={FormSchema}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={styles.form}>
                <h2 className={styles.sectionTitle}>Information de contact</h2>
                {/* ------------------------------ contact info ------------------------------ */}
                <section className={styles.formSection}>
                  <div className={styles.fieldContainer}>
                    <Label value="Courriel" />
                    <Field type="email" name="email" className={styles.field} />
                    {errors.email && touched.email ? (
                      <div className={styles.error}>{errors.email}</div>
                    ) : null}
                  </div>
                  <div className={styles.fieldContainer}>
                    <Label value="Nom d'utilisateur" />
                    <Field
                      type="text"
                      name="username"
                      className={styles.field}
                    />
                    {errors.username && touched.username ? (
                      <div className={styles.error}>{errors.username}</div>
                    ) : null}
                  </div>

                  <div className={styles.fieldContainer}>
                    <Label value="Prénom" />
                    <Field
                      type="text"
                      name="firstname"
                      className={styles.field}
                    />
                  </div>
                  <div className={styles.fieldContainer}>
                    <Label value="Nom" />
                    <Field
                      type="text"
                      name="lastname"
                      className={styles.field}
                    />
                  </div>
                </section>
                {/* -------------------------------------------------------------------------- */}

                <hr className="my-10" />

                {/* ------------------------------ Billing Info ------------------------------ */}
                <h2 className={styles.sectionTitle}>Adresse de facturation </h2>
                <section className={styles.formSection}>
                  <div className={styles.fieldContainer}>
                    <Label value="Courriel" />
                    <Field
                      type="email"
                      name="billing_email"
                      className={styles.field}
                    />
                  </div>
                  <div className={styles.fieldContainer}>
                    <Label value="Téléphone" />
                    <Field
                      type="tel"
                      name="billing_phone"
                      className={styles.field}
                    />
                  </div>
                  <div className={styles.fieldContainer}>
                    <Label value="Prénom" />
                    <Field
                      type="text"
                      name="billing_firstname"
                      className={styles.field}
                    />
                  </div>
                  <div className={styles.fieldContainer}>
                    <Label value="Nom" />
                    <Field
                      type="text"
                      name="billing_lastname"
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
                    <Label value="Adresse ligne 1" />
                    <Field
                      type="text"
                      name="billing_address_1"
                      className={styles.field}
                    />
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
                    <Label value="Ville" />
                    <Field
                      type="text"
                      name="billing_city"
                      className={styles.field}
                    />
                  </div>
                  <div className={styles.fieldContainer}>
                    <Label value="Code postal" />
                    <Field
                      type="text"
                      name="billing_postcode"
                      className={styles.field}
                    />
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
                {/* -------------------------------------------------------------------------- */}

                <hr className="my-10" />

                {/* ------------------------------ Shipping Info ----------------------------- */}
                <h2 className={styles.sectionTitle}>Adresse de livraison </h2>
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
                      <option value={"NT"}>Territoires du Nord-Ouest</option>
                      <option value={"YT"}>Yukon</option>
                    </Field>
                  </div>
                </section>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className={styles.button}
                >
                  Enregistrer
                </Button>
                {isSubmitting && <LoadingModal loading={"pop-up"} />}
              </Form>
            )}
          </Formik>
        ) : (
          (loading) &&
          <div className="grid lg:grid-cols-2 gap-8">
            {Array(6)
              .fill("")
              .map((e, i) => (
                <MyLoader key={i} />
              ))}
          </div>    
        )}
        <ToastContainer/>
      </section>
    </DashboardLayout>
  );
}
