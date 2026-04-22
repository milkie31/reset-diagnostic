import { useState, useEffect, useRef } from "react";

// ── FONTS ─────────────────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Dancing+Script:wght@600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

// ── TOKENS ────────────────────────────────────────────────────────────────────
const T = {
  gold:   "#C9A84C",
  navy:   "#1B2D5B",
  cream:  "#F8F3EA",
  cream2: "#F0E8D8",
  brown:  "#3D2B1F",
  sage:   "#2D6A4F",
  red:    "#B03030",
};

const serif  = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans   = { fontFamily: "'Lato', sans-serif" };
const script = { fontFamily: "'Dancing Script', cursive" };

// ── PILLAR DATA ───────────────────────────────────────────────────────────────
const PILLARS = [
  {
    letter: "R",
    label: "Research Direction",
    color: T.navy,
    tagline: "Strategy over experiments",
    source: "Stop Doing Experiments — Start Designing a Strategy",
    questions: [
      {
        text: "When you sit down to work, do you know exactly how today's task connects to your thesis contribution?",
        options: [
          { label: "Rarely — I just do what needs to be done", score: 1 },
          { label: "Sometimes — I can see it after the fact", score: 2 },
          { label: "Yes — I can name the connection before I start", score: 3 },
        ],
      },
      {
        text: "Is your research driven by a clear thesis question you've written down — or are you running experiments hoping clarity will emerge?",
        options: [
          { label: "Hoping clarity emerges", score: 1 },
          { label: "Somewhere in between", score: 2 },
          { label: "I have a written, focused question", score: 3 },
        ],
      },
    ],
    diagnoses: {
      low:  "You're doing reactive science — running experiments before you have a thesis question. This is the #1 reason PhD students stagnate for years without realizing why. Every week, you're producing data that may not belong to any thesis.",
      mid:  "You have research instincts but not a research strategy. You can see the connection between your work and your thesis — but it's not written down, which means it shifts depending on the week and the advisor meeting.",
      high: "Your research direction is your anchor. You're doing strategic science — work that is explicitly designed to answer a question your thesis depends on.",
    },
  },
  {
    letter: "E",
    label: "Execution Structure",
    color: "#2D4A8A",
    tagline: "PM skills academia never taught you",
    source: "Why Smart PhD Students Burn Out: They Never Learned Project Management",
    questions: [
      {
        text: "Do you have a consistent weekly system that tells you what your single most important thesis-moving task is?",
        options: [
          { label: "No — I figure it out day-by-day", score: 1 },
          { label: "Loosely — I have a rough sense", score: 2 },
          { label: "Yes — I identify it every Sunday before the week starts", score: 3 },
        ],
      },
      {
        text: "Can you distinguish between 'thesis-critical work' and 'busy work' — and protect your hours accordingly?",
        options: [
          { label: "No — it all feels equally urgent", score: 1 },
          { label: "Sometimes — I notice in hindsight", score: 2 },
          { label: "Yes — and I protect thesis time first", score: 3 },
        ],
      },
    ],
    diagnoses: {
      low:  "Your execution is reactive, not strategic. You work hard but without a structure that filters what actually moves your thesis forward. The project management skills academia never taught you are the missing layer — and without them, more effort just produces more exhaustion.",
      mid:  "You have some structure, but it's fragile. One difficult experiment or a demanding advisor week is enough to knock your system offline. You haven't yet automated the discipline of thesis-first prioritization.",
      high: "You run your week like a strategic researcher — not a reactive one. You know your primary output before the week begins, and you protect the time to do it.",
    },
  },
  {
    letter: "S",
    label: "Success Metrics",
    color: T.sage,
    tagline: "Progress without grades",
    source: "How to Measure Progress in a System with No Grades",
    questions: [
      {
        text: "Can you name 3 specific things you accomplished last month that moved your thesis forward?",
        options: [
          { label: "Not really — the month blurs together", score: 1 },
          { label: "Maybe 1–2, but I'm not certain they were thesis-critical", score: 2 },
          { label: "Yes — and I have them written down somewhere", score: 3 },
        ],
      },
      {
        text: "Do you have a way to measure progress that isn't dependent on whether your data is cooperating?",
        options: [
          { label: "No — good data = good week, bad data = bad week", score: 1 },
          { label: "Sort of — I count effort, but it still feels vague", score: 2 },
          { label: "Yes — I track outputs and milestones regardless of results", score: 3 },
        ],
      },
    ],
    diagnoses: {
      low:  "Your sense of progress is entirely data-dependent — which means your confidence, energy, and momentum live or die on whether experiments cooperate. This is a dangerous system in a PhD, where negative data is the norm. You have no metric that tells you you're moving forward when results are ambiguous.",
      mid:  "You track effort but not strategic output. You know you worked — but you can't tell if that work actually advanced your thesis. There's no milestone system creating the psychology of consistent wins.",
      high: "You've built a progress system that doesn't depend on your data cooperating. That's a rare skill in academia. You know when you've had a good week — regardless of whether the experiment worked.",
    },
  },
  {
    letter: "E",
    label: "Energy Stewardship",
    color: "#6B4C2A",
    tagline: "The eternal mindset over the hustle trap",
    source: "The PhD Marathon: Doing Less with an Eternal Mindset",
    questions: [
      {
        text: "Does your current PhD work pace feel sustainable — or are you constantly running behind and recovering?",
        options: [
          { label: "Constantly behind — I'm always trying to catch up", score: 1 },
          { label: "Mixed — sustainable some weeks, chaotic others", score: 2 },
          { label: "Mostly sustainable — I work from structure, not panic", score: 3 },
        ],
      },
      {
        text: "Does your PhD work feel connected to a calling bigger than your career — or does it mostly feel like survival?",
        options: [
          { label: "Survival — I've lost sight of why I started", score: 1 },
          { label: "Occasionally I feel the calling, but it fades fast", score: 2 },
          { label: "Yes — my work is grounded in purpose, not just performance", score: 3 },
        ],
      },
    ],
    diagnoses: {
      low:  "You're running a sprint pace in a marathon. The urgency loop — working hard because you feel behind, feeling more behind because the work never ends — is not a productivity problem. It's an identity and sustainability problem. No system survives on this foundation long-term.",
      mid:  "You're caught between two modes: sustainable seasons and crash seasons. The Kingdom calling is still accessible to you, but it's not yet the structural anchor for how you work. You need a slow productivity framework, not a faster one.",
      high: "You've found a rhythm that sustains you. Your work is grounded in something deeper than your results, which means hard seasons don't strip your identity. This is rare — and it's worth protecting.",
    },
  },
  {
    letter: "T",
    label: "Thesis System",
    color: "#5C3D7A",
    tagline: "The system that connects everything",
    source: "Why Your Current Research System Is Not Working for You",
    questions: [
      {
        text: "Does your current research system account for your specific PhD stage and contribution type — or is it a generic productivity approach that doesn't fit research?",
        options: [
          { label: "Generic — I use the same system as everyone else", score: 1 },
          { label: "Somewhat adapted, but still feels like a bad fit", score: 2 },
          { label: "Tailored — built specifically for my research phase", score: 3 },
        ],
      },
      {
        text: "If you had to explain your thesis contribution in 2 sentences right now — confidently — could you do it?",
        options: [
          { label: "No — it's vague or I avoid thinking about it", score: 1 },
          { label: "Roughly — but I wouldn't say it confidently to my committee", score: 2 },
          { label: "Yes — I have a written thesis narrative I believe in", score: 3 },
        ],
      },
    ],
    diagnoses: {
      low:  "Your thesis isn't a system yet — it's a collection of ongoing work. Without a thesis system that connects your experiments to a contribution narrative, no amount of effort produces forward momentum. You're building without a blueprint.",
      mid:  "You have pieces of a thesis system, but they're not connected. You can see your research contribution most of the time — but you don't have a written thesis narrative that you could defend tomorrow if you had to.",
      high: "You have a thesis system, not just a thesis topic. You know your contribution, you can articulate it, and your weekly work is explicitly organized to build toward it. You're doing PhD work the way it was meant to be done.",
    },
  },
];

