import type { PropsWithChildren } from "react";
import { AppHeader } from "./AppHeader";

type AppShellProps = PropsWithChildren;

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell" dir="rtl">
      <AppHeader />
      <div className="app-shell__content">{children}</div>
    </div>
  );
}
