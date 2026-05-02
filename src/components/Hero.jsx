import { usePortfolio } from "../context/PortfolioContext";
import { Mail, ArrowRight, Download, MapPin } from "lucide-react";

export default function Hero() {
  const { data } = usePortfolio();

  // 🔥 حماية من undefined (مهم جداً)
  const personal = data?.personal || {};

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-dark-900 transition-colors pt-20"
    >
      <div className="absolute inset-0 grid-bg opacity-[0.15] dark:opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-dark-900/50 dark:to-dark-900" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
          {/* LEFT */}
          <div className="flex-1 text-center lg:text-left z-10 w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/20 bg-primary-500/5 mb-6 sm:mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-green-500" />
              </span>

              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                Ready to Build
              </span>
            </div>

            {/* Title (FIX RESPONSIVE) */}
            <h1 className="font-display font-black text-[clamp(2rem,8vw,5rem)] sm:text-[clamp(2.5rem,7vw,5rem)] text-slate-900 dark:text-white leading-[0.95] mb-5 sm:mb-6">
              <span className="block break-normal sm:whitespace-nowrap">
                Mohammad
              </span>

              <span className="block break-normal sm:whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-400 dark:to-blue-400">
                Al Hassan
              </span>
            </h1>

            {/* Role */}
            <p className="font-mono text-primary-600 dark:text-primary-400 text-sm sm:text-base lg:text-lg mb-5 sm:mb-6 font-bold flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <span className="opacity-50">&lt;</span>
              <span className="break-words text-center lg:text-left">
                {personal?.title || "Full Stack Developer"}
              </span>
              <span className="opacity-50">/&gt;</span>
            </p>

            {/* Summary */}
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8 sm:mb-10 mx-auto lg:mx-0 px-2 sm:px-0">
              {personal?.summary || ""}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-slate-900 dark:bg-primary-500 text-white font-bold transition hover:scale-[1.02] w-full sm:w-auto"
              >
                Explore Projects
                <ArrowRight size={18} />
              </a>

              <a
                href={personal?.cvUrl || "/Mohammad_Al_Hassan_CV.pdf"}
                download
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition w-full sm:w-auto"
              >
                <Download size={18} />
                Get Resume
              </a>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mt-8 sm:mt-12">
              <SocialLink href={personal?.github} label="GitHub">
                <GitHubIcon />
              </SocialLink>

              <SocialLink href={personal?.linkedin} label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>

              <SocialLink
                href={personal?.email ? `mailto:${personal.email}` : ""}
                label="Email"
              >
                <Mail size={20} />
              </SocialLink>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-shrink-0 relative w-full flex justify-center lg:w-auto">
            <div className="relative group w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80">
              <div className="absolute -inset-2 sm:-inset-3 rounded-[28px] bg-gradient-to-tr from-primary-500 to-blue-400 opacity-20 blur-2xl" />

              <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
                {personal?.avatar ? (
                  <img
                    src={personal.avatar}
                    alt={personal?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-dark-800 text-white text-3xl sm:text-4xl font-black">
                    {personal?.avatarInitials || "MH"}
                  </div>
                )}
              </div>
            </div>

            {/* LOCATION */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg whitespace-nowrap">
              <MapPin size={14} className="text-primary-500" />
              <span className="text-[10px] sm:text-xs font-bold uppercase">
                {personal?.location || ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ✅ FIXED SocialLink */
function SocialLink({ href, children, label }) {
  if (!href) return null;

  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-slate-400 hover:text-primary-500 transition-transform hover:scale-125"
    >
      {children}
    </a>
  );
}

/* ICONS */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.87 10.96.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.14 1.18a10.9 10.9 0 012.86-.38c.97 0 1.95.13 2.86.38 2.18-1.5 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.68 5.39-5.24 5.68.41.35.77 1.04.77 2.1v3.12c0 .31.21.67.8.56A10.99 10.99 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4v14h-4V8zm7 0h3.8v1.9h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V22h-4v-6.7c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.53V22h-4V8z" />
    </svg>
  );
}
