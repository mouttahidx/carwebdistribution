"use client";
import Layout from "@/layout";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Connexion() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  const session = useSession();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userInfo.email.trim() === "" ||
      userInfo.password.trim() === "" ||
      userInfo.passwordConfirmation.trim() === "" ||
      userInfo.first_name.trim() === "" ||
      userInfo.last_name.trim() === ""
    ) {
      toast.error("Les champs doivent être remplis", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return;
    }

    if (userInfo.password !== userInfo.passwordConfirmation) {
      toast.error("Les mots de passe doivent être identiques", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_WEBSITE_URL +
          "wp-json/wp/v2/users?path=token/validate",
        {
          username: userInfo.email,
          password: userInfo.password,
          email: userInfo.email,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
        },
        {
          auth: {
            username: "mahdi_admin",
            password: process.env.NEXT_PUBLIC_APP_PASSWORD,
          },
        }
      );
      if (res.status >= 200 && res.status < 204) {
        try {
          const login = await signIn("credentials", {
            redirect: false,
            email: userInfo.email,
            password: userInfo.password,
          });

          if (login.status === 200) {
            setLogged(true);
            toast.success("Compte créé avec succès", {
              position: "bottom-right",
            });

            router.push("/compte/vehicules");
          }
        } catch (error) {
          console.warn(error);
        }
      }
    } catch (error) {
      console.log(error);

      // if login incorrect
      if (error.response.status >= 400 && error.response.status < 500) {
        toast.error("Courriel / Mot de passe incorrect", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
      } else if (error.response.status >= 500) {
        toast.error(error?.response?.data?.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (session && session.status === "authenticated" && !logged) {
      router.push("/compte/vehicules");
    }

  }, [session]);

  if (session.status === "unauthenticated") {
    return (
      <Layout>
        <div className="mx-auto max-w-[400px]  flex flex-col items-center py-20">
          <h1 className="font-semibold  text-3xl">{"S'inscrire"}</h1>
          <hr className="bg-rachel-red-700 mb-10 h-1 w-24" />
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="w-full grid lg:grid-cols-2 gap-x-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="last_name" value="Nom" />
                </div>
                <TextInput
                  id="last_name"
                  placeholder="Arthur"
                  required
                  type="text"
                  value={userInfo.last_name}
                  onChange={({ target }) =>
                    setUserInfo((curr) => ({
                      ...curr,
                      last_name: target.value,
                    }))
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="first_name" value="Prénom" />
                </div>
                <TextInput
                  id="first_name"
                  placeholder="John"
                  required
                  type="text"
                  value={userInfo.first_name}
                  onChange={({ target }) =>
                    setUserInfo((curr) => ({
                      ...curr,
                      first_name: target.value,
                    }))
                  }
                  disabled={loading}
                />
              </div>
            </div>

            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Courriel" />
              </div>
              <TextInput
                id="email1"
                placeholder="Exemple@mail.com"
                required
                type="email"
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo((curr) => ({ ...curr, email: target.value }))
                }
                disabled={loading}
              />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Mot de passe" />
              </div>
              <TextInput
                id="password1"
                required
                minLength={6}
                type="password"
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo((curr) => ({ ...curr, password: target.value }))
                }
                disabled={loading}
              />
            </div>

            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  value="Confirmation - Mot de passe"
                />
              </div>
              <TextInput
                id="password2"
                required
                minLength={6}
                type="password"
                value={userInfo.passwordConfirmation}
                onChange={({ target }) =>
                  setUserInfo((curr) => ({
                    ...curr,
                    passwordConfirmation: target.value,
                  }))
                }
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="bg-rachel-red-700 text-white hover:bg-rachel-red-800 mt-5 min-h-[40px]"
              disabled={loading}
            >
              {!loading && "S'inscrire"}
              <PropagateLoader color={"#fff"} loading={loading} size={5} />
            </Button>
            <p className="text-sm text-left mt-3 w-full">
              Vous avez un compte ?{" "}
              <Link href="/auth/connexion" className="text-blue-700">
                Cliquez ici
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer className={"!z-[99999999999999]"} />{" "}
      </Layout>
    );
  }

  return null;
}
