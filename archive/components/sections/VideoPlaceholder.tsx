export default function VideoPlaceholder() {
  return (
    <div className="video-placeholder-section">
      <div className="container">
        <div className="video-placeholder" role="button" aria-label="Play walkthrough video">
          <div className="video-corner">
            <span className="pulse" />
            <span>Founder Walkthrough</span>
          </div>
          <div className="video-play">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
          <div className="video-label">
            <div className="vl-sub">Watch &middot; 90 seconds</div>
            <div className="vl-main">How we get storage operators into the top 3 map pack</div>
          </div>
          <div className="video-time">01:32</div>
        </div>
      </div>
    </div>
  );
}