function getDiagnosisLevel(score) {
  if (score <= 2) return "low";
  if (score <= 4) return "mid";
  return "high";
}

function getLevelLabel(level) {
  if (level === "low")  return { text: "Critical Gap",    color: T.red,  bg: "#FDF0F0" };
  if (level === "mid")  return { text: "Developing",      color: "#B07820", bg: "#FDF6E8" };
  return                       { text: "Strong",          color: T.sage, bg: "#EBF5EE" };
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function OptionButton({ option, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "14px 18px",
        borderRadius: 14,
        border: `1.5px solid ${selected ? T.gold : "#DDD3C0"}`,
        background: selected ? `${T.gold}12` : T.cream,
        cursor: "pointer",
        transition: "all 0.18s",
        display: "flex",
        alignItems: "center",
        gap: 12,
        ...sans,
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
        border: `2px solid ${selected ? T.gold : "#C5B99A"}`,
        background: selected ? T.gold : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.18s",
      }}>
        {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
      </div>
      <span style={{ fontSize: 14, color: T.brown, lineHeight: 1.5 }}>{option.label}</span>
    </button>
  );
}

function ProgressBar({ value, max, color, animated }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ position: "relative", height: 10, borderRadius: 99, background: "#E8DFC8", overflow: "hidden" }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: animated ? `${pct}%` : 0,
        background: `linear-gradient(90deg, ${color}, ${color}CC)`,
        borderRadius: 99,
        transition: animated ? "width 1s cubic-bezier(0.4,0,0.2,1)" : "none",
      }} />
    </div>
  );
}

