"use client";

import { useState } from "react";

type Props = {
  email: string;
  subject?: string;
  labels: { write: string; copy: string; copied: string; failed: string };
  showAddress?: boolean;
};

// mailto link + "copy address" button. No form, no backend.
export function CopyEmail({ email, subject, labels, showAddress = true }: Props) {
  const [status, setStatus] = useState("");
  const href = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus(labels.copied);
    } catch {
      setStatus(labels.failed);
    }
  }

  return (
    <div>
      {showAddress && (
        <p className="contact-address">
          <a href={href}>{email}</a>
        </p>
      )}
      <div className="contact-actions">
        <a className="button" href={href}>
          {labels.write}
        </a>
        <button type="button" className="button button--secondary" onClick={copy}>
          {labels.copy}
        </button>
      </div>
      <p className="copy-status" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
