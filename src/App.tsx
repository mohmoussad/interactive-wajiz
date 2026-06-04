import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes } from "./app/routes";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { TimelinePage } from "./pages/TimelinePage";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path={appRoutes.home} element={<HomePage />} />
        <Route path={appRoutes.timeline} element={<TimelinePage />} />
        <Route path="*" element={<Navigate to={appRoutes.home} replace />} />
      </Routes>
    </AppShell>
  );
}
