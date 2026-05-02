import SectionHeader from "./SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";
import { ExternalLink, Box, Layers, Code2 } from "lucide-react";

export default function Projects() {
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-900 transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Projects"
          title="Selected Work"
          subtitle="Real-world projects focused on dashboards, business systems, and scalable workflows."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {(projects || []).map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col p-6 sm:p-7 rounded-[28px] sm:rounded-[32px]
              bg-slate-50 dark:bg-dark-800/50 border border-slate-200 dark:border-white/5
              hover:bg-white dark:hover:bg-dark-800 transition-all duration-500
              hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-dark-700 shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform duration-500">
                  <Box size={22} />
                </div>

                {project.featured && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                    <Layers size={12} />
                    Featured
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="mb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  {project.stack || "Full Stack"}
                </span>

                <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors break-words">
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6 flex-grow break-words">
                {project.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mb-8">
                {(project?.techStack || []).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-transparent group-hover:border-slate-300 dark:group-hover:border-white/10 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-white/5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {/* GitHub SVG */}
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.87 10.96.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.14 1.18a10.9 10.9 0 012.86-.38c.97 0 1.95.13 2.86.38 2.18-1.5 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.68 5.39-5.24 5.68.41.35.77 1.04.77 2.1v3.12c0 .31.21.67.8.56A10.99 10.99 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                    Source
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                )}

                {!project.live && !project.github && (
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 italic">
                    <Code2 size={14} />
                    Internal
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
