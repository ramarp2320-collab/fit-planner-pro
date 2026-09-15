export type DietPlanId = "weight-loss" | "weight-gain" | "high-protein" | "maintenance";

export type Cuisine = "Indian" | "Western" | "Mixed";

export interface Meal {
  slot: string;
  time: string;
  indian: string;
  western: string;
  kcal: number;
  protein: number;
}

export interface DietDay {
  day: string;
  meals: Meal[];
}

export interface DietPlan {
  id: DietPlanId;
  title: string;
  tagline: string;
  calories: string;
  proteinTarget: string;
  split: string;
  rules: string[];
  days: DietDay[];
}

export const DIET_PLAN_LABELS: Record<DietPlanId, string> = {
  "weight-loss": "Weight Loss (calorie deficit)",
  "weight-gain": "Weight Gain / Muscle Build",
  "high-protein": "High-Protein Focus",
  maintenance: "Maintenance / Everyday Wellness",
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function week(rows: Meal[][]): DietDay[] {
  return DAYS.map((day, i) => ({ day, meals: rows[i] ?? rows[0] ?? [] }));
}

/* ---------------------------- Weight loss ---------------------------- */

const WL: Meal[][] = [
  [
    { slot: "Early morning", time: "6:30 AM", indian: "Warm lemon water + 5 soaked almonds", western: "Warm lemon water + 5 almonds", kcal: 70, protein: 3 },
    { slot: "Breakfast", time: "8:00 AM", indian: "2 idli + sambar + coconut chutney (1 tsp)", western: "Oats porridge with skim milk + berries", kcal: 320, protein: 14 },
    { slot: "Mid-morning", time: "11:00 AM", indian: "1 guava or apple", western: "Greek yogurt 100 g", kcal: 90, protein: 6 },
    { slot: "Lunch", time: "1:00 PM", indian: "2 phulka + dal + sabzi + cucumber salad", western: "Grilled chicken salad + olive oil dressing", kcal: 430, protein: 30 },
    { slot: "Evening", time: "5:00 PM", indian: "Green tea + roasted chana 25 g", western: "Green tea + handful walnuts", kcal: 130, protein: 7 },
    { slot: "Dinner", time: "8:00 PM", indian: "Vegetable soup + 1 phulka + paneer bhurji (60 g)", western: "Baked fish + steamed broccoli", kcal: 380, protein: 28 },
  ],
  [
    { slot: "Early morning", time: "6:30 AM", indian: "Jeera water + 2 walnuts", western: "Black coffee + 2 walnuts", kcal: 80, protein: 2 },
    { slot: "Breakfast", time: "8:00 AM", indian: "Moong dal chilla (2) + mint chutney", western: "2 egg-white omelette + 1 toast", kcal: 300, protein: 18 },
    { slot: "Mid-morning", time: "11:00 AM", indian: "Buttermilk 1 glass", western: "Skimmed milk 200 ml", kcal: 80, protein: 6 },
    { slot: "Lunch", time: "1:00 PM", indian: "Brown rice 1 cup + rasam + beans poriyal", western: "Quinoa bowl + chickpeas + greens", kcal: 440, protein: 20 },
    { slot: "Evening", time: "5:00 PM", indian: "Sprouts salad 1 bowl", western: "Carrot sticks + hummus", kcal: 140, protein: 9 },
    { slot: "Dinner", time: "8:00 PM", indian: "2 phulka + grilled chicken / soya chunks curry", western: "Grilled chicken breast + salad", kcal: 400, protein: 34 },
  ],
  [
    { slot: "Early morning", time: "6:30 AM", indian: "Warm water + methi seeds", western: "Warm water + lemon", kcal: 20, protein: 0 },
    { slot: "Breakfast", time: "8:00 AM", indian: "Vegetable upma (small bowl) + curd", western: "Overnight oats + chia + apple", kcal: 330, protein: 13 },
    { slot: "Mid-morning", time: "11:00 AM", indian: "Papaya bowl", western: "Orange + green tea", kcal: 85, protein: 1 },
    { slot: "Lunch", time: "1:00 PM", indian: "2 phulka + fish curry / chana masala + salad", western: "Tuna salad wrap (whole wheat)", kcal: 450, protein: 32 },
    { slot: "Evening", time: "5:00 PM", indian: "Roasted makhana 20 g", western: "Air-popped popcorn 20 g", kcal: 110, protein: 3 },
    { slot: "Dinner", time: "8:00 PM", indian: "Clear veg soup + paneer tikka (80 g)", western: "Tofu stir-fry + zucchini noodles", kcal: 370, protein: 26 },
  ],
];

/* ---------------------------- Weight gain ---------------------------- */

const WG: Meal[][] = [
  [
    { slot: "Early morning", time: "6:30 AM", indian: "Banana shake with full-fat milk + 6 almonds", western: "Peanut butter banana smoothie", kcal: 420, protein: 16 },
    { slot: "Breakfast", time: "8:30 AM", indian: "3 idli + sambar + 2 boiled eggs", western: "3 eggs scrambled + 2 toast + avocado", kcal: 620, protein: 32 },
    { slot: "Mid-morning", time: "11:00 AM", indian: "Peanut chikki + curd 150 g", western: "Trail mix + Greek yogurt", kcal: 380, protein: 14 },
    { slot: "Lunch", time: "1:30 PM", indian: "Rice 1.5 cup + dal + chicken curry + ghee 1 tsp", western: "Rice bowl + grilled chicken + beans", kcal: 780, protein: 45 },
    { slot: "Pre-workout", time: "5:00 PM", indian: "Poha / 2 bananas + dates", western: "Bagel + honey", kcal: 320, protein: 8 },
    { slot: "Post-workout", time: "7:00 PM", indian: "Milk + whey / sattu drink", western: "Whey shake with milk", kcal: 300, protein: 30 },
    { slot: "Dinner", time: "9:00 PM", indian: "3 chapati + paneer butter masala + salad", western: "Pasta + chicken + olive oil", kcal: 700, protein: 38 },
  ],
  [
    { slot: "Early morning", time: "6:30 AM", indian: "Soaked dates + almond milk", western: "Oats smoothie with peanut butter", kcal: 400, protein: 14 },
    { slot: "Breakfast", time: "8:30 AM", indian: "Aloo paratha (2) with curd + 1 egg", western: "Pancakes + eggs + milk", kcal: 650, protein: 28 },
    { slot: "Mid-morning", time: "11:00 AM", indian: "Sprouts chaat + buttermilk", western: "Cottage cheese + honey", kcal: 350, protein: 20 },
    { slot: "Lunch", time: "1:30 PM", indian: "Rice + rajma + curd + ghee", western: "Burrito bowl with rice, beans, chicken", kcal: 800, protein: 40 },
    { slot: "Pre-workout", time: "5:00 PM", indian: "Banana + peanut butter toast", western: "Energy bar + banana", kcal: 330, protein: 10 },
    { slot: "Post-workout", time: "7:00 PM", indian: "Whey / paneer 100 g", western: "Whey shake", kcal: 280, protein: 28 },
    { slot: "Dinner", time: "9:00 PM", indian: "3 chapati + egg curry (2 eggs) + sabzi", western: "Steak / salmon + mashed potato", kcal: 720, protein: 42 },
  ],
];

/* ---------------------------- Maintenance ---------------------------- */

const MT: Meal[][] = [
  [
    { slot: "Morning", time: "7:00 AM", indian: "Warm water + 5 almonds", western: "Green tea + almonds", kcal: 80, protein: 3 },
    { slot: "Breakfast", time: "8:30 AM", indian: "Dosa (2) + chutney + 1 boiled egg", western: "Oats + milk + berries + 1 egg", kcal: 420, protein: 20 },
    { slot: "Mid-morning", time: "11:30 AM", indian: "Seasonal fruit bowl", western: "Apple + yogurt", kcal: 140, protein: 6 },
    { slot: "Lunch", time: "1:30 PM", indian: "Rice + dal + sabzi + curd + salad", western: "Grain bowl + grilled protein + greens", kcal: 560, protein: 28 },
    { slot: "Evening", time: "5:00 PM", indian: "Tea + roasted peanuts 25 g", western: "Coffee + nuts", kcal: 180, protein: 7 },
    { slot: "Dinner", time: "8:00 PM", indian: "2 chapati + veg kurma + salad", western: "Soup + grilled chicken + veggies", kcal: 480, protein: 26 },
  ],
];

/* ---------------------------- High protein ---------------------------- */

const HP: Meal[][] = [
  [
    { slot: "Morning", time: "6:30 AM", indian: "Sattu drink (30 g)", western: "Whey + water", kcal: 160, protein: 22 },
    { slot: "Breakfast", time: "8:30 AM", indian: "Moong dal chilla (3) + curd 150 g", western: "4 egg whites + 1 whole egg + toast", kcal: 450, protein: 35 },
    { slot: "Mid-morning", time: "11:00 AM", indian: "Sprouts salad 1 bowl", western: "Greek yogurt 200 g", kcal: 220, protein: 18 },
    { slot: "Lunch", time: "1:30 PM", indian: "2 chapati + chicken / rajma curry + curd", western: "Grilled chicken 180 g + quinoa + greens", kcal: 620, protein: 48 },
    { slot: "Evening", time: "5:00 PM", indian: "Paneer tikka 100 g", western: "Cottage cheese 150 g", kcal: 260, protein: 24 },
    { slot: "Dinner", time: "8:30 PM", indian: "Fish curry / soya chunks + 1 chapati + salad", western: "Salmon 150 g + broccoli", kcal: 520, protein: 42 },
  ],
];

export const DIET_PLANS: DietPlan[] = [
  {
    id: "weight-loss",
    title: "Weight Loss Schedule",
    tagline: "Calorie deficit with high satiety — steady 0.5 kg/week loss.",
    calories: "1,400 – 1,600 kcal / day",
    proteinTarget: "1.6 g per kg body weight",
    split: "40% carbs · 30% protein · 30% fat",
    rules: [
      "Eat every 3 hours to avoid binge hunger.",
      "3 litres water daily; no sugary drinks.",
      "Stop eating 2 hours before sleep.",
      "One flexible meal per week keeps you consistent.",
    ],
    days: week(WL),
  },
  {
    id: "weight-gain",
    title: "Weight Gain / Muscle Build Schedule",
    tagline: "Calorie surplus with clean carbs and heavy protein for lean mass.",
    calories: "2,900 – 3,300 kcal / day",
    proteinTarget: "2.0 g per kg body weight",
    split: "50% carbs · 25% protein · 25% fat",
    rules: [
      "Never skip breakfast or the post-workout meal.",
      "Add ghee / olive oil to bump calories without bulk.",
      "Liquid calories (shakes) when appetite is low.",
      "Train heavy 4–5 days; surplus without training becomes fat.",
    ],
    days: week(WG),
  },
  {
    id: "high-protein",
    title: "High-Protein Schedule",
    tagline: "Protein-first eating for recovery, strength and body recomposition.",
    calories: "2,000 – 2,300 kcal / day",
    proteinTarget: "2.2 g per kg body weight",
    split: "35% carbs · 35% protein · 30% fat",
    rules: [
      "Aim for 25–40 g protein in every meal.",
      "Pair plant proteins (dal + rice) to complete amino acids.",
      "Protein within 45 minutes after training.",
      "Keep fibre high so digestion stays comfortable.",
    ],
    days: week(HP),
  },
  {
    id: "maintenance",
    title: "Maintenance / Everyday Wellness Schedule",
    tagline: "Balanced everyday eating that holds your weight and energy steady.",
    calories: "2,000 – 2,200 kcal / day",
    proteinTarget: "1.2 g per kg body weight",
    split: "45% carbs · 25% protein · 30% fat",
    rules: [
      "Half the plate vegetables at lunch and dinner.",
      "Whole grains over refined flour.",
      "Two fruit servings a day.",
      "7–8 hours sleep matters as much as the food.",
    ],
    days: week(MT),
  },
];

export function getDietPlan(id: DietPlanId): DietPlan {
  return DIET_PLANS.find((p) => p.id === id) ?? (DIET_PLANS[0] as DietPlan);
}

export interface ProteinFood {
  name: string;
  serving: string;
  protein: number;
  kcal: number;
  type: "Veg" | "Non-veg" | "Supplement";
  cuisine: Cuisine;
}

export const PROTEIN_FOODS: ProteinFood[] = [
  { name: "Paneer", serving: "100 g", protein: 18, kcal: 265, type: "Veg", cuisine: "Indian" },
  { name: "Soya chunks (dry)", serving: "50 g", protein: 26, kcal: 172, type: "Veg", cuisine: "Indian" },
  { name: "Moong dal (cooked)", serving: "1 cup", protein: 14, kcal: 212, type: "Veg", cuisine: "Indian" },
  { name: "Rajma (cooked)", serving: "1 cup", protein: 15, kcal: 225, type: "Veg", cuisine: "Indian" },
  { name: "Chana / chickpeas", serving: "1 cup", protein: 15, kcal: 269, type: "Veg", cuisine: "Mixed" },
  { name: "Curd / yogurt", serving: "200 g", protein: 8, kcal: 120, type: "Veg", cuisine: "Mixed" },
  { name: "Greek yogurt", serving: "200 g", protein: 20, kcal: 130, type: "Veg", cuisine: "Western" },
  { name: "Cottage cheese", serving: "150 g", protein: 17, kcal: 145, type: "Veg", cuisine: "Western" },
  { name: "Peanuts", serving: "50 g", protein: 13, kcal: 290, type: "Veg", cuisine: "Mixed" },
  { name: "Almonds", serving: "30 g", protein: 6, kcal: 174, type: "Veg", cuisine: "Mixed" },
  { name: "Tofu", serving: "150 g", protein: 12, kcal: 110, type: "Veg", cuisine: "Western" },
  { name: "Sattu (roasted gram flour)", serving: "40 g", protein: 8, kcal: 160, type: "Veg", cuisine: "Indian" },
  { name: "Sprouted moong", serving: "1 bowl", protein: 10, kcal: 125, type: "Veg", cuisine: "Indian" },
  { name: "Quinoa (cooked)", serving: "1 cup", protein: 8, kcal: 222, type: "Veg", cuisine: "Western" },
  { name: "Egg (whole)", serving: "1 large", protein: 6, kcal: 78, type: "Non-veg", cuisine: "Mixed" },
  { name: "Egg whites", serving: "4", protein: 14, kcal: 68, type: "Non-veg", cuisine: "Mixed" },
  { name: "Chicken breast", serving: "150 g", protein: 46, kcal: 248, type: "Non-veg", cuisine: "Mixed" },
  { name: "Chicken curry (home style)", serving: "1 cup", protein: 27, kcal: 290, type: "Non-veg", cuisine: "Indian" },
  { name: "Fish (rohu / tilapia)", serving: "150 g", protein: 30, kcal: 195, type: "Non-veg", cuisine: "Indian" },
  { name: "Salmon", serving: "150 g", protein: 34, kcal: 310, type: "Non-veg", cuisine: "Western" },
  { name: "Prawns", serving: "150 g", protein: 30, kcal: 148, type: "Non-veg", cuisine: "Mixed" },
  { name: "Mutton (lean)", serving: "100 g", protein: 25, kcal: 258, type: "Non-veg", cuisine: "Indian" },
  { name: "Tuna (canned in water)", serving: "100 g", protein: 26, kcal: 116, type: "Non-veg", cuisine: "Western" },
  { name: "Whey protein", serving: "1 scoop", protein: 24, kcal: 120, type: "Supplement", cuisine: "Mixed" },
];

/** Simple daily calorie + protein targets from the member's numbers. */
export function nutritionTargets(weight: number, plan: DietPlanId) {
  const perKg = plan === "weight-gain" ? 2.0 : plan === "high-protein" ? 2.2 : plan === "weight-loss" ? 1.6 : 1.2;
  const kcalPerKg = plan === "weight-gain" ? 45 : plan === "weight-loss" ? 24 : 32;
  return {
    protein: Math.round(weight * perKg),
    calories: Math.round((weight * kcalPerKg) / 50) * 50,
    water: Math.max(2.5, Math.round((weight * 0.035) * 10) / 10),
  };
}
