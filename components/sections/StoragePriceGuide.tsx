import Link from "next/link";
import { faqPageSchema } from "@/lib/schema";
import { getStoragePriceGuide, type StorageSizePrice } from "@/lib/storagePriceGuide";
import StoragePriceExplorer from "@/components/sections/StoragePriceExplorer";

const money = (value: number | null) => (value === null ? null : `$${value.toLocaleString("en-US")}`);

function priceText(size?: StorageSizePrice) {
  const value = money(size?.from ?? null);
  return value ? `${value}/mo` : null;
}

function fromText(size?: StorageSizePrice) {
  const value = priceText(size);
  return value ? `from ${value}` : "at live local rates";
}

function atText(size?: StorageSizePrice) {
  const value = priceText(size);
  return value ? `at ${value}` : "at live local rates";
}

function rangeText(size?: StorageSizePrice) {
  const low = money(size?.typicalLow ?? null);
  const high = money(size?.typicalHigh ?? null);
  return low && high ? `between ${low} and ${high} a month` : "based on live local rates";
}

export default async function StoragePriceGuide() {
  const { sizes, totalListings } = await getStoragePriceGuide();
  const byId = new Map(sizes.map((size) => [size.id, size]));
  const small = byId.get("5x5");
  const studio = byId.get("5x10");
  const oneBed = byId.get("10x10");
  const twoBed = byId.get("10x15");
  const threeBed = byId.get("10x20");
  const updated = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date());

  const faqs = [
    {
      question: "How much does a storage unit cost per month?",
      answer: `Live move-in prices in our listings put a 5 × 5 unit ${atText(small)}, a 5 × 10 ${atText(studio)}, a 10 × 10 ${atText(oneBed)}, and a 10 × 20 ${atText(threeBed)}. The middle half of 10 × 10 listings sits ${rangeText(oneBed)}. The regular monthly rate after a promotion is often higher, and local demand changes the number from city to city.`,
    },
    {
      question: "How much does a 10 × 10 storage unit cost?",
      answer: `A 10 × 10 unit is a common one-bedroom size. Live listings start ${fromText(oneBed)}, and the middle half of listings sit ${rangeText(oneBed)}. Climate control, ground-floor access, and a promotional first month can all move that number.`,
    },
    {
      question: "What size storage unit do I need for a one-bedroom apartment?",
      answer: `A 10 × 10 unit usually holds a one-bedroom apartment, including a sofa, bed, dresser, and kitchen appliances. Live listings start ${fromText(oneBed)}. If you are storing only a bedroom and living room, a 5 × 15 may be enough; add a 10 × 15 if you have a second bedroom or a home office.`,
    },
    {
      question: "What size storage unit fits a three-bedroom house?",
      answer: `A 10 × 20 unit usually holds a three-bedroom home, including large furniture and appliances. Live listings start ${fromText(threeBed)}. Homes with a garage, patio set, or vehicle may need a 10 × 25 or 10 × 30.`,
    },
    {
      question: "Does climate-controlled storage cost more?",
      answer:
        "Yes. Climate-controlled units usually cost more than standard drive-up units at the same facility because they use more energy and are often in higher-demand indoor buildings. The premium varies by city and season, so compare the regular monthly rate for both options rather than only the first-month offer.",
    },
    {
      question: "Why are storage prices different in every city?",
      answer:
        "Storage rates follow local demand, land and construction costs, unit mix, and occupancy. A 10 × 10 in a dense city can cost several times what the same size costs in a smaller market. Facilities also price by access: drive-up and ground-floor units usually cost more than upper-floor units reached by elevator.",
    },
    {
      question: "Are first-month promotions the real price?",
      answer:
        "No. A $1 first month or a percentage discount is a move-in offer, not the ongoing price. Ask for the regular monthly rate and add admin fees, lock fees, and insurance before comparing facilities. The table above uses live move-in prices so you can see the low end of the market, not the price you will pay every month.",
    },
  ];

  const faqSchema = faqPageSchema(faqs);

  return (
    <section className="storage-price-guide" id="storage-prices" aria-labelledby="storage-prices-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="storage-price-guide-inner">
        <div className="storage-price-intro">
          <span className="storage-price-label">Storage prices</span>
          <h2 id="storage-prices-heading">How much does a storage unit cost?</h2>
          <p>
            The calculator above tells you which size to rent. This table shows what that size costs. Prices are
            live move-in rates from storage listings across the United States, shown per month, so you can compare a
            5 × 10 with a 10 × 20 before you call a facility.
          </p>
          <p className="storage-price-rule">
            As a rule of thumb, a one-bedroom apartment usually fits a 10 × 10 unit ({fromText(oneBed)}), a two-bedroom home fits a 10 × 15 ({fromText(twoBed)}), and a three-bedroom home fits a 10 × 20 ({fromText(threeBed)}).
          </p>
        </div>

        <StoragePriceExplorer sizes={sizes} />

        <div className="storage-price-table-wrap">
          <table className="storage-price-table">
            <caption className="sr-only">
              Typical monthly storage unit prices by size, based on live move-in rates
            </caption>
            <thead>
              <tr>
                <th scope="col">Unit size</th>
                <th scope="col">What it usually holds</th>
                <th scope="col">From</th>
                <th scope="col">Typical range</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => {
                const low = money(size.typicalLow);
                const high = money(size.typicalHigh);
                return (
                  <tr key={size.id}>
                    <th scope="row">{size.label} ft</th>
                    <td>{size.fits}</td>
                    <td className="storage-price-from">
                      {size.from ? (
                        <>
                          <strong>{money(size.from)}</strong>
                          <span>/mo</span>
                        </>
                      ) : (
                        "See live prices"
                      )}
                    </td>
                    <td>{low && high ? `${low}–${high}/mo` : "See live prices"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="storage-price-note">
          {totalListings > 0
            ? `Based on ${totalListings.toLocaleString("en-US")} live unit listings. Prices checked ${updated}. “From” is the lower quartile of move-in prices, rounded to the nearest dollar; the typical range is the middle half of listings. Rates vary by city, facility, and availability and are not a quote.`
            : `Live prices are temporarily unavailable. Compare current unit sizes and rates near you.`}
        </p>

        <div className="storage-price-explain">
          <div>
            <h2>What changes the price?</h2>
            <p>
              Five things move a storage quote more than anything else: the size of the unit, whether it is climate
              controlled, where the facility is, how you access the unit, and whether the rate you see is a
              move-in promotion or the regular monthly price.
            </p>
            <ul>
              <li>
                <strong>Size and height.</strong> Floor area sets the base rate, but a 10-foot ceiling holds more than
                an 8-foot one at the same square footage.
              </li>
              <li>
                <strong>Climate control.</strong> Heated or cooled indoor units carry a premium over standard
                drive-up units, especially in humid or desert markets.
              </li>
              <li>
                <strong>Location and demand.</strong> Dense cities, high-occupancy neighborhoods, and peak moving
                season all push rates up. Smaller markets and off-peak move-in dates cost less.
              </li>
              <li>
                <strong>Access.</strong> Drive-up and ground-floor units usually cost more than upper-floor units
                reached by elevator or stairs.
              </li>
              <li>
                <strong>Promotions and fees.</strong> A discounted first month is not the ongoing rate. Add admin
                fees, lock fees, and insurance before comparing two facilities.
              </li>
            </ul>
          </div>
          <aside className="storage-price-cta">
            <h3>Check prices near you</h3>
            <p>
              Storage is priced locally. Use the live search to compare unit sizes and move-in rates from facilities
              in your city.
            </p>
            <Link href="/">Search storage near you →</Link>
            <Link href="/storage-size-guide">See the full size guide →</Link>
          </aside>
        </div>

        <div className="storage-price-faq" aria-labelledby="storage-price-faq-heading">
          <span className="storage-price-label">Common questions</span>
          <h2 id="storage-price-faq-heading">Storage unit pricing FAQs</h2>
          <p className="storage-price-faq-intro">Quick answers to the questions people ask before comparing a unit.</p>
          <div className="storage-price-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <span className="storage-price-faq-toggle" aria-hidden="true">+</span>
                </summary>
                <div className="storage-price-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
