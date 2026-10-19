import { navigation } from "@/data/site";
import { buttonStyles } from "@/components/ui/ButtonLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { ScrollState } from "./ScrollState";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-paper transition-[border-color,box-shadow] duration-300 in-data-scrolled:border-line">
      <ScrollState />
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href="#top" className="shrink-0 py-2" aria-label="Luna Encantada A2 — back to top">
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="py-2 text-[0.875rem] tracking-[0.02em] text-charcoal transition-colors hover:text-teal"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <a href="#availability" className={`${buttonStyles.primary} !min-h-11 !px-5 !text-sm`}>
              Check Availability
            </a>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
