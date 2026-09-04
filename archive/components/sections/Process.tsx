"use client";

import { useEffect, useRef, useState } from "react";
import RevealSection from "@/components/ui/RevealSection";

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  days?: string;
}

export interface ProcessProps {
  label?: string;
  headline?: React.ReactNode;
  intro?: React.ReactNode;
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    num: "1",
    days: "Days 1 to 7",
    title: "Audit",
    desc: "Full technical and content audit of your site, GBP, reviews, and competitor landscape. Delivered in week one.",
  },
  {
    num: "2",
    days: "Days 8 to 30",
    title: "Foundation",
    desc: "We fix indexation, schema, citations, and GBP optimization in the first thirty days. This is where most sites double their visibility.",
  },
  {
    num: "3",
    days: "Days 31 to 60",
    title: "Scale",
    desc: "Location pages, content, link earning, and review automation roll out across months two and three. Rankings compound.",
  },
  {
    num: "4",
    days: "Days 61 to 90",
    title: "Measure",
    desc: "Monthly reports track rankings to move-ins. We adjust the plan based on what each report reveals.",
  },
];

export default function Process({
  label = "How it works",
  headline = (
    <>
      Four phases. Ninety days to <em>visible lift</em>.
    </>
  ),
  intro = (
    <>
      No six-month setup before you see results. We prioritize <strong>quick wins</strong> in the first month
      while building long-term equity in parallel.
    </>
  ),
  steps = defaultSteps,
}: ProcessProps) {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          setActiveIdx(steps.length - 1);
          return;
        }
        steps.forEach((_, i) => {
          timers.push(setTimeout(() => setActiveIdx(i), 300 + i * 450));
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, [steps]);

  const fillW = activeIdx < 0 ? "0%" : `${(activeIdx / (steps.length - 1)) * 100}%`;

  return (
    <RevealSection className="process" id="process">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{headline}</h2>
        <p className="section-intro">{intro}</p>

        <div className="process-steps" ref={stepsRef}>
          <div className="process-line" aria-hidden="true" />
          <div className="process-line-fill" style={{ width: fillW }} aria-hidden="true" />
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`process-step${i <= activeIdx ? " in active" : ""}`}
            >
              <div className="step-badge">{step.num}</div>
              {step.days && <div className="step-days">{step.days}</div>}
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
