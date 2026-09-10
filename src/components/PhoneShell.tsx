import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function PhoneShell() {
  const { pathname } = useLocation();
  const dark =
    pathname === "/" || pathname.startsWith("/availability") || pathname === "/filters";

  return (
    <div className="phone-shell">
      <div className={`status-bar ${pathname === "/" ? "dark" : "light"}`}>
        <span>9:41</span>
        <span>LTE</span>
      </div>
      <div className={`screen ${dark && pathname === "/" ? "dark" : ""}`}>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
