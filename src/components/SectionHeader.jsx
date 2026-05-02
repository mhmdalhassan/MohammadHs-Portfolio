export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="mb-12">
      <p className="section-label mb-3">{label}</p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}