function ScoreBar({ pillar, score, animated }) {
  const max = 6;
  const level = getDiagnosisLevel(score);
  const lbl = getLevelLabel(level);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: pillar.color, color: "#fff", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, ...sans, flexShrink: 0,
          }}>{pillar.letter}</div>
          <span style={{ fontSize: 13, color: T.brown, ...sans, fontWeight: 600 }}>{pillar.label}</span>
        </div>
        <div style={{
          fontSize: 11, fontWeight: 700, color: lbl.color,
          background: lbl.bg, border: `1px solid ${lbl.color}40`,
          borderRadius: 99, padding: "2px 10px", ...sans,
        }}>{lbl.text}</div>
      </div>
      <ProgressBar value={score} max={max} color={pillar.color} animated={animated} />
    </div>
  );
}

// ── SCREENS ───────────────────────────────────────────────────────────────────

function WelcomeScreen({ onStart }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center",
      background: `radial-gradient(ellipse 80% 50% at 50% 0%, #E8DFC870, transparent), ${T.cream}`,
    }}>
      {/* Brand header */}
      <p style={{ fontSize: 11, letterSpacing: "0.25em", color: T.gold, ...sans, marginBottom: 28, textTransform: "uppercase" }}>
        Kingdom-Minded PhD Scientists
      </p>

      {/* RESET letters */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, justifyContent: "center" }}>
        {["R","E","S","E","T"].map((l, i) => (
          <div key={i} style={{
            width: 52, height: 52, borderRadius: 14,
            background: [T.navy, "#2D4A8A", T.sage, "#6B4C2A", "#5C3D7A"][i],
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 22, fontWeight: 700, ...sans,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}>{l}</div>
        ))}
      </div>

      <h1 style={{ ...serif, color: T.navy, fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 8, maxWidth: 540 }}>
        The PhD Research
        <br /><em style={{ color: T.gold }}>System Diagnostic</em>
      </h1>

      <p style={{ ...sans, color: "#888", fontSize: 13, letterSpacing: "0.12em", marginBottom: 28, textTransform: "uppercase" }}>
        5 Pillars · 10 Questions · 2 Minutes
      </p>

      <div style={{
        maxWidth: 480, background: "#fff8", border: `1px solid ${T.gold}30`,
        borderRadius: 20, padding: "24px 28px", marginBottom: 36,
        backdropFilter: "blur(8px)",
      }}>
        <p style={{ ...sans, color: T.brown, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
          Most PhD students don't have a time problem.
          <br />They have a <strong>system problem</strong>.
        </p>
        <div style={{ height: 1, background: `${T.gold}30`, margin: "16px 0" }} />
        <p style={{ ...sans, color: "#888", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          This diagnostic identifies exactly which of the 5 pillars of your research system is breaking down — so you know where to build first.
        </p>
      </div>

      <button
        onClick={onStart}
        style={{
          background: T.navy, color: "#fff", border: "none",
          borderRadius: 999, padding: "16px 40px",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
          letterSpacing: "0.03em", ...sans,
          boxShadow: "0 8px 32px rgba(27,45,91,0.25)",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={e => e.target.style.opacity = 0.9}
        onMouseLeave={e => e.target.style.opacity = 1}
      >
        Run My Diagnostic →
      </button>

      <p style={{ ...sans, color: "#BBB", fontSize: 11, marginTop: 16 }}>
        No email required · Free · Instant results
      </p>

      {/* Proverbs */}
      <p style={{ ...serif, fontStyle: "italic", color: "#AAA", fontSize: 14, marginTop: 36, maxWidth: 360 }}>
        "The plans of the diligent lead to profit as surely as haste leads to poverty." — Prov. 21:5
      </p>
    </div>
  );
}

function QuestionScreen({ pillar, pillarIndex, totalPillars, question, questionIndex, answers, onAnswer, onNext, onBack, isLast }) {
  const totalQ = totalPillars * 2;
  const currentQ = pillarIndex * 2 + questionIndex + 1;
  const pct = ((currentQ - 1) / totalQ) * 100;
  const selected = answers?.[questionIndex] ?? null;

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      background: T.cream, padding: "0 0 40px",
    }}>
      {/* Top bar */}
      <div style={{
        padding: "20px 24px 16px",
        borderBottom: `1px solid ${T.gold}20`,
        background: "rgba(248,243,234,0.95)",
        backdropFilter: "blur(8px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: pillar.color, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, ...sans, flexShrink: 0,
              }}>{pillar.letter}</div>
              <div>
                <div style={{ fontSize: 10, color: T.gold, ...sans, letterSpacing: "0.12em", textTransform: "uppercase" }}>Pillar {pillarIndex + 1} of {totalPillars}</div>
                <div style={{ fontSize: 13, color: T.navy, fontWeight: 600, ...sans }}>{pillar.label}</div>
              </div>
            </div>
            <span style={{ fontSize: 12, color: "#AAA", ...sans }}>{currentQ} / {totalQ}</span>
          </div>
          {/* Overall progress */}
          <div style={{ height: 4, borderRadius: 99, background: "#E0D5C5", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 99,
              width: `${pct + (selected !== null ? (1/totalQ)*100 : 0)}%`,
              background: `linear-gradient(90deg, ${T.gold}, #E8C060)`,
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 0", maxWidth: 560, margin: "0 auto", width: "100%" }}>
        {/* Pillar tagline */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: `${pillar.color}12`, border: `1px solid ${pillar.color}30`,
          borderRadius: 99, padding: "4px 14px", marginBottom: 28,
        }}>
          <span style={{ fontSize: 11, color: pillar.color, ...sans, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
            {pillar.tagline}
          </span>
        </div>

        {/* Question */}
        <h2 style={{
          ...serif, color: T.navy, fontSize: "clamp(20px, 4vw, 28px)",
          fontWeight: 400, lineHeight: 1.4, textAlign: "center",
          marginBottom: 32, maxWidth: 480,
        }}>
          {question.text}
        </h2>

        {/* Options */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((opt, i) => (
            <OptionButton
              key={i}
              option={opt}
              selected={selected === i}
              onClick={() => onAnswer(i)}
            />
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{
        maxWidth: 560, margin: "32px auto 0", width: "100%",
        padding: "0 24px", display: "flex", gap: 12,
      }}>
        <button
          onClick={onBack}
          style={{
            flex: 1, padding: "14px", borderRadius: 999,
            border: `1.5px solid ${T.navy}`, background: "transparent",
            color: T.navy, fontSize: 14, cursor: "pointer", ...sans, fontWeight: 600,
          }}
        >← Back</button>
        <button
          onClick={onNext}
          disabled={selected === null}
          style={{
            flex: 2, padding: "14px", borderRadius: 999,
            background: selected !== null ? T.navy : "#C5B99A",
            color: "#fff", fontSize: 14, cursor: selected !== null ? "pointer" : "not-allowed",
            border: "none", ...sans, fontWeight: 600,
            transition: "background 0.2s",
          }}
        >
          {isLast ? "See My Results →" : "Next →"}
        </button>
      </div>
    </div>
  );
}

function ResultsScreen({ scores }) {
  const [barsReady, setBarsReady] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setBarsReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const total = scores.reduce((a, b) => a + b, 0);
  const maxTotal = PILLARS.length * 6;
  const pctTotal = Math.round((total / maxTotal) * 100);

  const weakest = scores
    .map((s, i) => ({ i, s }))
    .sort((a, b) => a.s - b.s)
    .slice(0, 2);

  const systemLevel = pctTotal <= 40 ? "critical" : pctTotal <= 65 ? "developing" : "strong";
  const systemLabels = {
    critical:   { text: "Needs Rebuilding",   color: T.red,      bg: "#FDF0F0" },
    developing: { text: "Partially Working",  color: "#B07820",  bg: "#FDF6E8" },
    strong:     { text: "Mostly Operational", color: T.sage,     bg: "#EBF5EE" },
  };
  const sysLbl = systemLabels[systemLevel];

  return (
    <div style={{ minHeight: "100vh", background: T.cream, paddingBottom: 60 }}>

      {/* Header band */}
      <div style={{
        background: T.navy, padding: "40px 24px 36px", textAlign: "center",
      }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: T.gold, ...sans, marginBottom: 16, textTransform: "uppercase" }}>
          Your RESET Diagnostic Results
        </p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: sysLbl.bg, border: `1px solid ${sysLbl.color}60`,
          borderRadius: 99, padding: "6px 20px", marginBottom: 16,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: sysLbl.color, ...sans }}>
            Overall System: {sysLbl.text}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: "center", marginBottom: 6 }}>
          <span style={{ ...serif, color: T.gold, fontSize: 56, fontWeight: 300 }}>{pctTotal}</span>
          <span style={{ ...serif, color: "rgba(255,255,255,0.5)", fontSize: 28 }}>/ 100</span>
        </div>
        <p style={{ ...sans, color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
          PhD Research System Score
        </p>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 24px 0" }}>

        {/* Score bars */}
        <div style={{
          background: "#fff", borderRadius: 20, padding: "24px",
          border: `1px solid #E0D5C5`, marginBottom: 24,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}>
          <p style={{ ...sans, fontSize: 11, letterSpacing: "0.15em", color: T.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>
            Pillar Breakdown
          </p>
          {PILLARS.map((p, i) => (
            <ScoreBar key={i} pillar={p} score={scores[i]} animated={barsReady} />
          ))}
        </div>

        {/* Diagnoses */}
        <p style={{ ...sans, fontSize: 11, letterSpacing: "0.15em", color: T.gold, textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
          Your Diagnoses
        </p>

        {PILLARS.map((p, i) => {
          const level = getDiagnosisLevel(scores[i]);
          const lbl = getLevelLabel(level);
          const isOpen = expanded === i;
          const isWeak = weakest.some(w => w.i === i);

          return (
            <div
              key={i}
              onClick={() => setExpanded(isOpen ? null : i)}
              style={{
                borderRadius: 18, marginBottom: 10, overflow: "hidden",
                border: `1.5px solid ${isOpen ? p.color : "#DDD3C0"}`,
                background: isOpen ? "#FFFDF8" : T.cream,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <div style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: p.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, ...sans, flexShrink: 0,
                }}>{p.letter}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: T.navy }}>{p.label}</span>
                    {isWeak && (
                      <span style={{
                        fontSize: 10, ...sans, fontWeight: 700, color: T.red,
                        background: "#FDF0F0", border: `1px solid ${T.red}30`,
                        borderRadius: 99, padding: "2px 8px",
                      }}>Priority Fix</span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: "#AAA", ...sans }}>{p.tagline}</span>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: lbl.color,
                  background: lbl.bg, border: `1px solid ${lbl.color}40`,
                  borderRadius: 99, padding: "3px 10px", ...sans, flexShrink: 0,
                }}>{lbl.text}</div>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: T.cream2, display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.navy, fontSize: 16, flexShrink: 0,
                  transform: isOpen ? "rotate(45deg)" : "none",
                  transition: "transform 0.2s",
                }}>+</div>
              </div>

              {isOpen && (
                <div style={{ padding: "0 18px 18px", paddingLeft: 70 }}>
                  <div style={{ height: 1, background: `${p.color}25`, marginBottom: 14 }} />
                  <p style={{ ...sans, fontSize: 13, color: T.brown, lineHeight: 1.75, margin: "0 0 12px" }}>
                    {p.diagnoses[level]}
                  </p>
                  <p style={{ ...sans, fontSize: 11, color: "#AAA", fontStyle: "italic" }}>
                    From: "{p.source}"
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Scripture */}
        <div style={{
          margin: "28px 0", padding: "24px", textAlign: "center",
          borderTop: `1px solid ${T.gold}30`, borderBottom: `1px solid ${T.gold}30`,
        }}>
          <p style={{ ...serif, fontStyle: "italic", color: T.navy, fontSize: 18, lineHeight: 1.6, margin: "0 0 8px" }}>
            "Be very careful, then, how you live — not as unwise but as wise, making the most of every opportunity."
          </p>
          <p style={{ ...sans, fontSize: 11, color: T.gold, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Ephesians 5:15–16
          </p>
        </div>

        {/* CTA */}
        <div style={{
          background: T.navy, borderRadius: 24, padding: "32px 28px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: T.gold, ...sans, marginBottom: 14, textTransform: "uppercase" }}>
            Ready to Fix Your System?
          </p>
          <h2 style={{ ...serif, color: T.cream, fontSize: 28, fontWeight: 400, lineHeight: 1.3, marginBottom: 12 }}>
            Kingdom-Minded PhD:
            <br /><em style={{ color: T.gold }}>The 90-Day Reset</em>
          </h2>
          <p style={{ ...sans, color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>
            A 90-day clarity and execution system built around exactly these 5 pillars — designed for STEM PhD students in years 2–5 who are ready to stop spinning their wheels.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a
              href="https://kingdom-minded-phd.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block", padding: "15px", borderRadius: 999,
                background: `linear-gradient(135deg, ${T.gold}, #E8C060)`,
                color: T.navy, textDecoration: "none",
                fontSize: 14, fontWeight: 700, ...sans,
                letterSpacing: "0.02em",
              }}
            >
              Apply for the 90-Day Reset →
            </a>
            <a
              href="https://www.instagram.com/lydiapark.phd"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block", padding: "13px", borderRadius: 999,
                border: `1.5px solid rgba(255,255,255,0.3)`,
                color: "rgba(255,255,255,0.8)", textDecoration: "none",
                fontSize: 13, ...sans,
              }}
            >
              DM me "RESET" on Instagram
            </a>
          </div>

          <p style={{ ...sans, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 16 }}>
            @lydiapark.phd · Stay strategic. Stay rooted.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function RESETDiagnostic() {
  // screen: "welcome" | "question" | "results"
  const [screen, setScreen] = useState("welcome");
  // answers[pillarIndex][questionIndex] = optionIndex (0–2)
  const [answers, setAnswers] = useState(
    PILLARS.map(() => [null, null])
  );
  const [cursor, setCursor] = useState({ pillar: 0, question: 0 });

  const totalQuestions = PILLARS.length * 2;
  const flatIndex = cursor.pillar * 2 + cursor.question;
  const isLastQuestion = flatIndex === totalQuestions - 1;

  const currentPillar   = PILLARS[cursor.pillar];
  const currentQuestion = currentPillar.questions[cursor.question];

  function handleAnswer(optionIndex) {
    setAnswers(prev => {
      const next = prev.map(a => [...a]);
      next[cursor.pillar][cursor.question] = optionIndex;
      return next;
    });
  }

  function handleNext() {
    if (answers[cursor.pillar][cursor.question] === null) return;
    if (isLastQuestion) {
      setScreen("results");
      return;
    }
    if (cursor.question === 1) {
      setCursor({ pillar: cursor.pillar + 1, question: 0 });
    } else {
      setCursor({ pillar: cursor.pillar, question: cursor.question + 1 });
    }
  }

  function handleBack() {
    if (flatIndex === 0) {
      setScreen("welcome");
      return;
    }
    if (cursor.question === 0) {
      setCursor({ pillar: cursor.pillar - 1, question: 1 });
    } else {
      setCursor({ pillar: cursor.pillar, question: cursor.question - 1 });
    }
  }

  // Compute scores: sum of chosen option scores per pillar
  const scores = answers.map((pillarAnswers, pi) =>
    pillarAnswers.reduce((sum, answerIndex, qi) => {
      if (answerIndex === null) return sum;
      return sum + PILLARS[pi].questions[qi].options[answerIndex].score;
    }, 0)
  );

  return (
    <>
      <FontLoader />
      <div style={{ maxWidth: 600, margin: "0 auto", ...sans, overflowX: "hidden" }}>
        {screen === "welcome" && <WelcomeScreen onStart={() => setScreen("question")} />}
        {screen === "question" && (
          <QuestionScreen
            pillar={currentPillar}
            pillarIndex={cursor.pillar}
            totalPillars={PILLARS.length}
            question={currentQuestion}
            questionIndex={cursor.question}
            answers={answers[cursor.pillar]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
            isLast={isLastQuestion}
          />
        )}
        {screen === "results" && <ResultsScreen scores={scores} />}
      </div>
    </>
  );
}
