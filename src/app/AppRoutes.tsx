import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";
import { HomePage } from "../pages/HomePage";
import { TimelinePage } from "../pages/TimelinePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={appRoutes.home} element={<HomePage />} />
      <Route path={appRoutes.timeline} element={<TimelinePage />} />
      <Route path="*" element={<Navigate to={appRoutes.home} replace />} />
    </Routes>
  );
}

