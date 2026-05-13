import RevealSection from "@/components/ui/RevealSection";

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
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
    title: "Audit",
    desc: "Full technical and content audit of your site, GBP, reviews, and competitor landscape. Delivered in week one.",
  },
  {
    num: "2",
    title: "Foundation",
    desc: "We fix indexation, schema, citations, and GBP optimization in the first thirty days. This is where most sites double their visibility.",
  },
  {
    num: "3",
    title: "Scale",
    desc: "Location pages, content, link earning, and review automation roll out across months two and three. Rankings compound.",
  },
  {
    num: "4",
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
  return (
    <RevealSection className="process" id="process">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{headline}</h2>
        <p className="section-intro">{intro}</p>

        <div className="process-steps">
          <div className="process-line" aria-hidden="true" />
          {steps.map((step) => (
            <div key={step.num} className="process-step">
              <div className="step-badge">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
