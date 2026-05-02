import SectionHeader from "./SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const { data } = usePortfolio();
  const { personal } = data;

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-900 transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Contact"
          title="Let’s build something useful."
          subtitle="Reach me through the following platforms."
        />

        <div className="flex justify-center mt-12">
          <div className="w-full max-w-3xl space-y-6">
            <div className="text-center">
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Contact details
              </h3>

              <p className="text-slate-500 dark:text-slate-400">
                I'm currently available for freelance work and full-time
                positions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactItem
                icon={<Mail size={18} />}
                label="Email"
                value={personal.email}
                href={`mailto:${personal.email}`}
              />

              <ContactItem
                icon={<Phone size={18} />}
                label="Phone"
                value={personal.phone}
                href={`tel:${personal.phone.replaceAll(" ", "")}`}
              />

              <ContactItem
                icon={<GitHubIcon />}
                label="GitHub"
                value="GitHub"
                href={personal.github}
              />

              <ContactItem
                icon={<LinkedInIcon />}
                label="LinkedIn"
                value="LinkedIn"
                href={personal.linkedin}
              />

              <ContactItem
                icon={<MapPin size={18} />}
                label="Location"
                value={personal.location}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ICONS (same style as Hero) ---------------- */

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.87 10.96.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.14 1.18a10.9 10.9 0 012.86-.38c.97 0 1.95.13 2.86.38 2.18-1.5 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.68 5.39-5.24 5.68.41.35.77 1.04.77 2.1v3.12c0 .31.21.67.8.56A10.99 10.99 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4v14h-4V8zm7 0h3.8v1.9h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V22h-4v-6.7c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.53V22h-4V8z" />
  </svg>
);

/* ---------------- CONTACT ITEM ---------------- */

function ContactItem({ label, value, href, icon }) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="text-primary-500 dark:text-primary-400 transition-all duration-300 group-hover:scale-125">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-900 dark:text-white break-all">
          {value}
        </p>
      </div>
    </div>
  );

  const baseStyle =
    "group block p-4 rounded-2xl bg-slate-50/50 dark:bg-dark-800/30 border border-slate-200 dark:border-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary-500/30";

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`${baseStyle} hover:bg-white dark:hover:bg-dark-800`}
      >
        {content}
      </a>
    );
  }

  return <div className={baseStyle}>{content}</div>;
}
