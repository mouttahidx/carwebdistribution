import { sendEmail } from "@/hooks/sendEmail";
import Footer from "@/layout/Footer";
import Header from "@/layout/header/Header";
import { EnvelopeIcon, MapIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Button, Label } from "flowbite-react";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);

  const FormSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Trop court")
      .max(56, "Maximum 56, caractères")
      .required("Champ obligatoire"),
    lastname: Yup.string()
      .min(2, "Trop court")
      .max(56, "Maximum 56, caractères")
      .required("Champ obligatoire"),
    email: Yup.string()
      .email("Courriel invalide")
      .required("Champ obligatoire"),
    message: Yup.string()
      .min(2, "Trop court")
      .max(512, "Maximum 512, caractères")
      .required("Champ obligatoire"),
  });

  /* --------------------------------- styling -------------------------------- */
  const styles = {
    form: "flex flex-col",
    fieldContainer: "flex flex-col gap-y-1 mb-4",
    sectionTitle: "font-semibold border-b mb-8 md:w-fit",
    formSection: "grid md:grid-cols-2 gap-10",
    label: "",
    error: "text-rachel-red-700 text-sm bg-rachel-red-100 rounded p-1",
    field: "rounded",
    button:
      "lg:w-fit mt-5 bg-rachel-red-700 hover:bg-rachel-red-800 duration-200 hover:!text-white",
  };
  function onChange(value) {
    recaptchaRef.current = value;
  }
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    if (!recaptchaRef.current) {
      toast.error("Merci de remplire le reCAPTCHA.");
      setSubmitting(false);
      return;
    }
    setLoading(true);
    let res = await sendEmail(values);
    if (res) {
      resetForm({ values: "" });
      toast.success("Message envoyé!");
    } else {
      toast.warn("Réessayer");
    }
    setSubmitting(false);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title key={"Contact"}>{`${
          "Contact - " + process.env.NEXT_PUBLIC_WEBSITE_TITLE || "Check .ENV"
        }`}</title>
      </Head>
      <Header />
      <section className="grid md:grid-cols-2 gap-x-3 bg-[#FDFDFD]">
        <div className="flex flex-col w-full h-full justify-center items-center gap-y-16">
          <div className="flex flex-col justify-center items-center w-full  ">
            <PhoneIcon className="w-10 h-10 rounded fill-white bg-gray-500 p-2" />
            <div className="ml-2 text-center gap-y-4 flex flex-col mt-3">
              <p className="text-sm leading-none">Téléphone:</p>
              <p className="text-black font-semibold leading-tight">
                514-883-0691
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full  ">
            <EnvelopeIcon className="w-10 h-10 rounded fill-white bg-gray-500 p-2" />
            <div className="ml-2 text-center gap-y-4 flex flex-col mt-3">
              <p className="text-sm leading-none">Courriel:</p>
              <p className="text-black font-semibold leading-tight">
                info@carwebdistribution.ca
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full  ">
            <MapIcon className="w-10 h-10 rounded fill-white bg-gray-500 p-2" />
            <div className="ml-2 text-center gap-y-4 flex flex-col mt-3">
              <p className="text-sm leading-none">Adresse:</p>
              <p className="text-black font-semibold leading-tight">
                858 chemin du rivage <br />
                Saint-Antoine-sur-Richelieu, QC
              </p>
            </div>
          </div>
        </div>
        <div className="py-16 px-10 w-full flex justify-center ">
          <div className="max-w-xl">
            <h1 className="lg:text-3xl text-2xl mb-2 font-bold">
              Contactez Nous
            </h1>
            <h2>
              {
                "Remplissez le formulaire notre équipe vous répondra dans les 24 heures"
              }
            </h2>
            <Formik
              initialValues={{
                email: "",
                firstname: "",
                lastname: "",
                message: "",
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                handleSubmit(values, setSubmitting, resetForm);
              }}
              validationSchema={FormSchema}
            >
              {({
                errors,
                touched,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form className="mt-8">
                  <div className="grid lg:grid-cols-2 lg:gap-x-2">
                    <div className={styles.fieldContainer}>
                      <Label value="Nom" />
                      <Field
                        type="text"
                        name="lastname"
                        className={styles.field}
                      />
                      {errors.lastname && touched.lastname ? (
                        <div className={styles.error}>{errors.lastname}</div>
                      ) : null}
                    </div>
                    <div className={styles.fieldContainer}>
                      <Label value="Prénom" />
                      <Field
                        type="text"
                        name="firstname"
                        className={styles.field}
                      />
                      {errors.firstname && touched.firstname ? (
                        <div className={styles.error}>{errors.firstname}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className={styles.fieldContainer}>
                    <Label value="Courriel" />
                    <Field type="email" name="email" className={styles.field} />
                    {errors.email && touched.email ? (
                      <div className={styles.error}>{errors.email}</div>
                    ) : null}
                  </div>
                  <div className={styles.fieldContainer}>
                    <Label value="Message" />
                    <Field
                      type="text"
                      as="textarea"
                      name="message"
                      className={styles.field}
                    />
                    {errors.message && touched.message ? (
                      <div className={styles.error}>{errors.message}</div>
                    ) : null}
                  </div>
                  <ReCAPTCHA
                    sitekey="6LfvaHUpAAAAAEhXVSH0_xfx8X_KAFMCbeDd3QGB"
                    onChange={onChange}
                  />
                  {!isSubmitting && (
                    <Button
                      type="submit"
                      disabled={loading}
                      className={styles.button}
                    >
                      Envoyer
                    </Button>
                  )}
                  {isSubmitting && (
                    <p className="bg-white">En cours d'envoi...</p>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
