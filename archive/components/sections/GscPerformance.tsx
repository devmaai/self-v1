export default function GscPerformance() {
  return (
    <section className="gsc-performance-section">
      <div className="container">
        <iframe
          src="/widgets/gsc-performance.html"
          title="Google Search Console performance"
          className="gsc-performance-frame"
          loading="lazy"
        />
      </div>
    </section>
  );
}
