import { useEffect, useState } from "react";
import { defaultPortfolioData } from "../utils/storage";

const STORAGE_KEY = "portfolioData";

export function usePortfolioData() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return defaultPortfolioData;

    try {
      return JSON.parse(saved);
    } catch {
      return defaultPortfolioData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultPortfolioData);
  };

  return { data, setData, resetData };
}