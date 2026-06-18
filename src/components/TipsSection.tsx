type Tip = { icon: string; title: string; text: string; color: string };

export default function TipsSection({
  id,
  eyebrow,
  title,
  subtitle,
  tips,
  accent,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  tips: Tip[];
  accent: string;
}) {
  return (
    <section id={id} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${accent} text-white shadow-lg`}>
            {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">{subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <div
              key={tip.title}
              className="tip-card glow-card glass rounded-3xl p-7 reveal group cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tip.color} grid place-items-center text-3xl mb-5 shadow-xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:grad-text transition-all duration-300">
                {tip.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{tip.text}</p>
              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-white/40 group-hover:text-white/90 transition">
                <span>Tip {String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                <span className="group-hover:translate-x-1 transition">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
