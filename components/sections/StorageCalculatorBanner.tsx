import Link from "next/link";

export default function StorageCalculatorBanner() {
  return (
    <aside className="storage-calculator-banner" aria-label="Storage size calculator">
      <p>Skip the guesswork. Let our Storage Size Calculator help you find the right fit.</p>
      <Link href="/storage-unit-size-calculator">
        Try the calculator <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
