import V2StorageForm from "@/components/v2/V2StorageForm";

type Props = {
  city: string;
  state: string;
  stateName: string;
  cities: string[];
};

/** Free quote band on city pages: context on the left, quote form on the right. */
export default function CityQuoteForm({ city, state, stateName, cities }: Props) {
  const id = "city-quote";
  return (
    <section className="find-storage-cta city-quote-form" aria-labelledby={`${id}-heading`}>
      <div className="find-storage-cta-text">
        <span className="storage-search-label">No obligation quote</span>
        <h2 id={`${id}-heading`}>Get A Free Storage Quote</h2>
        <p>We check storage facilities near you and find the options that fit, so you don&apos;t have to contact multiple companies. You choose the option you like, and there are no extra charges.</p>
        <ol className="city-quote-steps">
          <li><strong>Share your needs.</strong> Pick a unit size, price range, storage type and move-in date.</li>
          <li><strong>We match facilities.</strong> We check storage units near you that fit your budget and needs.</li>
          <li><strong>Get your quote.</strong> You receive a list of matching units with prices, so you can compare and book.</li>
        </ol>
      </div>
      <div className="find-storage-cta-form">
        <V2StorageForm state={stateName} cities={cities} defaultCity={city} idPrefix={id} />
      </div>
    </section>
  );
}
