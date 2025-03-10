"use client";
import Layout from "@/layout";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function Connexion() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInfo.email.trim() === "" || userInfo.password.trim() === "") {
      toast.error("Les champs doivent être remplis", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return;
    }else if(userInfo.password.length < 6){
      toast.error("Le mot de passe doit contenir 6 caractères ou plus", {
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
     const res = await signIn("credentials", {
        redirect: false,
        email: userInfo.email,
        password: userInfo.password,
        
      });

      // if logged in succesfully
      if (res.status === 200) {
        if (typeof window !== "undefined") {
          if (remember) {
            localStorage.setItem("rachel-email", userInfo.email);
            localStorage.setItem("rachel-rememberme", true);
          } else {
            localStorage.removeItem("rachel-email", userInfo.email);
            localStorage.setItem("rachel-rememberme", false);
          }
        }
        localStorage.removeItem("user-vehicle");
        document.cookie = `user-vehicle=; path=/; max-age=0; SameSite=Lax`;
        if ('par_vehicule' in router.query) {
          const { par_vehicule, year, make, model, submodel, ...routerQuery } =
            router.query;
          router.replace({
            query: { ...routerQuery },
          });
        }
        router.push("/");
      }
      if (res.status >= 400 && res.status < 500) {
        toast.error("Courriel / Mot de passe incorrect", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
      } else if (res.status >= 500) {
        toast.error(error?.response?.data?.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error)
     
    }

    setLoading(false);

  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let email = localStorage.getItem("rachel-email") || "";
      let rememberStorage = localStorage.getItem("rachel-rememberme");

      email.length > 0 && setUserInfo((curr) => ({ ...curr, email }));
      rememberStorage !== null && setRemember(JSON.parse(rememberStorage));
    }
    
  }, []);
 

 
    return (
      <Layout>
        <Head><title>Connexion - {process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title></Head>
        <div className="mx-auto max-w-[400px] flex flex-col items-center py-20">
          <h1 className="font-semibold  text-3xl">Connexion</h1>
          <hr className="bg-rachel-red-700 mb-10 h-1 w-24" />
          <form
            className="flex  flex-col gap-4 w-full"
            onSubmit={(e) => handleSubmit(e)}
          >
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
                type="password"
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo((curr) => ({ ...curr, password: target.value }))
                }
                disabled={loading}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Checkbox
                checked={remember}
                onChange={() => {
                  setRemember((curr) => !curr);
                }}
              />
              <Label htmlFor="remember">Se souvenir de moi</Label>
            </div>
            <Button
              type="submit"
              className="bg-rachel-red-700 text-white hover:bg-rachel-red-800 mt-5 min-h-[40px]"
              disabled={loading}
            >
              {!loading && "Se connecter"}
              <PropagateLoader color={"#fff"} loading={loading} size={5} />
            </Button>
            <p className="text-sm text-left mt-3 w-full">
              Créer un nouveau compte ?{" "}
              <Link href="/sinscrire" className="text-blue-700">
                Cliquez ici
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer className={"!z-[99999999999999]"}/>
      </Layout>
    );

}
