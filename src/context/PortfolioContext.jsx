import { createContext, useContext, useEffect, useState } from "react";
import { defaultPortfolioData } from "../utils/storage";
import { subscribePortfolio } from "../api/portfolioApi";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(defaultPortfolioData);
  const [loading, setLoading] = useState(true);

  // 🚀 REALTIME FIREBASE LISTENER
 useEffect(() => {
   const unsubscribe = subscribePortfolio((res) => {
     if (res && typeof res === "object") {
       setData((prev) => ({
         ...prev,
         ...res,
       }));
     }
     setLoading(false);
   });

   return () => unsubscribe();
 }, []);

  // 🎯 Safe updater (used in Admin)
  const updateData = (newData) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  // 🎯 Favicon handler
  useEffect(() => {
    const favicon = data?.settings?.favicon;
    if (!favicon) return;

    let link = document.getElementById("dynamic-favicon");

    if (!link) {
      link = document.createElement("link");
      link.id = "dynamic-favicon";
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = favicon;
  }, [data]);

  function resetData() {
    setData(defaultPortfolioData);
  }

  return (
    <PortfolioContext.Provider
      value={{
        data,
        setData: updateData,
        resetData,
        loading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
