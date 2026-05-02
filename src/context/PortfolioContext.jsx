  import { createContext, useContext, useEffect, useState } from "react";
  import { defaultPortfolioData } from "../utils/storage";

  const PortfolioContext = createContext();

  export function PortfolioProvider({ children }) {
    const [data, setData] = useState(() => {
      const saved = localStorage.getItem("portfolioData");

      if (!saved) return defaultPortfolioData;

      try {
        return JSON.parse(saved);
      } catch {
        return defaultPortfolioData;
      }
    });

    // save portfolio data
    useEffect(() => {
      localStorage.setItem("portfolioData", JSON.stringify(data));
    }, [data]);

    // ADD THIS HERE
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
      localStorage.removeItem("portfolioData");
      setData(defaultPortfolioData);
    }

    return (
      <PortfolioContext.Provider value={{ data, setData, resetData }}>
        {children}
      </PortfolioContext.Provider>
    );
  }
  export function usePortfolio() {
    return useContext(PortfolioContext);
  }