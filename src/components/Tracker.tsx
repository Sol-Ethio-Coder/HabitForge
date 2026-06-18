import { useEffect, useState } from "react";

type Habit = {
  id: string;
  name: string;
  type: "build" | "break";
  emoji: string;
  streak: number;
  lastDone: string | null; // YYYY-MM-DD
  history: string[];
  createdAt: number;
};

const STORAGE_KEY = "habitforge.habits.v1";
const today = () => new Date().toISOString().split("T")[0];

function diffDays(a: string, b: string) {
  const A = new Date(a).getTime();
  const B = new Date(b).getTime();
  return Math.round((A - B) / 86400000);
}

const emojiOptions = ["💪", "📚", "🧘", "💧", "🏃", "✍️", "🎨", "🥗", "😴", "🚭", "📵", "🍔"];

export default function Tracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<"build" | "break">("build");
  const [emoji, setEmoji] = useState("💪");
  const [popId, setPopId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHabits(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!name.trim()) return;
    const h: Habit = {
      id: Math.random().toString(36).slice(2),
      name: name.trim(),
      type,
      emoji,
      streak: 0,
      lastDone: null,
      history: [],
      createdAt: Date.now(),
    };
    setHabits([h, ...habits]);
    setName("");
  };

  const toggleToday = (id: string) => {
    setPopId(id);
    setTimeout(() => setPopId(null), 400);
    const t = today();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        if (h.lastDone === t) {
          // Undo today
          return {
            ...h,
            lastDone: h.history[h.history.length - 2] ?? null,
            history: h.history.slice(0, -1),
            streak: Math.max(0, h.streak - 1),
          };
        }
        const isConsecutive = h.lastDone && diffDays(t, h.lastDone) === 1;
        return {
          ...h,
          lastDone: t,
          history: [...h.history, t],
          streak: isConsecutive ? h.streak + 1 : 1,
        };
      })
    );
  };

  const removeHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const last7 = (h: Habit) => {
    const days: { date: string; done: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      days.push({ date: ds, done: h.history.includes(ds) });
    }
    return days;
  };

  return (
    <section id="tracker" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
            Your Personal Tracker
          </span>
          <h2 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight">
            Track Your <span className="grad-text">Streaks</span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
            Saved locally on your device. Works completely offline. Tap each day to mark it done.
          </p>
        </div>

        {/* Add habit form */}
        <div className="glass rounded-3xl p-6 sm:p-8 mb-10 reveal border border-white/10">
          <div className="grid md:grid-cols-[1fr_auto_auto_auto] gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
              placeholder={type === "build" ? "e.g. Read 10 pages" : "e.g. Quit late-night scrolling"}
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-400 focus:bg-white/10 outline-none transition placeholder-white/40"
            />

            <div className="flex gap-2">
              {emojiOptions.slice(0, 6).map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`w-11 h-11 rounded-xl grid place-items-center text-xl transition ${
                    emoji === e ? "bg-violet-500/30 ring-2 ring-violet-400 scale-110" : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>

            <div className="flex gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setType("build")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  type === "build" ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" : "text-white/60 hover:text-white"
                }`}
              >
                Build
              </button>
              <button
                onClick={() => setType("break")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  type === "break" ? "bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-lg" : "text-white/60 hover:text-white"
                }`}
              >
                Break
              </button>
            </div>

            <button
              onClick={addHabit}
              className="btn-shine px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold hover:scale-105 transition shadow-lg shadow-violet-600/40"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Habits list */}
        {habits.length === 0 ? (
          <div className="text-center py-16 reveal">
            <div className="text-7xl mb-4 inline-block animate-bounce">🌱</div>
            <p className="text-white/60 text-lg">No habits yet. Plant your first seed above!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {habits.map((h) => {
              const doneToday = h.lastDone === today();
              const days = last7(h);
              return (
                <div
                  key={h.id}
                  className={`glow-card glass rounded-3xl p-6 reveal group ${popId === h.id ? "pop" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`w-14 h-14 rounded-2xl grid place-items-center text-3xl shrink-0 ${
                          h.type === "build"
                            ? "bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-400/30"
                            : "bg-gradient-to-br from-rose-500/30 to-red-500/20 border border-rose-400/30"
                        }`}
                      >
                        {h.emoji}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-lg truncate">{h.name}</h3>
                        <div className="flex items-center gap-2 text-xs mt-0.5">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold ${
                              h.type === "build" ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                            }`}
                          >
                            {h.type === "build" ? "BUILDING" : "BREAKING"}
                          </span>
                          {h.streak > 0 && (
                            <span className="text-amber-300 font-bold flex items-center gap-1">
                              <span className="flame">🔥</span> {h.streak} day{h.streak > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeHabit(h.id)}
                      className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-rose-400 transition text-sm"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Last 7 days */}
                  <div className="mt-5 flex justify-between gap-1.5">
                    {days.map((d) => (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className={`w-full aspect-square rounded-lg transition-all duration-300 ${
                            d.done
                              ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30 scale-100"
                              : "bg-white/5 hover:bg-white/10 scale-90"
                          }`}
                        />
                        <span className="text-[10px] text-white/40">
                          {new Date(d.date).toLocaleDateString("en", { weekday: "narrow" })}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => toggleToday(h.id)}
                    className={`mt-5 w-full py-3 rounded-xl font-bold transition-all duration-300 btn-shine ${
                      doneToday
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/40"
                        : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 hover:border-violet-400/50"
                    }`}
                  >
                    {doneToday ? "✓ Completed today — Undo" : "Mark as done today"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
