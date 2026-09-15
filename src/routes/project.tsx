import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Card, SectionTitle } from "@/components/AppShell";

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "Project Showcase — AI-Based Fitness Schedule Planner" },
      {
        name: "description",
        content:
          "Problem statement, objectives, the 8-step system pipeline, 6-layer architecture, tech stack and future roadmap of the AI-Based Fitness Schedule Planner.",
      },
      { property: "og:title", content: "Project Showcase — AI Fitness Schedule Planner" },
      {
        property: "og:description",
        content: "Problem, solution, pipeline, architecture, tech stack and roadmap.",
      },
    ],
  }),
  component: ProjectPage,
});

const TABS = ["Problem", "Solution", "Pipeline", "Architecture", "Tech Stack", "Roadmap"] as const;
type Tab = (typeof TABS)[number];

const PROBLEMS = [
  ["No Personalization", "Generic plans ignore individual goals, fitness level, and lifestyle."],
  ["Poor Consistency", "Without structure, users skip workouts and lose momentum quickly."],
  ["Exercise Confusion", "Choosing the right exercises at the right intensity is overwhelming."],
  ["Time Constraints", "Busy schedules leave no room for one-size-fits-all routines."],
  ["No Progress Tracking", "Without data, users cannot measure improvement or stay motivated."],
  ["No Weekly Plan", "Absence of a schedule leads to random, ineffective workouts."],
];

const OBJECTIVES = [
  ["Data-Driven Fitness Planning", "Replace guesswork with AI-backed schedule generation."],
  ["Increase Motivation & Adherence", "Structured, achievable goals keep users engaged."],
  ["Recommend Suitable Exercises", "Match type, intensity and duration to capability."],
];

const PIPELINE = [
  ["Enter Personal Fitness Details", "Age, weight, fitness level, and available time are collected."],
  ["Select Fitness Goal", "Weight loss, muscle building, endurance, or general wellness."],
  ["AI Analyzes the Information", "The recommendation engine processes all input parameters."],
  ["Suitable Exercises Selected", "Exercises matched to goal, level, and time constraints."],
  ["Duration & Frequency Calculated", "Optimal session lengths and weekly frequency determined."],
  ["Personalized Weekly Schedule Generated", "A complete, ready-to-follow plan delivered instantly."],
  ["User Completes Workouts & Records Progress", "Activity is logged after each session."],
  ["AI Adjusts Future Recommendations", "Plans evolve dynamically based on performance data."],
];

const ARCHITECTURE = [
  ["User Interface", "Clean, intuitive front-end for data entry and plan display."],
  ["User Profile & Fitness Data", "Stores goals, history, preferences, and progress records."],
  ["AI Recommendation Engine", "Core intelligence layer powering all personalization logic."],
  ["Workout Database", "Library of categorized exercises with metadata and difficulty tiers."],
  ["Schedule Generator", "Assembles the weekly plan based on AI output and constraints."],
  ["Progress Tracking Module", "Logs completed sessions and feeds data back to the AI engine."],
];

const STACK: [string, string[]][] = [
  ["Frontend", ["HTML", "CSS", "JavaScript / React"]],
  ["Backend", ["Python", "Java", "Node.js"]],
  ["AI & ML", ["Python", "ML algorithms"]],
  ["Database", ["MySQL", "MongoDB"]],
  ["Tools", ["VS Code", "GitHub", "API integration"]],
];

const ROADMAP = [
  ["Wearable device integration", "Sync smartwatches and trackers for richer insights."],
  ["AI posture detection using camera", "Real-time form correction to prevent injuries."],
  ["Voice-based workout guidance", "Hands-free instructions and feedback during sessions."],
  ["Real-time heart-rate monitoring", "Optimize intensity and safety with live data."],
  ["Nutrition & diet recommendations", "Meal plans that complement fitness goals."],
  ["AI virtual fitness coach", "Intelligent guidance throughout the journey."],
];

function ProjectPage() {
  const [tab, setTab] = useState<Tab>("Problem");
  const [step, setStep] = useState(0);

  return (
    <AppShell>
      <SectionTitle
        eyebrow="Academic showcase"
        title="AI-Based Fitness Schedule Planner"
        description="Smart workout planning using artificial intelligence — Ramar P (25111090), B.E CSE Cyber Security, Rathinam Technical Campus, 2026–2027."
      />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              tab === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div key={tab} className="animate-rise mt-6">
        {tab === "Problem" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map(([t, d]) => (
              <Card key={t}>
                <h3 className="text-sm font-bold text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </Card>
            ))}
          </div>
        )}

        {tab === "Solution" && (
          <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
            <Card>
              <h3 className="text-lg font-bold">Proposed solution</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                An AI-powered system that analyzes user information and generates fully
                personalized fitness schedules — no guesswork, no wasted effort.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold">
                {["User Input", "AI Analysis", "Personalized Plan", "Workout", "Progress Tracking"].map(
                  (s, i, arr) => (
                    <span key={s} className="flex items-center gap-2">
                      <span className="rounded-lg bg-primary/15 px-3 py-1.5 text-primary">{s}</span>
                      {i < arr.length - 1 && <span className="text-muted-foreground">→</span>}
                    </span>
                  ),
                )}
              </div>
            </Card>
            <div className="grid gap-4">
              {OBJECTIVES.map(([t, d]) => (
                <Card key={t}>
                  <h3 className="text-sm font-bold">{t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab === "Pipeline" && (
          <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
            <div className="grid gap-2">
              {PIPELINE.map(([t], i) => (
                <button
                  key={t}
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                    step === i
                      ? "border-primary bg-primary/12"
                      : "border-border bg-surface text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                      step === i
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t}
                </button>
              ))}
            </div>
            <Card className="glow-ring self-start">
              <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">
                Step {String(step + 1).padStart(2, "0")} of 08
              </p>
              <h3 className="mt-3 text-2xl font-bold">{PIPELINE[step]?.[0]}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{PIPELINE[step]?.[1]}</p>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
                >
                  Previous
                </button>
                <button
                  onClick={() => setStep((s) => (s + 1) % PIPELINE.length)}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
                >
                  Next step
                </button>
              </div>
            </Card>
          </div>
        )}

        {tab === "Architecture" && (
          <div className="grid gap-3">
            {ARCHITECTURE.map(([t, d], i) => (
              <Card key={t} className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15 font-display font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "Tech Stack" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map(([group, items]) => (
              <Card key={group}>
                <h3 className="text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
                  {group}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((it) => (
                    <span
                      key={it}
                      className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "Roadmap" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {ROADMAP.map(([t, d]) => (
              <Card key={t}>
                <h3 className="text-sm font-bold">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
