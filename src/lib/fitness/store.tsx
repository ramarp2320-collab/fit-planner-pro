import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  adapt,
  baseTier,
  generatePlan,
  weeklyMinutes,
  type AdaptResult,
  type DayPlan,
  type Profile,
} from "./engine";

export type LogState = "done" | "skipped";

interface WeekRecord {
  week: number;
  completed: number;
  scheduled: number;
  minutes: number;
}

interface PlannerState {
  profile: Profile | null;
  tier: number;
  week: number;
  log: Record<string, LogState>;
  history: WeekRecord[];
}

const EMPTY: PlannerState = { profile: null, tier: 2, week: 1, log: {}, history: [] };
const KEY = "afsp-state-v1";
const THEME_KEY = "afsp-theme";

interface Ctx {
  ready: boolean;
  state: PlannerState;
  plan: DayPlan[];
  scheduledDays: DayPlan[];
  completedCount: number;
  skippedCount: number;
  minutesDone: number;
  targetMinutes: number;
  adherence: number;
  streak: number;
  adaptation: AdaptResult;
  theme: "dark" | "light";
  toggleTheme: () => void;
  setProfile: (p: Profile) => void;
  toggleLog: (day: string, value: LogState) => void;
  applyAdaptation: () => void;
  reset: () => void;
}

const PlannerContext = createContext<Ctx | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlannerState>(EMPTY);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...(JSON.parse(raw) as PlannerState) });
      const t = localStorage.getItem(THEME_KEY);
      if (t === "light" || t === "dark") setTheme(t);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (ready) localStorage.setItem(THEME_KEY, theme);
  }, [theme, ready]);

  const plan = useMemo(
    () => (state.profile ? generatePlan(state.profile, state.tier) : []),
    [state.profile, state.tier],
  );

  const scheduledDays = useMemo(() => plan.filter((d) => d.focus !== "Rest"), [plan]);
  const completedCount = scheduledDays.filter((d) => state.log[d.day] === "done").length;
  const skippedCount = scheduledDays.filter((d) => state.log[d.day] === "skipped").length;
  const minutesDone = scheduledDays
    .filter((d) => state.log[d.day] === "done")
    .reduce((s, d) => s + d.minutes, 0);
  const targetMinutes = weeklyMinutes(plan) || 230;
  const adherence = scheduledDays.length
    ? Math.round((completedCount / scheduledDays.length) * 100)
    : 0;

  const streak = useMemo(() => {
    let s = 0;
    for (const d of plan) {
      if (state.log[d.day] === "done" || d.focus === "Rest") s += state.log[d.day] === "done" ? 1 : 0;
      else if (state.log[d.day] === "skipped") s = 0;
    }
    // longest trailing run of completed sessions
    let run = 0;
    let best = 0;
    for (const d of scheduledDays) {
      if (state.log[d.day] === "done") {
        run += 1;
        best = Math.max(best, run);
      } else if (state.log[d.day] === "skipped") run = 0;
    }
    return best;
  }, [plan, scheduledDays, state.log]);

  const adaptation = useMemo(
    () => adapt(state.tier, completedCount, scheduledDays.length),
    [state.tier, completedCount, scheduledDays.length],
  );

  const setProfile = useCallback((p: Profile) => {
    setState({ profile: p, tier: baseTier(p.level), week: 1, log: {}, history: [] });
  }, []);

  const toggleLog = useCallback((day: string, value: LogState) => {
    setState((s) => {
      const log = { ...s.log };
      if (log[day] === value) delete log[day];
      else log[day] = value;
      return { ...s, log };
    });
  }, []);

  const applyAdaptation = useCallback(() => {
    setState((s) => {
      const days = s.profile ? generatePlan(s.profile, s.tier).filter((d) => d.focus !== "Rest") : [];
      const done = days.filter((d) => s.log[d.day] === "done");
      const result = adapt(s.tier, done.length, days.length);
      return {
        ...s,
        tier: result.nextTier,
        week: s.week + 1,
        log: {},
        history: [
          ...s.history,
          {
            week: s.week,
            completed: done.length,
            scheduled: days.length,
            minutes: done.reduce((t, d) => t + d.minutes, 0),
          },
        ],
      };
    });
  }, []);

  const reset = useCallback(() => setState(EMPTY), []);

  const value: Ctx = {
    ready,
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
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    setProfile,
    toggleLog,
    applyAdaptation,
    reset,
  };

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner must be used inside PlannerProvider");
  return ctx;
}
