import SectionHeader from "./SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";

export default function Experience() {
  const { data } = usePortfolio();
  const { experience } = data;

  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 bg-white dark:bg-dark-900"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Experience"
          title="Professional experience"
          subtitle="Hands-on work across client projects, remote teams, and business-focused web systems."
        />

        <div className="space-y-6">
          {experience.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-white/5"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {item.role}
                  </h3>
                  <p className="text-primary-500 font-medium">
                    {item.company} · {item.type}
                  </p>
                </div>

                <span className="font-mono text-sm text-slate-500 dark:text-slate-400">
                  {item.period}
                </span>
              </div>

              <ul className="space-y-3">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-slate-700 dark:text-slate-300"
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-primary-400 shrink-0" />
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