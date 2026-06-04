import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../app/routes";

type AppShellProps = PropsWithChildren;

const navigationItems = [
  { label: "الرئيسية", route: appRoutes.home },
  { label: "الخط الزمني", route: appRoutes.timeline },
] as const;

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="app-shell" dir="rtl">
      <header className="app-header">
        <div className="app-header__title">
          <h1>التاريخ الإسلامي الوجيز</h1>
        </div>

        <nav className="app-nav" aria-label="التنقل الرئيسي">
          {navigationItems.map((item) => (
            <NavLink
              key={item.route}
              to={item.route}
              end={item.route === appRoutes.home}
              className={({ isActive }) =>
                isActive ? "app-nav__link is-active" : "app-nav__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="app-shell__content">{children}</div>
    </div>
  );
}
