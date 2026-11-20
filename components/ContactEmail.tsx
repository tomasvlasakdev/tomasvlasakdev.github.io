import { common } from "@/content/cs/common";
import { siteConfig } from "@/site.config";
import { CopyEmail } from "./CopyEmail";

/** CopyEmail wired to the site e-mail and the shared labels. */
export function ContactEmail({ subject, showAddress }: { subject?: string; showAddress?: boolean }) {
  const { ui } = common;
  return (
    <CopyEmail
      email={siteConfig.contact.email}
      subject={subject}
      showAddress={showAddress}
      labels={{ write: ui.writeEmail, copy: ui.copyAddress, copied: ui.copied, failed: ui.copyFailed }}
    />
  );
}
