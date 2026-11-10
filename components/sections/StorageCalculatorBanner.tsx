import Link from "next/link";

export default function StorageCalculatorBanner({
  text = "Skip the guesswork. Let our Storage Size Calculator help you find the right fit.",
  linkText = "Try the calculator",
}: { text?: string; linkText?: string } = {}) {
  return (
    <aside className="storage-calculator-banner" aria-label="Storage size calculator">
      <p>{text}</p>
      <Link href="/storage-unit-size-calculator">
        {linkText} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
