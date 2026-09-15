import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Brain,
  Check,
  ChevronRight,
  Clock,
  Dumbbell,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import { AppShell, Card, SectionTitle } from "@/components/AppShell";
import { usePlanner } from "@/lib/fitness/store";
import {
  GOAL_LABELS,
  LEVEL_LABELS,
  PREFERRED_LABELS,
  TIER_NAMES,
  type Goal,
  type Level,
  type PreferredType,
  type Profile,
} from "@/lib/fitness/engine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Fitness Schedule Planner — Personalized 7-Day Workout Plans" },
      {
        name: "description",
        content:
          "Enter your goal, fitness level and available time to instantly generate an adaptive 7-day workout schedule with sets, reps and target muscles.",
      },
      { property: "og:title", content: "AI Fitness Schedule Planner" },
      {
        property: "og:description",
        content:
          "Instantly generate a personalized, self-adjusting 7-day workout schedule powered by an AI recommendation engine.",
      },
    ],
  }),
  component: PlannerPage,
});

const DEFAULTS: Profile = {
  name: "",
  age: 21,
  weight: 68,
  goal: "muscle-gain",
  dailyMinutes: 45,
  level: "beginner",
  preferred: "mixed",
};

function PlannerPage() {
  const { state, setProfile } = usePlanner();

  return (
    <AppShell>
      {state.profile ? <PlanView /> : <Onboarding onSubmit={setProfile} />}
    </AppShell>
  );
}

/* ---------------- Onboarding ---------------- */

