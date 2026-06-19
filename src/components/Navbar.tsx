import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    const links = [
    { href: "#home", label: "Home" },
    { href: "#tracker", label: "Tracker" },
    { href: "#burn", label: "Burn" },
    { href: "#build", label: "Build" },
    { href: "#relationships", label: "Love" },
    { href: "#recovery", label: "Recovery" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass shadow-2xl shadow-violet-900/20" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 grid place-items-center text-xl font-black text-white shadow-lg shadow-violet-500/50 group-hover:rotate-12 transition-transform duration-500">
            H
          </div>
          <span className="text-xl font-black grad-text">HabitForge</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors group"
              >
                {l.label}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-11 h-11 grid place-items-center rounded-xl glass border border-white/10 hover:bg-white/5 transition group"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${open ? "bg-cyan-400 rotate-45 translate-y-2" : "bg-white/80 group-hover:bg-cyan-400"}`} />
            <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${open ? "opacity-0" : "bg-white/80 group-hover:bg-violet-400"}`} />
            <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${open ? "bg-fuchsia-400 -rotate-45 -translate-y-2" : "bg-white/80 group-hover:bg-fuchsia-400"}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-6 mt-3 glass rounded-2xl p-4 bounce-in border border-white/10 shadow-2xl">
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
