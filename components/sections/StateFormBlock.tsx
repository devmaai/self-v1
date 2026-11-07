import V2StorageForm from "@/components/v2/V2StorageForm";

type Props = {
  id: string;
  state: string;
  cities: string[];
  heading?: string;
  body?: string;
};

/** "Find storage near you" band with the short form, state fixed, city as a dropdown. */
export default function StateFormBlock({ id, state, cities, heading = "Find storage near you", body }: Props) {
  return (
    <section className="find-storage-cta state-form-block" aria-labelledby={`${id}-heading`}>
      <div className="find-storage-cta-text">
        <span className="storage-search-label">Free, no obligation</span>
        <h2 id={`${id}-heading`}>{heading}</h2>
        <p>{body ?? `Pick your ${state} city, unit size and dates. We will match you with storage facilities that fit.`}</p>
      </div>
      <div className="find-storage-cta-form">
        <V2StorageForm state={state} cities={cities} compact idPrefix={id} />
      </div>
    </section>
  );
}
