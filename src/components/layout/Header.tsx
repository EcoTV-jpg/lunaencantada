import { navigation } from "@/data/site";
import { buttonStyles } from "@/components/ui/ButtonLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { ScrollState } from "./ScrollState";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <ScrollState />
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#top" className="shrink-0 py-2" aria-label="Luna Encantada A2 — back to top">
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium text-muted transition-colors hover:bg-faint hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <a href="#availability" className={`${buttonStyles.primary} !min-h-11 !px-5 !text-[0.9375rem]`}>
              Check availability
            </a>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
