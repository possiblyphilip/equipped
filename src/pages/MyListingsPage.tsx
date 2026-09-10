import { Link, useNavigate } from "react-router-dom";
import { IconPlus } from "../components/Icons";
import { formatMoney, useStore } from "../store/AppStore";

export function MyListingsPage() {
  const nav = useNavigate();
  const { listings, bookings, me } = useStore();
  const mine = listings.filter((l) => l.hostId === me.id);

  return (
    <div>
      <div className="topbar">
        <span style={{ width: 44 }} />
        <h1>My Listings</h1>
        <button className="icon-btn" onClick={() => nav("/list")} aria-label="Add listing">
          <IconPlus />
        </button>
      </div>
      <div className="stats">
        <div>
          <strong>12</strong>
          <span>Active Listings</span>
        </div>
        <div>
          <strong>45</strong>
          <span>Bookings</span>
        </div>
        <div>
          <strong>$3,240</strong>
          <span>This month</span>
        </div>
      </div>
      {mine.map((l) => {
        const rental = bookings.find((b) => b.listingId === l.id && b.status === "confirmed");
        return (
          <Link key={l.id} to={`/listings/${l.id}`} className="listing-row">
            <img src={l.photo} alt="" />
            <div>
              <h3>{l.title}</h3>
              <div className="price">
                {formatMoney(l.daily)} <span className="muted">/ day</span>
              </div>
              {rental ? (
                <span className="status-pill pending" style={{ marginTop: 6 }}>
                  Rented {new Date(rental.start + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  –
                  {new Date(rental.end + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              ) : (
                <span className="status-pill available" style={{ marginTop: 6 }}>
                  Available
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
