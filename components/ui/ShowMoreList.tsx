"use client";

import { useState } from "react";

export default function ShowMoreList({
  children,
  listClassName,
  moreLabel = "Show more",
  lessLabel = "Show less",
}: {
  children: React.ReactNode;
  listClassName: string;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="show-more-wrap">
      <div className={`${listClassName}${expanded ? " is-expanded" : ""}`}>{children}</div>
      <button
        type="button"
        className="show-more-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? lessLabel : moreLabel}
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
    </div>
  );
}
