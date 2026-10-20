import { property } from "@/data/property";
import { footerNavigation, legalPages } from "@/data/site";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  const { address, contact } = property;
  const year = new Date().getFullYear();
  const contactLinks = [
    contact.email && { label: contact.email, href: `mailto:${contact.email}`, channel: "email" },
    contact.phone && { label: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}`, channel: "phone" },
    contact.whatsapp && {
      label: "WhatsApp",
      href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`,
      channel: "whatsapp",
    },
  ].filter(Boolean) as { label: string; href: string; channel: string }[];

  return (
    <footer className="border-t border-line bg-faint pt-12 pb-28 text-sm md:pb-10">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Wordmark />
            <p className="mt-4 leading-relaxed text-muted">
              {address.street}, {address.area}
              <br />
              {address.postalCode} {address.city}, {address.state}
              <br />
              {address.country}
            </p>
            {contactLinks.length > 0 && (
              <ul className="mt-4 space-y-3">
                {contactLinks.map((c) => (
                  <li key={c.channel}>
                    <a
                      href={c.href}
                      data-track="contact_click"
                      data-track-channel={c.channel}
                      className="font-medium text-ink hover:underline"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold tracking-normal">Explore</h2>
            <ul className="mt-3 space-y-1">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-9 items-center text-muted hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-normal">Policies</h2>
            <ul className="mt-3 space-y-1">
              {legalPages.map((page) => (
                <li key={page.label} className="flex min-h-9 items-center">
                  {page.path ? (
                    <a href={page.path} className="text-muted hover:text-ink">
                      {page.label}
                    </a>
                  ) : (
                    <span className="text-muted">
                      {page.label} <span className="text-xs">· coming soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-deco pt-6 text-muted">
          <p>
            © {year} {property.name} · {address.city}, {address.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
