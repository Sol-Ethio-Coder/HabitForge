import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TipsSection from "./components/TipsSection";
import LawsSection from "./components/LawsSection";
import Tracker from "./components/Tracker";
import FocusTimer from "./components/FocusTimer";
import BurnHabit from "./components/BurnHabit";
import QuotesSection from "./components/QuotesSection";
import Footer from "./components/Footer";
import { buildTips, breakTips, relationshipTips, recoveryTips } from "./data";
import { useReveal } from "./components/useReveal";

export default function App() {
  useReveal();

  return (
    <div className="relative min-h-screen text-white">
      <Background />
      <Navbar />
      <Hero />

      <Tracker />
      <FocusTimer />
      <BurnHabit />

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
        accent="from-orange-500 to-red-600"
      />

      <TipsSection
        id="relationships"
        eyebrow="Connection Habits"
        title="Foster Deep Relationships"
        subtitle="Strong relationships don't just happen. They are built through intentional, daily habits of connection and empathy."
        tips={relationshipTips}
        accent="from-pink-500 to-rose-600"
      />

      <TipsSection
        id="recovery"
        eyebrow="Dopamine Recovery"
        title="Overcome Compulsions"
        subtitle="Tactics to break free from high-dopamine habits like pornography, regain mental clarity, and reclaim your natural drive."
        tips={recoveryTips}
        accent="from-blue-500 to-indigo-600"
      />

      <LawsSection />
      <QuotesSection />
      <Footer />
    </div>
  );
}
