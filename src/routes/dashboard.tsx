import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Gauge, Target, TrendingUp } from "lucide-react";
import { AppShell, Card, SectionTitle } from "@/components/AppShell";
import { usePlanner } from "@/lib/fitness/store";
import { TIER_NAMES, GOAL_LABELS } from "@/lib/fitness/engine";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Progress Dashboard — AI Fitness Schedule Planner" },
      {
        name: "description",
        content:
          "Track weekly active minutes, streaks, adherence rate and the AI difficulty tier driving your next workout week.",
      },
      { property: "og:title", content: "Progress Dashboard — AI Fitness Schedule Planner" },
      {
        property: "og:description",
        content: "Weekly minutes, streaks, adherence and AI difficulty tier at a glance.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const {
    state,
    plan,
    scheduledDays,
    completedCount,
    skippedCount,
    minutesDone,
    targetMinutes,
    adherence,
    streak,
    adaptation,
  } = usePlanner();

  if (!state.profile) {
    return (
      <AppShell>
        <Card className="text-center">
          <h1 className="text-xl font-bold">No plan yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your profile to start tracking progress.
          </p>
          <Link
            to="/"
            className="mt-5 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Build my schedule
          </Link>
        </Card>
      </AppShell>
    );
  }

  const pct = Math.min(100, Math.round((minutesDone / targetMinutes) * 100));

  return (
    <AppShell>
      <SectionTitle
        eyebrow={`Week ${state.week}`}
        title="Progress analytics"
        description={`${GOAL_LABELS[state.profile.goal]} programme · tracked by the progress module that feeds the AI engine.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={<Target className="size-4" />}
          label="Weekly minutes"
          value={`${minutesDone}`}
          sub={`of ${targetMinutes} min target`}
        />
        <Stat
          icon={<Flame className="size-4" />}
          label="Best streak"
          value={`${streak}`}
          sub="consecutive sessions"
        />
        <Stat
          icon={<TrendingUp className="size-4" />}
          label="Adherence"
          value={`${adherence}%`}
          sub={`${completedCount}/${scheduledDays.length} completed`}
        />
        <Stat
          icon={<Gauge className="size-4" />}
          label="AI difficulty tier"
          value={TIER_NAMES[state.tier - 1] ?? "—"}
          sub={`Tier ${state.tier} of 5`}
        />
      </div>

      <Card className="mt-5">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>Active minutes this week</span>
          <span className="text-primary">{pct}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {minutesDone} min logged · {targetMinutes - minutesDone > 0
            ? `${targetMinutes - minutesDone} min to go`
            : "target reached"}
        </p>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="text-sm font-bold">Daily breakdown</h3>
          <div className="mt-4 flex h-40 items-end gap-2">
            {plan.map((d) => {
              const done = state.log[d.day] === "done";
              const skipped = state.log[d.day] === "skipped";
              const h = d.minutes ? Math.max(8, (d.minutes / 75) * 100) : 6;
              return (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      done ? "bg-primary" : skipped ? "bg-destructive/60" : "bg-secondary"
                    }`}
                    style={{ height: `${h}%` }}
                    title={`${d.day}: ${d.minutes} min`}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.day.slice(0, 3)}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Green = completed · red = skipped · grey = pending
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-bold">AI engine feedback</h3>
          <p className="mt-2 text-sm text-muted-foreground">{adaptation.message}</p>
          <div className="mt-4 grid gap-2">
            <Row label="Sessions completed" value={`${completedCount}`} />
            <Row label="Sessions skipped" value={`${skippedCount}`} />
            <Row
              label="Next week direction"
              value={
                adaptation.direction === "up"
                  ? "Intensity ↑"
                  : adaptation.direction === "down"
                    ? "Intensity ↓"
                    : "Hold steady"
              }
            />
          </div>

          {state.history.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                Week history
              </h4>
              <div className="mt-2 grid gap-1.5">
                {state.history.map((h) => (
                  <Row
                    key={h.week}
                    label={`Week ${h.week}`}
                    value={`${h.completed}/${h.scheduled} · ${h.minutes} min`}
                  />
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <Card className="animate-rise">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p className="mt-3 font-display text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