function Onboarding({ onSubmit }: { onSubmit: (p: Profile) => void }) {
  const [form, setForm] = useState<Profile>(DEFAULTS);
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="animate-rise">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" /> AI Recommendation Engine
          </span>
          <h1 className="mt-5 text-4xl leading-[1.05] font-bold sm:text-5xl">
            Plan smart. Train better.
            <span className="block text-primary">Stay fit.</span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Tell the engine about yourself. It analyses your goal, level, and available time to
            build a complete 7-day schedule — then adapts every week based on what you actually
            complete.
          </p>
        </div>
      </div>

      <form
        className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <Card>
          <h2 className="text-lg font-bold">Your fitness details</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Step 01 · Personal details are collected
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Ramar"
                className="input"
              />
            </Field>
            <Field label="Age">
              <input
                type="number"
                min={12}
                max={90}
                value={form.age}
                onChange={(e) => set("age", Number(e.target.value))}
                className="input"
              />
            </Field>
            <Field label="Weight (kg)">
              <input
                type="number"
                min={30}
                max={200}
                value={form.weight}
                onChange={(e) => set("weight", Number(e.target.value))}
                className="input"
              />
            </Field>
            <Field label="Fitness level">
              <select
                value={form.level}
                onChange={(e) => set("level", e.target.value as Level)}
                className="input"
              >
                {(Object.keys(LEVEL_LABELS) as Level[]).map((l) => (
                  <option key={l} value={l}>
                    {LEVEL_LABELS[l]}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Available daily time · {form.dailyMinutes} min
            </p>
            <input
              type="range"
              min={15}
              max={60}
              step={5}
              value={form.dailyMinutes}
              onChange={(e) => set("dailyMinutes", Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
              <span>15 min</span>
              <span>60 min</span>
            </div>
          </div>
        </Card>

        <div className="grid gap-5">
          <Card>
            <h2 className="text-lg font-bold">Fitness goal</h2>
            <p className="mt-1 text-xs text-muted-foreground">Step 02 · Select your objective</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
                <Choice
                  key={g}
                  active={form.goal === g}
                  onClick={() => set("goal", g)}
                  label={GOAL_LABELS[g]}
                />
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold">Preferred workout type</h2>
            <div className="mt-4 grid gap-2">
              {(Object.keys(PREFERRED_LABELS) as PreferredType[]).map((p) => (
                <Choice
                  key={p}
                  active={form.preferred === p}
                  onClick={() => set("preferred", p)}
                  label={PREFERRED_LABELS[p]}
                />
              ))}
            </div>
          </Card>

          <button
            type="submit"
            className="glow-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display text-base font-bold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <Brain className="size-5" /> Generate my AI schedule
          </button>
        </div>
      </form>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          padding: 0.6rem 0.8rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
          outline: none;
        }
        .input:focus { border-color: var(--color-primary); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function Choice({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-all ${
        active
          ? "border-primary bg-primary/12 text-foreground"
          : "border-border bg-surface text-muted-foreground hover:border-primary/50"
      }`}
    >
      {label}
    </button>
  );
}

/* ---------------- Plan + logger ---------------- */

function PlanView() {
  const {
    state,
    plan,
    scheduledDays,
    completedCount,
    skippedCount,
    adaptation,
    toggleLog,
    applyAdaptation,
    reset,
  } = usePlanner();
  const profile = state.profile!;
  const [open, setOpen] = useState<string | null>(plan[0]?.day ?? null);

  return (
    <div className="animate-rise">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle
          eyebrow={`Week ${state.week} · ${TIER_NAMES[state.tier - 1]} tier`}
          title={`${profile.name ? profile.name + "'s" : "Your"} AI weekly schedule`}
          description={`${GOAL_LABELS[profile.goal]} · ${LEVEL_LABELS[profile.level]} · ${profile.dailyMinutes} min/day · ${PREFERRED_LABELS[profile.preferred]}`}
        />
        <div className="mb-6 flex gap-2">
          <Link
            to="/dashboard"
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold hover:border-primary/50"
          >
            View progress
          </Link>
          <button
            onClick={reset}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-destructive"
          >
            New profile
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {plan.map((day, i) => {
          const status = state.log[day.day];
          const isOpen = open === day.day;
          return (
            <Card
              key={day.day}
              className={`animate-rise ${
                status === "done"
                  ? "border-primary/60"
                  : status === "skipped"
                    ? "border-destructive/50 opacity-80"
                    : ""
              }`}
            >
              <div style={{ animationDelay: `${i * 40}ms` }}>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setOpen(isOpen ? null : day.day)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <ChevronRight
                      className={`size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`}
                    />
                    <div className="min-w-[92px]">
                      <p className="font-display text-sm font-bold">{day.day}</p>
                      <p className="text-xs text-muted-foreground">{day.intensity} intensity</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={day.focus === "Rest" ? "muted" : "primary"}>{day.focus}</Badge>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3.5" />
                        {day.minutes ? `${day.minutes} min` : "Recovery"}
                      </span>
                    </div>
                  </button>

                  {day.focus !== "Rest" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleLog(day.day, "done")}
                        aria-label={`Mark ${day.day} complete`}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                          status === "done"
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-primary"
                        }`}
                      >
                        <Check className="size-3.5" /> Done
                      </button>
                      <button
                        onClick={() => toggleLog(day.day, "skipped")}
                        aria-label={`Mark ${day.day} skipped`}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                          status === "skipped"
                            ? "border-destructive bg-destructive text-destructive-foreground"
                            : "border-border text-muted-foreground hover:border-destructive"
                        }`}
                      >
                        <X className="size-3.5" /> Skip
                      </button>
                    </div>
                  )}
                </div>

                {isOpen && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-border">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-secondary/60 text-[11px] tracking-wide text-muted-foreground uppercase">
                        <tr>
                          <th className="px-3 py-2">Exercise</th>
                          <th className="px-3 py-2">Sets</th>
                          <th className="px-3 py-2">Reps / Time</th>
                          <th className="px-3 py-2">Target</th>
                        </tr>
                      </thead>
                      <tbody>
                        {day.exercises.map((ex) => (
                          <tr key={ex.name} className="border-t border-border">
                            <td className="px-3 py-2 font-semibold">{ex.name}</td>
                            <td className="px-3 py-2 text-muted-foreground">{ex.sets}</td>
                            <td className="px-3 py-2 text-muted-foreground">{ex.reps}</td>
                            <td className="px-3 py-2 text-muted-foreground">{ex.target}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="border-t border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
                      {day.note}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="glow-ring mt-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Brain className="size-5" />
          </span>
          <div className="min-w-[240px] flex-1">
            <p className="font-display text-sm font-bold">AI adaptation preview</p>
            <p className="text-sm text-muted-foreground">{adaptation.message}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {completedCount} completed · {skippedCount} skipped · {scheduledDays.length} scheduled
              sessions
            </p>
          </div>
          <button
            onClick={applyAdaptation}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
          >
            <RefreshCw className="size-4" /> Generate week {state.week + 1}
          </button>
        </div>
      </Card>

      <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Dumbbell className="size-3.5" /> Tip: log every session — the engine scales sets, minutes
        and difficulty tier from your adherence.
      </p>
    </div>
  );
}

function Badge({ children, tone = "primary" }: { children: React.ReactNode; tone?: "primary" | "muted" }) {
  return (
    <span
      className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
        tone === "primary" ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}
