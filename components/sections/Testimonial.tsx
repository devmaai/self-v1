import RevealSection from "@/components/ui/RevealSection";

export interface TestimonialProps {
  quote?: React.ReactNode;
  avatarInitials?: string;
  name?: string;
  detail?: string;
}

export default function Testimonial({
  quote = (
    <>
      Within four months we stopped running Google Ads entirely. The organic rankings were doing the
      work the ads used to do, and the move-ins were <em>better quality</em> with longer rental
      stays.
    </>
  ),
  avatarInitials = "MR",
  name = "Independent operator, Midwest US",
  detail = "Two facilities, 640 units total",
}: TestimonialProps) {
  return (
    <RevealSection className="testimonial">
      <div className="container">
        <div className="quote-mark" aria-hidden="true">&ldquo;</div>
        <div className="testimonial-content">
          <blockquote>{quote}</blockquote>
          <div className="cite">
            <div className="cite-avatar" aria-hidden="true">
              {avatarInitials}
            </div>
            <div className="cite-info">
              <strong>{name}</strong>
              <span>{detail}</span>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
