import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { PortfolioProvider } from "./context/PortfolioContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
);
