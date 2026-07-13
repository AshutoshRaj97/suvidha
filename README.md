# Suvidha • सुविधा

A voice-first AI agent that helps Indian citizens discover government welfare schemes they qualify for — in Hindi, English, and 9 other Indian languages.

**Live:** [suvidha-kappa.vercel.app](https://suvidha-kappa.vercel.app)

## What it does

Users talk to Suvidha in their language. She asks a few questions about their state, occupation, income, and family — then tells them exactly which schemes they qualify for (PM Kisan, Ayushman Bharat, PM Awas, MGNREGS, etc.) and how to apply.

## Stack

- **Voice AI**: ElevenLabs Conversational AI (agent with RAG knowledge base)
- **STT**: ElevenLabs Scribe v2 Realtime — auto language detection
- **LLM**: Gemini 2.5 Flash
- **TTS**: ElevenLabs Anika voice
- **Frontend**: Next.js 16 + Tailwind CSS, deployed on Vercel

## Languages supported

Hindi/Hinglish · Tamil · Telugu · Kannada · Bengali · Marathi · Malayalam · Gujarati · English

## Run locally

```bash
npm install
```

Create `.env.local`:
```
ELEVENLABS_API_KEY=your_api_key
ELEVENLABS_AGENT_ID=your_agent_id
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
