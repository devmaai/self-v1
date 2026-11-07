import Link from "next/link";

export default function StorageCalculatorCTA() {
  return (
    <section className="storage-calculator-cta storage-calculator-cta-simple" aria-labelledby="storage-calculator-cta-heading">
      <div className="storage-calculator-cta-copy">
        <h2 id="storage-calculator-cta-heading">Free Storage Size Calculator</h2>
        <Link className="storage-calculator-cta-button" href="/storage-unit-size-calculator">
          Open the storage calculator <span aria-hidden="true">→</span>
        </Link>
      </div>
      <ul className="storage-calculator-cta-benefits" aria-label="How the calculator works">
        <li><span aria-hidden="true">01</span>Start with room presets</li>
        <li><span aria-hidden="true">02</span>Add individual items</li>
        <li><span aria-hidden="true">03</span>Get a clear size recommendation</li>
      </ul>
    </section>
  );
}
