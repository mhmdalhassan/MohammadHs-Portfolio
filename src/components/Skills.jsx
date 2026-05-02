import SectionHeader from "./SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";
import { Cpu, Globe, Database, Layout, ShieldCheck, Zap } from "lucide-react";

// Mapping icons to categories if you want to replace emojis with Lucide icons
const categoryIcons = {
  Frontend: <Layout size={24} />,
  Backend: <Database size={24} />,
  Tools: <Zap size={24} />,
  Other: <Globe size={24} />,
  Security: <ShieldCheck size={24} />,
  Hardware: <Cpu size={24} />,
};

export default function Skills() {
  const { data } = usePortfolio();
  const { skills } = data;

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-dark-900/50 transition-colors relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          label="SKILLS"
          title="Technical Toolkit"
          subtitle="A comprehensive overview of the technologies and frameworks I use to bring ideas to life."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skills.map((group, index) => (
            <div
              key={group.category}
              className="group relative p-8 rounded-[32px] bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/5 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/5"
            >
              {/* Category Icon & Label */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 shadow-sm">
                  {/* Fallback to emoji if Lucide icon isn't mapped */}
                  {categoryIcons[group.category] || group.icon || (
                    <Zap size={24} />
                  )}
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">
                  {group.category}
                </h3>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-transparent group-hover:border-primary-500/20 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Progress Decoration (Purely Aesthetic) */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent group-hover:via-primary-500 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
