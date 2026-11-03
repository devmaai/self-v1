import Link from "next/link";

export default function StorageCalculatorCTA() {
  return (
    <section className="storage-calculator-cta" aria-labelledby="storage-calculator-cta-heading">
      <div className="storage-calculator-cta-copy">
        <span className="storage-calculator-cta-label">Take the guesswork out</span>
        <h2 id="storage-calculator-cta-heading">Find your best-fit storage size in about a minute.</h2>
        <p>
          Choose the rooms and items you are storing, and get a practical unit recommendation before you compare prices or reserve.
        </p>
        <Link className="storage-calculator-cta-button" href="/storage-unit-size-calculator">
          Open the storage calculator <span aria-hidden="true">→</span>
        </Link>
      </div>
      <ul className="storage-calculator-cta-benefits" aria-label="Calculator benefits">
        <li><span aria-hidden="true">01</span>Start with room presets</li>
        <li><span aria-hidden="true">02</span>Add individual items</li>
        <li><span aria-hidden="true">03</span>Get a clear size recommendation</li>
      </ul>
    </section>
  );
}
