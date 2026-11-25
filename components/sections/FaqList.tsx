"use client";

import { useRef, useState } from "react";

const INITIAL_COUNT = 5;

// FAQ accordion that shows the first 5 questions and toggles the rest with "Load more" / "View less".
// Hidden items stay in the DOM so the content remains crawlable.
export default function FaqList({ faqs }: { faqs: string[][] }) {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const hasMore = faqs.length > INITIAL_COUNT;

  function collapse() {
    setExpanded(false);
    // Close extra items and bring the list back into view so the page doesn't jump.
    listRef.current?.querySelectorAll("details").forEach((d, i) => {
      if (i >= INITIAL_COUNT) d.open = false;
    });
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <>
      <div className="storage-size-faq-list" ref={listRef}>
        {faqs.map(([question, answer], i) => (
          <details key={question} hidden={hasMore && !expanded && i >= INITIAL_COUNT}>
            <summary>{question}<span aria-hidden="true">+</span></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      {hasMore && (
        <p className="storage-size-faq-more">
          <button type="button" className="climate-button" aria-expanded={expanded} onClick={expanded ? collapse : () => setExpanded(true)}>
            {expanded ? "View less" : "Load more questions"} <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        </p>
      )}
    </>
  );
}
