import type { PropsWithChildren } from "react";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../app/routes";
import { Tooltip } from "@mui/material";

type AppShellProps = PropsWithChildren;

const navigationItems = [
  { label: "الرئيسية", route: appRoutes.home, active: true },
  { label: "الخط الزمني", route: appRoutes.timeline, active: true },
  { label: "الخرائط", active: false },
  { label: "الأنساب", active: false },
  { label: "الشخصيات", active: false },
  { label: "العلاقات", active: false },
] as const;

export function AppShell({ children }: AppShellProps) {
  return (
    <div className='app-shell' dir='rtl'>
      <header className='app-header'>
        <div className='app-header__title'>
          <MenuBookRoundedIcon className='app-header__icon' />
          <h1>التاريخ الإسلامي الوجيز</h1>
        </div>

        <nav className='app-nav' aria-label='التنقل الرئيسي'>
          {navigationItems.map((item) =>
            item.active ? (
              <NavLink
                key={item.route}
                to={item.route}
                end={item.route === appRoutes.home}
                className={({ isActive }) => (isActive ? "app-nav__link is-active" : "app-nav__link")}
              >
                {item.label}
              </NavLink>
            ) : (
              <Tooltip title='قريبًا'>
                <span key={item.label} className='app-nav__link app-nav__link--muted'>
                  {item.label}
                </span>
              </Tooltip>
            ),
          )}
        </nav>
      </header>

      <div className='app-shell__content'>{children}</div>
    </div>
  );
}
