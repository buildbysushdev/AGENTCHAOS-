# ⚡ AgentChaos — AI Agent Reliability & Chaos Engineering Engine

**AgentChaos** is a complete Chaos Engineering and CI/CD reliability testing engine for autonomous AI agents. It red-teams AI agent system prompts and function tools against diverse adversarial attack vectors, evaluates safety failure modes, computes an **Agent Health Index (AHI)** score, provides interactive execution node flow graphs, auto-patches system prompts with zero-trust guardrails, and exports GitHub Actions CI/CD workflows.

---

## 📁 Repository Structure

```text
agentchaos/
├── backend/
│   ├── main.py                 # FastAPI REST API server
│   ├── scenario_generator.py   # Adversarial red-team scenario generator (Live API & Fallback Engine)
│   ├── sandbox.py              # Isolated agent execution sandbox & trace collector
│   ├── failure_classifier.py   # Rule-based signature matcher & LLM-as-Judge threat classifier
│   ├── auto_patcher.py         # System prompt security hardener
│   ├── sample_agents.py        # Demo agent templates
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── package.json
│   ├── app/
│   │   ├── page.tsx            # Interactive developer dashboard & Plain-English Analyst Report
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── components/
│       ├── ScoreCard.tsx       # Agent Health Index (AHI) gauge card
│       ├── FailureTimeline.tsx # Expandable attack scenario timeline
│       ├── ExecutionGraph.tsx  # Step-by-step LLM thought & tool call node flow graph
│       ├── AutoPatchModal.tsx  # Side-by-side prompt diff comparison modal
│       └── CicdExporter.tsx    # GitHub Actions workflow YAML exporter
└── README.md
```

---

## 🚀 Quick Start Instructions

### 1. Start Backend Server (Python FastAPI)

```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate

# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
> **Backend runs on**: `http://localhost:8000`

---

### 2. Start Frontend App (Next.js 14)

```bash
cd frontend
npm install
npm run dev
```
> **Frontend runs on**: `http://localhost:3000`

---

## 🌟 Key Features & Live Demo Flow

1. **Adversarial Red-Teaming Engine**: Tests agents against 5 core attack categories:
   - 🛡️ **Gaslighting** (Prompt override and fake admin role privilege escalation)
   - 🔥 **Destructive Actions** (Tricking agents into calling high-risk tools without confirmation)
   - 🔁 **Tool Loops** (Ambiguous instructions causing recursive tool calls)
   - 🔑 **Hallucination Triggers** (Leaking or fabricating confidential keys)
   - 🎯 **Goal Drift** (Persona drift outside operational scope)
2. **Agent Health Index (AHI)**: Real-time score (0-100) detailing resilience and threat severity breakdown.
3. **Execution Node Flow Graph**: Step-by-step visual diagram of LLM thoughts, tool calls, arguments, and assistant outputs.
4. **AI Analyst Report (Plain English)**: Translates technical failure traces into plain-English explanations of vulnerabilities and guardrail solutions.
5. **AI Auto-Patch Hardening**: Auto-injects zero-trust security guardrails into system prompts and re-tests resilience score from 0/100 to 100/100 SAFE.
6. **CI/CD Integration**: 1-click exporter for GitHub Actions pre-deploy pull-request workflows.

---

## 🛡️ License

MIT License. Built for IIIT Allahabad Hackathon.
