import { NavLink, useLocation } from "react-router-dom";
import { IconBookings, IconHome, IconInbox, IconProfile } from "./Icons";

const TABS = [
  { to: "/", label: "Home", icon: IconHome, end: true },
  { to: "/inbox", label: "Inbox", icon: IconInbox },
  { to: "/bookings", label: "Bookings", icon: IconBookings },
  { to: "/profile", label: "Profile", icon: IconProfile },
];

const HIDDEN = [
  "/listings/",
  "/availability",
  "/filters",
  "/list",
  "/inbox/",
  "/bookings/",
];

export function useShowNav() {
  const { pathname } = useLocation();
  if (pathname === "/") return true;
  if (HIDDEN.some((p) => pathname.startsWith(p) && pathname !== p.replace(/\/$/, ""))) {
    if (pathname === "/listings") return true;
    if (pathname.startsWith("/listings/") && pathname !== "/listings") return false;
    if (pathname.startsWith("/inbox/") && pathname !== "/inbox") return false;
    if (pathname.startsWith("/bookings/") && pathname !== "/bookings") return false;
    if (pathname.startsWith("/availability")) return false;
    if (pathname === "/filters" || pathname === "/list") return false;
  }
  if (pathname === "/search" || pathname === "/categories" || pathname === "/listings") return true;
  if (pathname === "/inbox" || pathname === "/bookings" || pathname === "/profile") return true;
  if (pathname === "/my-listings") return true;
  return true;
}

export function BottomNav() {
  const show = useShowNav();
  const { pathname } = useLocation();
  if (!show) return null;
  if (pathname.startsWith("/listings/") && pathname !== "/listings") return null;
  if (pathname.startsWith("/availability")) return null;
  if (pathname === "/filters" || pathname === "/list") return null;
  if (pathname.startsWith("/inbox/") && pathname !== "/inbox") return null;
  if (pathname.startsWith("/bookings/") && pathname !== "/bookings") return null;

  return (
    <nav className="bottom-nav">
      {TABS.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.end} className={({ isActive }) => (isActive ? "active" : "")}>
          {({ isActive }) => (
            <>
              <t.icon filled={isActive} />
              {t.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
