"use client";

import { Children, useId, useState, type ElementType, type ReactNode } from "react";

const VISIBLE_COUNT = 5;

export default function ShowMoreList({
  children,
  listClassName,
  listTag: ListTag = "div",
  moreLabel = "See more",
  lessLabel = "See less",
}: {
  children: ReactNode;
  listClassName: string;
  listTag?: ElementType;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = Children.count(children) > VISIBLE_COUNT;
  const listId = useId();

  return (
    <div className={`show-more-wrap${expanded ? " is-expanded" : ""}`}>
      <ListTag id={listId} className={`show-more-list ${listClassName}${expanded ? " is-expanded" : ""}`}>
        {children}
      </ListTag>
      {hasMore && (
        <button
          type="button"
          className="show-more-toggle"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? lessLabel : moreLabel}
          <span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      )}
    </div>
  );
}
