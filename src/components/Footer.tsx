export default function Footer() {
  return (
    <footer className="relative mt-24 px-6 pb-10 pt-16">
      <div className="max-w-6xl mx-auto">
        {/* CTA card */}
        <div className="glass rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden border border-white/10 reveal">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-600/20" />
          <div className="relative z-10">
            <div className="text-5xl mb-4 inline-block animate-bounce">🚀</div>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight">
              Your <span className="grad-text">future self</span> is watching
            </h3>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">
              Every small action compounds. Start today — your tomorrow depends on it.
            </p>
            <a
              href="#tracker"
              className="btn-shine inline-block mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold shadow-2xl shadow-violet-600/40 hover:scale-105 transition"
            >
              Begin Now →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 grid place-items-center text-sm font-black">
              H
            </div>
            <div>
              <div className="font-black grad-text text-lg">HabitForge</div>
              <div className="text-xs text-white/50">Build better. Break free.</div>
            </div>
          </div>

          <p className="text-sm text-white/60 text-center">
            Crafted with <span className="text-rose-400 animate-pulse">♥</span> by{" "}
            <a
              href="https://sol-ethio-coder.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold grad-text hover:underline underline-offset-4"
            >
              Sol Ethio Coder
            </a>
          </p>

          <div className="text-xs text-white/40">© {new Date().getFullYear()} HabitForge</div>
        </div>
      </div>
    </footer>
  );
}
