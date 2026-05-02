import SectionHeader from "./SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";
import { Sparkles, Terminal, BookOpen, CheckCircle2 } from "lucide-react";

export default function About() {
  const { data } = usePortfolio();
  const { personal, softSkills } = data;

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 bg-white dark:bg-dark-900 transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="About Me"
          title="Bridging the gap between engineering and user experience."
          subtitle="I focus on building functional, high-performance web applications with a focus on clean architecture."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start mt-12">
          {/* Main Story (Occupies 7/12) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="group relative p-8 rounded-[32px] bg-slate-50 dark:bg-dark-800/40 border border-slate-200 dark:border-white/5 overflow-hidden">
              {/* Subtle Decorative Background Icon */}
              <Terminal className="absolute -bottom-6 -right-6 w-32 h-32 text-slate-200 dark:text-white/5 -rotate-12 transition-transform group-hover:rotate-0 duration-500" />

              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="text-primary-500" size={24} />
                My Story
              </h3>

              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 relative z-10">
                {personal.summary}
              </p>
            </div>

            {/* Educational / Professional Markers */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-dark-800/20 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Education
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Communication Engineering
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-dark-800/20 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Terminal size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Focus
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Full-Stack Development
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Soft Skills Sidebar (Occupies 5/12) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-[32px] bg-slate-900 dark:bg-primary-600/10 border border-slate-800 dark:border-primary-500/20 shadow-2xl shadow-primary-500/5">
              <h3 className="font-display font-bold text-xl text-white dark:text-primary-400 mb-8 uppercase tracking-widest text-center lg:text-left">
                Core Strengths
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {(softSkills || []).map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 hover:translate-x-2 transition-all duration-300 group/skill"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-primary-500 group-hover/skill:scale-110 transition-transform"
                    />
                    <span className="font-medium text-sm sm:text-base">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 text-center">
                <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
                  Continuously Learning & Evolving
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
