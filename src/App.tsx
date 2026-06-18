import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TipsSection from "./components/TipsSection";
import LawsSection from "./components/LawsSection";
import Tracker from "./components/Tracker";
import QuotesSection from "./components/QuotesSection";
import Footer from "./components/Footer";
import { buildTips, breakTips } from "./data";
import { useReveal } from "./components/useReveal";

export default function App() {
  useReveal();

  return (
    <div className="relative min-h-screen text-white">
      <Background />
      <Navbar />
      <Hero />

      <TipsSection
        id="build"
        eyebrow="Build Good Habits"
        title="Plant seeds for your best self"
        subtitle="Science-backed strategies to make new positive habits stick — from the work of James Clear, BJ Fogg, and behavior researchers."
        tips={buildTips}
        accent="from-emerald-500 to-teal-600"
      />

      <TipsSection
        id="break"
        eyebrow="Break Bad Habits"
        title="Cut the chains that hold you back"
        subtitle="Practical techniques to escape unwanted patterns and reclaim your time, energy, and self-respect."
        tips={breakTips}
        accent="from-rose-500 to-red-600"
      />

      <LawsSection />
      <Tracker />
      <QuotesSection />
      <Footer />
    </div>
  );
}
