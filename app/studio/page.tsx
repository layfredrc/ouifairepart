"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { MobilePreviewSheet } from "@/components/studio/MobilePreviewSheet";
import { StudioPreviewPanel } from "@/components/studio/StudioPreviewPanel";
import { StepNames } from "@/components/studio/steps/StepNames";
import { StepStyle } from "@/components/studio/steps/StepStyle";
import { StepSummary } from "@/components/studio/steps/StepSummary";
import { StepVenue } from "@/components/studio/steps/StepVenue";
import { useStudioStore } from "@/lib/store/useStudioStore";

const steps = [
  { label: "Prénoms & date", Component: StepNames },
  { label: "Lieu & programme", Component: StepVenue },
  { label: "Style", Component: StepStyle },
  { label: "Récapitulatif", Component: StepSummary },
];

export default function StudioPage() {
  const { step, setStep } = useStudioStore();
  const current = Math.min(step, steps.length - 1);
  const { Component } = steps[current];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <div className="container-page py-10 pb-28 lg:pb-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Studio</p>

              <div className="mt-4 flex items-center gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setStep(i)}
                    className="group flex flex-1 flex-col gap-1.5"
                  >
                    <span
                      className={`h-1 rounded-full transition ${
                        i <= current ? "bg-accent" : "bg-line"
                      }`}
                    />
                    <span
                      className={`hidden text-[0.6rem] uppercase tracking-widest sm:block ${
                        i === current ? "text-ink" : "text-ink-soft"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-10 max-w-xl">
                <Component />
              </div>

              <div className="mt-10 flex max-w-xl items-center justify-between border-t border-line pt-6">
                <button
                  onClick={() => setStep(Math.max(0, current - 1))}
                  disabled={current === 0}
                  className="text-sm text-ink-soft underline underline-offset-4 disabled:opacity-0"
                >
                  ← Précédent
                </button>
                {current < steps.length - 1 && (
                  <button
                    onClick={() => setStep(current + 1)}
                    className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper hover:bg-accent"
                  >
                    Continuer
                  </button>
                )}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24">
                <StudioPreviewPanel />
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobilePreviewSheet />
    </>
  );
}
