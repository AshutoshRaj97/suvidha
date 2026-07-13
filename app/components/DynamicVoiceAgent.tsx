"use client";

import dynamic from "next/dynamic";

const VoiceAgent = dynamic(() => import("./VoiceAgent"), {
  ssr: false,
  loading: () => (
    <div className="w-32 h-32 rounded-full bg-[#1a2340] animate-pulse mx-auto" />
  ),
});

export default function DynamicVoiceAgent() {
  return <VoiceAgent />;
}
