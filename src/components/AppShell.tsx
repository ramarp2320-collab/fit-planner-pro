import { Link } from "@tanstack/react-router";
import { Activity, Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";
import { usePlanner } from "@/lib/fitness/store";

const NAV = [
  { to: "/", label: "Planner" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/project", label: "Project" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = usePlanner();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Activity className="size-5" strokeWidth={2.4} />
            </span>
            <span className="hidden font-display text-sm leading-tight font-bold sm:block">
              AI Fitness
              <span className="block text-[11px] font-medium text-muted-foreground">
                Schedule Planner
              </span>
            </span>
          </Link>

          <nav className="ml-auto flex items-center gap-1 rounded-full border border-border bg-surface p-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{
                  className: "bg-primary text-primary-foreground",
                }}
                inactiveProps={{
                  className: "text-muted-foreground hover:text-foreground",
                }}
                className="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle colour theme"
            className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">{children}</main>

      <footer className="border-t border-border/70 py-8 text-center text-xs text-muted-foreground">
        AI-Based Fitness Schedule Planner · Ramar P (25111090) · B.E CSE Cyber Security ·
        Rathinam Technical Campus 2026–2027
      </footer>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-5 shadow-sm transition-all ${className}`}
    >
      {children}
    </div>
  );
}
