import Link from "next/link";
import { common } from "@/content/cs/common";
import { NavMenu } from "./NavMenu";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="site-header__name">
          <span className="site-header__mark" aria-hidden="true">
            {common.monogram}
          </span>
          {common.siteTitle}
        </Link>
        <NavMenu items={common.nav} label={common.ui.mainNav} toggleLabel={common.ui.menu} />
      </div>
    </header>
  );
}
