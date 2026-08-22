import Link from "next/link";
import type { LegalDocument } from "@/lib/legal";
import { formatDate } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
];

export default function LegalLayout({
  doc,
  currentHref,
}: {
  doc: LegalDocument;
  currentHref: string;
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: doc.title }]} />

      <header className="mt-8 mb-10">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-deep">
          {doc.title}
        </h1>
        <p className="mt-2 text-sm text-forest-deep/45">
          Last updated {formatDate(doc.updated)}
        </p>
        <p className="mt-5 text-forest-deep/70 leading-relaxed max-w-2xl">
          {doc.intro}
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_220px] gap-10">
        <div className="rounded-3xl bg-white border border-forest/10 p-6 sm:p-9 space-y-9">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display font-bold text-lg text-forest-deep mb-3">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p
                  key={p}
                  className="text-sm text-forest-deep/70 leading-[1.8] mb-3 last:mb-0"
                >
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 space-y-2">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-forest-deep/70 leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sunny shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-wider text-forest/45 mb-3">
            Policies
          </p>
          <nav className="flex flex-col gap-1">
            {legalLinks.map((link) => {
              const active = link.href === currentHref;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    active
                      ? "rounded-xl bg-forest text-white px-4 py-2.5 text-sm font-semibold"
                      : "rounded-xl px-4 py-2.5 text-sm font-medium text-forest-deep/65 hover:bg-forest/6 transition-colors"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/faq"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-forest-deep/65 hover:bg-forest/6 transition-colors"
            >
              FAQ
            </Link>
          </nav>
        </aside>
      </div>
    </div>
  );
}
