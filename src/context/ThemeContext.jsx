import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

const ThemeContext = createContext(undefined);

const DEFAULT_THEME_COLORS = {
  primaryColor: "#15bdf0",
  accentColor: "#00e5ff",
};

// Helper to safely parse localStorage
const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    return fallback;
  }
};

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");

    // إذا المستخدم اختار قبل هيك نحترم اختياره
    if (saved) return saved === "dark";

    // الافتراضي: LIGHT
    return false;
  });

  const [themeColors, setThemeColors] = useState(() =>
    getStorageItem("portfolioTheme", DEFAULT_THEME_COLORS),
  );

  // Memoize toggle and update functions to prevent unnecessary re-renders
  const toggle = useCallback(() => setDark((prev) => !prev), []);

  const updateThemeColors = useCallback((newColors) => {
    setThemeColors((prev) => ({ ...prev, ...newColors }));
  }, []);

  // Effect: Dark Mode Class Handling
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Effect: CSS Variables Handling
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty("--site-primary", themeColors.primaryColor);
    root.style.setProperty("--site-accent", themeColors.accentColor);

    localStorage.setItem("portfolioTheme", JSON.stringify(themeColors));
  }, [themeColors]);

  // The Value: Wrapped in useMemo for performance
  const value = useMemo(
    () => ({
      dark,
      toggle,
      themeColors,
      updateThemeColors,
    }),
    [dark, toggle, themeColors, updateThemeColors],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
