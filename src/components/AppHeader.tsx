import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../app/navigation";
import { appRoutes } from "../app/routes";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__title">
        <MenuBookRoundedIcon className="app-header__icon" />
        <h1>التاريخ الإسلامي الوجيز</h1>
      </div>

      <nav className="app-nav" aria-label="التنقل الرئيسي">
        {navigationItems.map((item) =>
          item.enabled ? (
            <NavLink
              key={item.route}
              to={item.route}
              end={item.route === appRoutes.home}
              className={({ isActive }) => (isActive ? "app-nav__link is-active" : "app-nav__link")}
            >
              {item.label}
            </NavLink>
          ) : (
            <Tooltip key={item.label} title="قريبًا">
              <span className="app-nav__link app-nav__link--muted">{item.label}</span>
            </Tooltip>
          ),
        )}
      </nav>
    </header>
  );
}

