import { AppRoutes } from "./app/AppRoutes";
import { AppShell } from "./components/AppShell";

export default function App() {
  return (
    <AppShell>
      <AppRoutes />
    </AppShell>
  );
}
