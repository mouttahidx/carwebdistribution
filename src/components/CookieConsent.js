import React from "react";
import { hasCookie, setCookie } from "cookies-next";
const CookieConsent = () => {
  const [showConsent, setShowConsent] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {maxAge:24*60*60*1000});
  };

  if (showConsent) {
    return null;
  }

  return (
    
    <div className="z-[9999999999] flex-col gap-y-6 md:flex-row fixed bottom-0 left-0 right-0 flex items-start md:items-center justify-between px-4 py-8 bg-gray-100 border border-gray-300">
      <span className="text-dark text-base mr-16">
        <b>Règlement Général sur la Protection des Données - (RGPD)</b>
        <br />
        Ce site Web utilise des cookies pour améliorer l'expérience utilisateur.
        En utilisant notre site Web, vous consentez à tous les cookies
        conformément à notre politique en matière de cookies.{" "}
      </span>
      <button
        className="bg-rachel-red-800 py-2 px-8 rounded text-white"
        onClick={() => acceptCookie()}
      >
        Accepter{" "}
      </button>
    </div>
  );
};

export default CookieConsent;
