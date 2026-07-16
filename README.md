# Suvidha • सुविधा

> Voice-first AI that helps Indian citizens discover government welfare schemes — in 9 Indian languages, on WhatsApp and web.

**Live web:** [suvidha-kappa.vercel.app](https://suvidha-kappa.vercel.app)
**WhatsApp:** [+91 70260 12375](https://wa.me/917026012375)

---

## The problem

India has 300+ central and state welfare schemes — PM Kisan, Ayushman Bharat, PM Awas, MGNREGS, Mudra, Ujjwala, and hundreds more. Most eligible citizens never claim them.

Not because they don't want to. Because discovery requires English literacy, internet fluency, and knowing which of 12 government portals to visit. These barriers are hardest to cross for the people who need schemes the most.

## What Suvidha does

Suvidha has a 10-minute conversation with you — on WhatsApp or via voice on the web — in your language. She asks about your state, occupation, income, family, and BPL status. Then she tells you exactly which schemes you qualify for, the amounts, and how to apply.

No forms. No portals. No literacy barrier. Just talk.

## Languages

Hindi/Hinglish · Tamil · Telugu · Kannada · Bengali · Marathi · Malayalam · Gujarati · English

## Stack

| Layer | Technology |
|---|---|
| Voice AI | ElevenLabs Conversational AI |
| STT | ElevenLabs Scribe v2 Realtime (auto language detection) |
| LLM | Gemini 2.5 Flash |
| TTS | Anika (primary, multilingual) · Meera (Tamil) |
| Knowledge Base | RAG over national + state schemes (ElevenLabs KB) |
| Frontend | Next.js + Tailwind CSS |
| Deployment | Vercel |

## Knowledge base

`knowledge_base/national_schemes.txt` contains 25+ central government schemes with:
- Exact eligibility criteria
- Benefit amounts (verified FY2025-26 data)
- Required documents
- Where to apply

State-specific schemes for Tamil Nadu, Maharashtra, UP, Bihar, West Bengal, Karnataka, Gujarat, Rajasthan, and more are loaded into the ElevenLabs knowledge base separately.

## Architecture

```
User (WhatsApp / Web)
        ↓
ElevenLabs Conversational AI
  ├── Scribe v2 ASR  → detects language from speech
  ├── Gemini 2.5 Flash → understands context, queries KB, generates response
  ├── RAG KB  → retrieves matching schemes
  └── TTS (Anika / Meera) → speaks response in user's language
        ↓
Next.js frontend (web) / WhatsApp (via ElevenLabs WhatsApp integration)
```

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

## Contributing

Contributions welcome. High-value areas:

- **More schemes** — state-specific schemes for states not yet covered
- **Accuracy** — flag scheme data that's outdated or incorrect
- **Languages** — improve prompts for specific regional languages
- **UX** — frontend improvements for low-bandwidth / low-literacy users

Open an issue or PR.

## License

MIT — see [LICENSE](LICENSE).

Built with [ElevenLabs](https://elevenlabs.io) Conversational AI.
