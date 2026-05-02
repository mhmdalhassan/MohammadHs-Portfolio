import { useState, useEffect, useMemo } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const { data } = usePortfolio();
  const { navLinks, personal } = data;

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // ❗ منع السكرول لما المينيو مفتوح
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 },
    );

    navLinks.forEach(({ href }) => {
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [navLinks]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setActiveSection(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-white/5 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* LOGO */}
        <a href="#" className="font-bold text-2xl">
          <span className="gradient-text">Mohammad Al Hassan</span>.
        </a>

        {/* DESKTOP */}
        <ul className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-white/5 p-1 rounded-full">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => handleNavClick(href)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  activeSection === href
                    ? "bg-white dark:bg-dark-800 text-primary-500"
                    : "text-slate-500 hover:text-primary-500"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="w-10 h-10">
            {dark ? "☀️" : "🌙"}
          </button>

          <a
            href={personal.cvUrl}
            download
            className="hidden sm:flex px-4 py-2 bg-primary-500 text-white rounded-xl"
          >
            Resume
          </a>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center"
          >
            <span
              className={`h-0.5 w-6 bg-current transition ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current my-1 transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current transition ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* 🔥 OVERLAY + MOBILE MENU FIX */}
      <div
        className={`fixed inset-0 z-[90] md:hidden transition-all duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />

        {/* MENU */}
        <div
          className={`absolute top-0 right-0 w-[80%] h-full bg-white dark:bg-dark-900 shadow-2xl p-6 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="space-y-4 mt-10">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => handleNavClick(href)}
                  className="block py-3 text-lg font-medium"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={personal.cvUrl}
            download
            className="block mt-10 text-center bg-primary-500 text-white py-3 rounded-xl font-bold"
          >
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}
