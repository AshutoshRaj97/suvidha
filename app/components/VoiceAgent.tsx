"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";

interface Message {
  id: number;
  text: string;
  role: "user" | "ai";
}

function AgentCore() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const { startSession, endSession, status, mode } = useConversation({
    onMessage: ({ message, source }) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: message, role: source },
      ]);
    },
    onError: (msg) => setError(String(msg)),
  });

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStart = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/get-signed-url");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      startSession({ signedUrl: data.signedUrl });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to start session");
    }
  }, [startSession]);

  const handleEnd = useCallback(() => {
    endSession();
  }, [endSession]);

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";
  const isSpeaking = mode === "speaking";

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto px-4">
      {/* Mic button */}
      <div className="relative flex items-center justify-center">
        {isConnected && (
          <>
            <span
              className={`absolute rounded-full bg-orange-500/20 transition-all duration-700 ${
                isSpeaking ? "w-52 h-52 opacity-100" : "w-40 h-40 opacity-60"
              }`}
            />
            <span
              className={`absolute rounded-full bg-orange-500/10 transition-all duration-700 ${
                isSpeaking ? "w-64 h-64 opacity-100" : "w-48 h-48 opacity-40"
              }`}
            />
          </>
        )}
        <button
          onClick={isConnected ? handleEnd : handleStart}
          disabled={isConnecting}
          className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/50 ${
            isConnected
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : isConnecting
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-[#1a2340] hover:bg-[#243060] border border-orange-500/30 text-orange-400"
          }`}
          aria-label={isConnected ? "End conversation" : "Start conversation"}
        >
          {isConnecting ? (
            <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : isConnected ? (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
            </svg>
          )}
        </button>
      </div>

      {/* Status */}
      <div className="text-center">
        {isConnected ? (
          <p className="text-sm font-medium">
            {isSpeaking ? (
              <span className="text-orange-400">Suvidha बोल रही है...</span>
            ) : (
              <span className="text-green-400">सुन रही है — बोलें</span>
            )}
          </p>
        ) : isConnecting ? (
          <p className="text-sm text-gray-400">जोड़ रहे हैं...</p>
        ) : (
          <p className="text-sm text-gray-500">
            बात करें · பேசுங்கள் · మాట్లాడండి · ಮಾತನಾಡಿ
            <span className="block text-xs mt-1 text-gray-600">
              বলুন · बोला · സംസാരിക്കൂ · બોલો · Speak
            </span>
            <span className="block text-xs mt-1">Press the mic to start in your language</span>
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Transcript */}
      {messages.length > 0 && (
        <div
          ref={transcriptRef}
          className="w-full max-h-80 overflow-y-auto flex flex-col gap-3 pr-1"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white rounded-br-sm"
                    : "bg-[#1a2340] text-gray-200 rounded-bl-sm"
                }`}
              >
                {msg.role === "ai" && (
                  <span className="text-xs text-orange-400 font-medium block mb-1">
                    Suvidha
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VoiceAgent() {
  return (
    <ConversationProvider>
      <AgentCore />
    </ConversationProvider>
  );
}
