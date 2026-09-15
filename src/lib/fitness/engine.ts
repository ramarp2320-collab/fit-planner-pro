export type Goal = "weight-loss" | "muscle-gain" | "endurance" | "wellness";
export type Level = "beginner" | "intermediate" | "advanced";
export type Focus =
  | "Strength"
  | "Cardio"
  | "Yoga & Mobility"
  | "Cardio & Core"
  | "Full Body"
  | "HIIT"
  | "Rest";

export type PreferredType = "strength" | "cardio" | "yoga" | "hiit" | "mixed";

export interface Profile {
  name: string;
  age: number;
  weight: number;
  goal: Goal;
  dailyMinutes: number;
  level: Level;
  preferred: PreferredType;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  target: string;
}

export interface DayPlan {
  day: string;
  focus: Focus;
  minutes: number;
  intensity: "Light" | "Moderate" | "High";
  exercises: Exercise[];
  note: string;
}

export const GOAL_LABELS: Record<Goal, string> = {
  "weight-loss": "Weight Loss",
  "muscle-gain": "Muscle Gain",
  endurance: "Endurance",
  wellness: "General Wellness",
};

export const LEVEL_LABELS: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const PREFERRED_LABELS: Record<PreferredType, string> = {
  strength: "Strength Training",
  cardio: "Cardio",
  yoga: "Yoga & Mobility",
  hiit: "HIIT",
  mixed: "Mixed / No Preference",
};

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** Difficulty tier 1-5 — the AI engine scales this from adherence. */
export const TIER_NAMES = ["Foundation", "Builder", "Momentum", "Performance", "Elite"];

export function baseTier(level: Level) {
  return level === "beginner" ? 1 : level === "intermediate" ? 3 : 4;
}

interface Library {
  [key: string]: Exercise[];
}

const LIB: Library = {
  Strength: [
    { name: "Goblet Squat", sets: 4, reps: "10-12", target: "Quads, Glutes" },
    { name: "Push-Up", sets: 4, reps: "8-15", target: "Chest, Triceps" },
    { name: "Dumbbell Row", sets: 4, reps: "10-12", target: "Back, Biceps" },
    { name: "Romanian Deadlift", sets: 3, reps: "10", target: "Hamstrings, Glutes" },
    { name: "Overhead Press", sets: 3, reps: "8-10", target: "Shoulders" },
    { name: "Plank Hold", sets: 3, reps: "40-60s", target: "Core" },
  ],
  Cardio: [
    { name: "Brisk Walk / Jog Intervals", sets: 1, reps: "12 min", target: "Aerobic base" },
    { name: "Cycling Tempo", sets: 1, reps: "10 min", target: "Legs, Heart" },
    { name: "Jump Rope", sets: 4, reps: "60s", target: "Calves, Conditioning" },
    { name: "Stair Climb", sets: 3, reps: "90s", target: "Glutes, Lungs" },
    { name: "Cool-down Walk", sets: 1, reps: "5 min", target: "Recovery" },
  ],
  "Yoga & Mobility": [
    { name: "Sun Salutation Flow", sets: 3, reps: "5 rounds", target: "Full Body" },
    { name: "Downward Dog to Cobra", sets: 3, reps: "8", target: "Spine, Shoulders" },
    { name: "Hip Flexor Stretch", sets: 2, reps: "45s / side", target: "Hips" },
    { name: "Seated Forward Fold", sets: 2, reps: "60s", target: "Hamstrings" },
    { name: "Box Breathing", sets: 1, reps: "3 min", target: "Recovery, Focus" },
  ],
  "Cardio & Core": [
    { name: "Mountain Climbers", sets: 4, reps: "30s", target: "Core, Cardio" },
    { name: "Bicycle Crunch", sets: 3, reps: "20", target: "Obliques" },
    { name: "Row / Run Intervals", sets: 5, reps: "45s on / 30s off", target: "Conditioning" },
    { name: "Hollow Body Hold", sets: 3, reps: "30s", target: "Deep Core" },
    { name: "Russian Twist", sets: 3, reps: "24", target: "Obliques" },
  ],
  "Full Body": [
    { name: "Kettlebell Swing", sets: 4, reps: "15", target: "Posterior Chain" },
    { name: "Walking Lunge", sets: 3, reps: "12 / leg", target: "Legs, Glutes" },
    { name: "Renegade Row", sets: 3, reps: "10 / side", target: "Back, Core" },
    { name: "Burpee", sets: 3, reps: "10", target: "Full Body" },
    { name: "Dead Bug", sets: 3, reps: "12", target: "Core Stability" },
  ],
  HIIT: [
    { name: "Squat Jumps", sets: 4, reps: "20s max effort", target: "Legs, Power" },
    { name: "High Knees", sets: 4, reps: "20s", target: "Cardio" },
    { name: "Push-Up to Shoulder Tap", sets: 4, reps: "20s", target: "Chest, Core" },
    { name: "Skater Hops", sets: 4, reps: "20s", target: "Glutes, Agility" },
    { name: "Active Rest Walk", sets: 4, reps: "40s", target: "Recovery" },
  ],
};

