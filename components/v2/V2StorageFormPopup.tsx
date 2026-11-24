"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import V2StorageForm from "@/components/v2/V2StorageForm";

const SHOW_DELAY_MS = 10_000;
const DISMISS_KEY = "storage-form-popup-dismissed";

export default function V2StorageFormPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(DISMISS_KEY) === "1") return;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [mounted]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div className="v2-home">
      <div
        className="sf-popup-backdrop open"
        role="dialog"
        aria-modal="true"
        aria-label="Find my storage"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="sf-popup-modal">
          <button
            ref={closeButtonRef}
            type="button"
            className="sf-popup-close"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
          <div className="sf-popup-form">
            <V2StorageForm
              idPrefix="sf-popup"
              onSuccess={() => {
                if (typeof window !== "undefined") {
                  window.sessionStorage.setItem(DISMISS_KEY, "1");
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
