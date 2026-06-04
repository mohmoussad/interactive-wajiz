import { appRoutes } from "./routes";

// Disabled entries are visible navigation placeholders and intentionally do not define routes yet.
export const navigationItems = [
  { label: "الرئيسية", route: appRoutes.home, enabled: true },
  { label: "الخط الزمني", route: appRoutes.timeline, enabled: true },
  { label: "الخرائط", enabled: false },
  { label: "الأنساب", enabled: false },
  { label: "الشخصيات", enabled: false },
  { label: "العلاقات", enabled: false },
] as const;
