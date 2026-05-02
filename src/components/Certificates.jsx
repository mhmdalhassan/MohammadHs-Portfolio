import SectionHeader from "./SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";

export default function Certificates() {
  const { data } = usePortfolio();
  const { certificates, spokenLanguages } = data;

  return (
    <section
      id="certificates"
      className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-dark-800"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Certificates"
          title="Certificates & languages"
          subtitle="Training achievements and spoken languages."
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/5">
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Certificates
            </h3>

            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-white/5"
                >
                  <div className="text-2xl">{cert.icon}</div>

                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {cert.title}
                    </h4>
                    <p className="text-primary-500 text-sm">{cert.issuer}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {cert.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/5">
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Languages
            </h3>

            <div className="space-y-6">
              {spokenLanguages.map((item) => (
                <div key={item.language}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {item.language}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {item.level}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200 dark:bg-dark-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary-500 skill-bar"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}