import DynamicVoiceAgent from "./components/DynamicVoiceAgent";

const SCHEMES = [
  {
    name: "PM Kisan",
    hindi: "पीएम किसान",
    desc: "₹6,000/year for farmers",
    color: "from-green-900/40 to-green-800/20",
    border: "border-green-700/30",
    badge: "Farmer",
  },
  {
    name: "Ayushman Bharat",
    hindi: "आयुष्मान भारत",
    desc: "₹5 lakh health cover/year",
    color: "from-blue-900/40 to-blue-800/20",
    border: "border-blue-700/30",
    badge: "Health",
  },
  {
    name: "PM Awas Yojana",
    hindi: "पीएम आवास",
    desc: "Subsidy to build a pucca house",
    color: "from-purple-900/40 to-purple-800/20",
    border: "border-purple-700/30",
    badge: "Housing",
  },
  {
    name: "PM Mudra Yojana",
    hindi: "मुद्रा योजना",
    desc: "Loans up to ₹10L, no collateral",
    color: "from-orange-900/40 to-orange-800/20",
    border: "border-orange-700/30",
    badge: "Business",
  },
  {
    name: "Ujjwala Yojana",
    hindi: "उज्ज्वला योजना",
    desc: "Free LPG for BPL women",
    color: "from-pink-900/40 to-pink-800/20",
    border: "border-pink-700/30",
    badge: "Women",
  },
  {
    name: "MGNREGS",
    hindi: "मनरेगा",
    desc: "100 days guaranteed employment",
    color: "from-yellow-900/40 to-yellow-800/20",
    border: "border-yellow-700/30",
    badge: "Employment",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center text-xs font-bold">
            स
          </div>
          <span className="font-semibold text-white">
            Suvidha <span className="text-orange-400">•</span>{" "}
            <span className="text-gray-400 font-normal">सुविधा</span>
          </span>
        </div>
        <span className="text-xs text-gray-600 hidden sm:block">
          Powered by ElevenLabs Conversational AI
        </span>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-14 pb-10 px-4">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-xs text-orange-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          Voice-first · 9 Indian Languages · Free
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          अपनी{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            सरकारी योजना
          </span>{" "}
          जानें
        </h1>
        <p className="text-gray-400 max-w-lg text-base sm:text-lg mt-2">
          Speak to Suvidha in your language — Hindi, Tamil, Telugu, Bengali, and
          more. She&apos;ll find every government scheme you qualify for and
          explain how to apply.
        </p>
      </section>

      {/* Voice Agent */}
      <section className="flex-1 flex flex-col items-center justify-center py-6 px-4">
        <DynamicVoiceAgent />
      </section>

      {/* Scheme cards */}
      <section className="py-14 px-4 border-t border-white/5">
        <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-8">
          Schemes Suvidha knows about
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {SCHEMES.map((s) => (
            <div
              key={s.name}
              className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-4`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                {s.badge}
              </span>
              <p className="text-sm font-semibold text-white mt-1">{s.name}</p>
              <p className="text-xs text-gray-400">{s.hindi}</p>
              <p className="text-xs text-gray-300 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-white/5">
        <p className="text-xs text-gray-700">
          Built with{" "}
          <span className="text-gray-500">ElevenLabs Conversational AI</span>
          {" "}· A proof-of-concept for voice-first civic access in India
        </p>
      </footer>
    </main>
  );
}
