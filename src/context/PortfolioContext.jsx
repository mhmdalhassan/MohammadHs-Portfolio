import { createContext, useContext, useEffect, useState } from "react";
import { defaultPortfolioData } from "../utils/storage";
import { loadPortfolio } from "../api/portfolioApi";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(defaultPortfolioData);
  const [loading, setLoading] = useState(true);

  // 🚀 Load from Firebase on start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await loadPortfolio();

        if (res && typeof res === "object") {
          setData((prev) => ({
            ...prev,
            ...res,
          }));
        }
      } catch (err) {
        console.error("Firebase load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🎯 Safe updater (IMPORTANT)
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

  // 🔄 Reset
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
