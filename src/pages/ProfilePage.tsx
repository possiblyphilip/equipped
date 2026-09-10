import { Link, useNavigate } from "react-router-dom";
import { IconChevron } from "../components/Icons";
import { initials } from "../components/TopBar";
import { useStore } from "../store/AppStore";

export function ProfilePage() {
  const nav = useNavigate();
  const { me, resetDemo, favorites, listings } = useStore();
  const saved = listings.filter((l) => favorites.includes(l.id));

  return (
    <div>
      <div className="topbar">
        <span style={{ width: 44 }} />
        <h1>Profile</h1>
        <span style={{ width: 44 }} />
      </div>
      <div className="profile">
        <div className="avatar lg" style={{ margin: "0 auto 10px" }}>
          {initials(me.name)}
        </div>
        <h2>{me.name}</h2>
        <div className="muted">
          Member since {me.memberSince} · {me.neighborhood}
        </div>
        <div style={{ marginTop: 10 }}>
          {me.verified && <span className="badge">ID verified</span>}
          {me.insured && <span className="badge">Insured</span>}
        </div>
      </div>
      <div className="pad">
        <Link className="row-link" to="/my-listings">
          My Listings <IconChevron />
        </Link>
        <Link className="row-link" to="/list">
          List a tool <IconChevron />
        </Link>
        <Link className="row-link" to="/bookings">
          Bookings <IconChevron />
        </Link>
        <button className="row-link" onClick={() => nav(saved[0] ? `/listings/${saved[0].id}` : "/listings")}>
          Saved ({saved.length}) <IconChevron />
        </button>
        <p className="muted" style={{ textAlign: "left", padding: "16px 0 8px", lineHeight: 1.4 }}>
          On iPhone: Share → Add to Home Screen. On Android: menu → Install app.
        </p>
        <button
          className="btn-dark"
          onClick={() => {
            resetDemo();
            nav("/");
          }}
        >
          Reset demo
        </button>
      </div>
    </div>
  );
}
