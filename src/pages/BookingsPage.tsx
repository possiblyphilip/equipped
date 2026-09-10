import { Link } from "react-router-dom";
import { formatMoney, listingById, nightsBetween, useStore } from "../store/AppStore";

export function BookingsPage() {
  const { bookings, listings, me } = useStore();
  const mine = bookings.filter((b) => b.renterId === me.id || listings.find((l) => l.id === b.listingId)?.hostId === me.id);

  return (
    <div>
      <div className="topbar">
        <span style={{ width: 44 }} />
        <h1>Bookings</h1>
        <span style={{ width: 44 }} />
      </div>
      {mine.length === 0 && <div className="empty">No bookings yet.</div>}
      {mine.map((b) => {
        const listing = listingById(listings, b.listingId);
        if (!listing) return null;
        const days = nightsBetween(b.start, b.end);
        return (
          <Link key={b.id} to={`/bookings/${b.id}`} className="listing-row">
            <img src={listing.photo} alt="" />
            <div>
              <span className={`status-pill ${b.status}`}>{b.status[0].toUpperCase() + b.status.slice(1)}</span>
              <h3 style={{ marginTop: 6 }}>{listing.title}</h3>
              <div className="muted">
                {days} day{days === 1 ? "" : "s"} · {formatMoney(b.total)}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
