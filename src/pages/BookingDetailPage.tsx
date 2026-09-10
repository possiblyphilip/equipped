import { Link, useNavigate, useParams } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { formatMoney, listingById, nightsBetween, useStore } from "../store/AppStore";

function nice(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BookingDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { bookings, listings, users, me, openThread, setBookingStatus } = useStore();
  const booking = bookings.find((b) => b.id === id);
  const listing = booking ? listingById(listings, booking.listingId) : undefined;
  const host = listing ? users.find((u) => u.id === listing.hostId) : undefined;

  if (!booking || !listing || !host) return <div className="empty">Booking not found.</div>;

  const days = nightsBetween(booking.start, booking.end);
  const isHost = listing.hostId === me.id && booking.renterId !== me.id;

  return (
    <div>
      <TopBar title="Booking Details" />
      <div className="pad">
        <span className={`status-pill ${booking.status}`}>
          {booking.status[0].toUpperCase() + booking.status.slice(1)}
        </span>
      </div>
      <div className="listing-row">
        <img src={listing.photo} alt="" />
        <div>
          <h3>{listing.title}</h3>
          <div className="muted">Hosted by {host.shortName}</div>
        </div>
      </div>
      <div className="times">
        <div>
          <label>Pickup</label>
          <strong>{nice(booking.start)}</strong>
          <div className="muted">{booking.pickupTime}</div>
          <div className="muted">{booking.address}</div>
        </div>
        <div>
          <label>Return</label>
          <strong>{nice(booking.end)}</strong>
          <div className="muted">{booking.returnTime}</div>
          <div className="muted">{booking.address}</div>
        </div>
      </div>
      <div style={{ padding: "8px 20px 20px" }}>
        <div className="section-head">
          <h2>Total</h2>
          <strong>{formatMoney(booking.total)}</strong>
        </div>
        <div className="muted">
          {days} day{days === 1 ? "" : "s"} × {formatMoney(listing.daily)}
        </div>
      </div>
      {isHost && booking.status === "pending" && (
        <div className="pad" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button className="btn-dark" onClick={() => setBookingStatus(booking.id, "declined")}>
            Decline
          </button>
          <button className="btn-gold" onClick={() => setBookingStatus(booking.id, "confirmed")}>
            Accept
          </button>
        </div>
      )}
      <div className="sticky-cta" style={{ display: "grid", gap: 8 }}>
        <button
          className="row-link"
          style={{ border: 0, justifyContent: "center", gap: 8 }}
          onClick={() => {
            const other = isHost ? booking.renterId : listing.hostId;
            const tid = openThread(listing.id, other);
            nav(`/inbox/${tid}`);
          }}
        >
          Message {isHost ? "renter" : "Host"}
        </button>
        <Link className="btn-gold" to={`/listings/${listing.id}`}>
          View Booking
        </Link>
      </div>
    </div>
  );
}
