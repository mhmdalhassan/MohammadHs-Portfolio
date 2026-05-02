import SectionHeader from "./SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";

export default function Education() {
  const { data } = usePortfolio();
  const { education } = data;

  return (
    <section
      id="education"
      className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-dark-800"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Education"
          title="Education & training"
          subtitle="Academic background and intensive full-stack training."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {education.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/5 glow-border"
            >
              <span className="font-mono text-sm text-primary-400">
                {item.period}
              </span>

              <h3 className="mt-3 font-display text-xl font-bold text-slate-900 dark:text-white">
                {item.degree}
              </h3>

              <p className="mt-2 text-primary-500 font-medium">
                {item.institution}
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.location}
              </p>

              <ul className="mt-5 space-y-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}