import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "../components/Calendar";
import { TopBar } from "../components/TopBar";
import { formatMoney, listingById, nightsBetween, useStore } from "../store/AppStore";

function addDays(iso: string, n: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d + n);
  const yy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function todayLocal() {
  return addDays(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    0
  );
}

export function AvailabilityPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { listings, bookings, createBooking } = useStore();
  const listing = listingById(listings, id ?? "");
  const today = todayLocal();
  const [start, setStart] = useState<string | null>(addDays(today, 5));
  const [end, setEnd] = useState<string | null>(addDays(today, 7));

  if (!listing) return <div className="empty">Listing not found.</div>;

  const blocked = bookings
    .filter((b) => b.listingId === listing.id && b.status === "confirmed")
    .flatMap((b) => {
      const out: string[] = [];
      let d = b.start;
      while (d < b.end) {
        out.push(d);
        d = addDays(d, 1);
      }
      return out;
    });

  const days = start && end ? nightsBetween(start, end) : 0;
  const ready = Boolean(start && end && end >= start);

  return (
    <div>
      <TopBar title="Check availability" dark />
      <div className="listing-row">
        <img src={listing.photo} alt="" />
        <div>
          <h3>{listing.title}</h3>
          <div className="muted">{formatMoney(listing.daily)} / day</div>
        </div>
      </div>
      <h3 style={{ padding: "8px 20px 0", fontSize: 15 }}>Select dates</h3>
      <Calendar
        start={start}
        end={end}
        blocked={blocked}
        onChange={(s, e) => {
          setStart(s);
          setEnd(e);
        }}
      />
      <div className="times">
        <div>
          <label>Pickup</label>
          <strong>
            {start
              ? new Date(start + "T12:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—"}
          </strong>
          <div className="muted">8:00 AM</div>
        </div>
        <div>
          <label>Return</label>
          <strong>
            {end
              ? new Date(end + "T12:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—"}
          </strong>
          <div className="muted">5:00 PM</div>
        </div>
      </div>
      {ready && (
        <p className="muted" style={{ padding: "0 20px 12px" }}>
          {days} day{days === 1 ? "" : "s"} × {formatMoney(listing.daily)} = {formatMoney(days * listing.daily)}{" "}
          + {formatMoney(listing.deposit)} refundable deposit
        </p>
      )}
      <div className="sticky-cta">
        <button
          className="btn-gold"
          disabled={!ready}
          onClick={() => {
            if (!start || !end) return;
            const b = createBooking({
              listingId: listing.id,
              start,
              end,
              pickupTime: "8:00 AM",
              returnTime: "5:00 PM",
            });
            nav(`/bookings/${b.id}`, { replace: true });
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
