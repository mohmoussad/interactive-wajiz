import type { PropsWithChildren } from "react";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../app/routes";

type AppShellProps = PropsWithChildren;

const navigationItems = [
  { label: "الرئيسية", route: appRoutes.home, kind: "route" },
  { label: "الخط الزمني", route: appRoutes.timeline, kind: "route" },
  { label: "الخرائط", kind: "static" },
  { label: "الأنساب", kind: "static" },
  { label: "الشخصيات", kind: "static" },
  { label: "العلاقات", kind: "static" },
] as const;

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="app-shell" dir="rtl">
      <header className="app-header">
        <div className="app-header__title">
          <MenuBookRoundedIcon className="app-header__icon" />
          <h1>التاريخ الإسلامي الوجيز</h1>
        </div>

        <nav className="app-nav" aria-label="التنقل الرئيسي">
          {navigationItems.map((item) =>
            item.kind === "route" ? (
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
            ) : (
              <span key={item.label} className="app-nav__link app-nav__link--muted">
                {item.label}
              </span>
            ),
          )}
        </nav>
      </header>

      <div className="app-shell__content">{children}</div>
    </div>
  );
}