const GOAL_SPLIT: Record<Goal, Focus[]> = {
  "weight-loss": [
    "Cardio",
    "Strength",
    "Cardio & Core",
    "HIIT",
    "Cardio",
    "Full Body",
    "Rest",
  ],
  "muscle-gain": [
    "Strength",
    "Cardio",
    "Strength",
    "Yoga & Mobility",
    "Strength",
    "Full Body",
    "Rest",
  ],
  endurance: [
    "Cardio",
    "Cardio & Core",
    "Yoga & Mobility",
    "Cardio",
    "HIIT",
    "Full Body",
    "Rest",
  ],
  wellness: [
    "Strength",
    "Cardio",
    "Yoga & Mobility",
    "Strength",
    "Cardio & Core",
    "Full Body",
    "Rest",
  ],
};

const PREF_BIAS: Record<PreferredType, Focus | null> = {
  strength: "Strength",
  cardio: "Cardio",
  yoga: "Yoga & Mobility",
  hiit: "HIIT",
  mixed: null,
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function intensityFor(tier: number): DayPlan["intensity"] {
  if (tier <= 1) return "Light";
  if (tier <= 3) return "Moderate";
  return "High";
}

function scaleExercise(ex: Exercise, tier: number): Exercise {
  const delta = tier - 3;
  return { ...ex, sets: clamp(ex.sets + (delta >= 2 ? 1 : delta <= -2 ? -1 : 0), 1, 6) };
}

export function generatePlan(profile: Profile, tier: number): DayPlan[] {
  const split = [...GOAL_SPLIT[profile.goal]];
  const bias = PREF_BIAS[profile.preferred];
  if (bias) {
    // Bias one mid-week slot toward the preferred workout type.
    split[3] = bias;
    if (split[1] !== bias && profile.preferred !== "mixed") split[4] = split[4];
  }

  const base = profile.dailyMinutes;

  return DAYS.map((day, i) => {
    const focus = split[i];
    if (focus === "Rest") {
      return {
        day,
        focus,
        minutes: 0,
        intensity: "Light",
        exercises: [
          { name: "Light Walk", sets: 1, reps: "15-20 min", target: "Active Recovery" },
          { name: "Full Body Stretch", sets: 1, reps: "10 min", target: "Mobility" },
        ],
        note: "Recovery day — sleep, hydrate, and let the adaptations land.",
      };
    }

    const weight =
      focus === "Strength" || focus === "Full Body" ? 1 : focus === "Yoga & Mobility" ? 0.75 : 0.85;
    const minutes = clamp(
      Math.round(((base * weight + (tier - 3) * 3) / 5)) * 5,
      15,
      75,
    );

    const pool = LIB[focus] ?? LIB["Full Body"];
    const count = clamp(Math.round(minutes / 10), 3, pool.length);

    return {
      day,
      focus,
      minutes,
      intensity: intensityFor(tier),
      exercises: pool.slice(0, count).map((ex) => scaleExercise(ex, tier)),
      note: `${TIER_NAMES[tier - 1]} tier · ${GOAL_LABELS[profile.goal]} emphasis`,
    };
  });
}

export function weeklyMinutes(plan: DayPlan[]) {
  return plan.reduce((s, d) => s + d.minutes, 0);
}

export interface AdaptResult {
  nextTier: number;
  message: string;
  direction: "up" | "down" | "hold";
}

/** Step 08 of the pipeline: AI adjusts future recommendations from logged data. */
export function adapt(
  tier: number,
  completed: number,
  scheduled: number,
): AdaptResult {
  if (scheduled === 0)
    return { nextTier: tier, message: "Log a few sessions so the engine can learn.", direction: "hold" };
  const rate = completed / scheduled;
  if (rate >= 0.8 && tier < 5)
    return {
      nextTier: tier + 1,
      message: `${Math.round(rate * 100)}% adherence — intensity scaled up to ${TIER_NAMES[tier]}.`,
      direction: "up",
    };
  if (rate < 0.5 && tier > 1)
    return {
      nextTier: tier - 1,
      message: `${Math.round(rate * 100)}% adherence — schedule eased to ${TIER_NAMES[tier - 2]} to rebuild momentum.`,
      direction: "down",
    };
  return {
    nextTier: tier,
    message: `${Math.round(rate * 100)}% adherence — holding at ${TIER_NAMES[tier - 1]}.`,
    direction: "hold",
  };
}
