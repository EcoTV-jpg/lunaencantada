import { property } from "@/data/property";
import { footerNavigation, legalPages } from "@/data/site";

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
    <footer className="on-dark bg-ink pt-20 pb-28 text-foam md:pb-12">
      <div className="container-page">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif leading-none text-paper">
              <span className="block text-[1.75rem] tracking-[0.16em] uppercase">Luna Encantada</span>
              <span className="mt-2 block text-[1.75rem] italic text-sand">A2</span>
            </p>
            <p className="mt-8 leading-relaxed">
              {address.city}
              <br />
              {address.state}
              <br />
              {address.country}
            </p>
            {contactLinks.length > 0 && (
              <ul className="mt-6 space-y-1">
                {contactLinks.map((c) => (
                  <li key={c.channel}>
                    <a href={c.href} data-track="contact_click" data-track-channel={c.channel} className="link-underline text-paper">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow text-sand">Explore</p>
            <ul className="mt-5 space-y-1">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-10 items-center text-paper hover:text-sand">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-sand">Policies</p>
            <ul className="mt-5 space-y-1">
              {legalPages.map((page) => (
                <li key={page.label} className="flex min-h-10 items-center">
                  {page.path ? (
                    <a href={page.path} className="text-paper hover:text-sand">
                      {page.label}
                    </a>
                  ) : (
                    <span>
                      {page.label} <span className="text-sm text-foam/80">— coming soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line-dark pt-8 text-sm sm:flex-row sm:justify-between">
          <p>
            © {year} {property.name}
          </p>
          <p>
            {address.street}, {address.area}, {address.postalCode} {address.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
