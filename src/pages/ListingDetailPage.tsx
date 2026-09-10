import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IconBack, IconHeart, IconStar } from "../components/Icons";
import { formatMoney, listingById, useStore } from "../store/AppStore";
import { initials } from "../components/TopBar";

export function ListingDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { listings, users, favorites, toggleFavorite, viewListing } = useStore();
  const listing = listingById(listings, id ?? "");
  const host = users.find((u) => u.id === listing?.hostId);

  useEffect(() => {
    if (listing) viewListing(listing.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing?.id]);

  if (!listing || !host) return <div className="empty">Listing not found.</div>;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <img className="hero-photo" src={listing.photo} alt="" />
        <button className="back-abs" onClick={() => nav(-1)} aria-label="Back">
          <IconBack />
        </button>
        <button
          className={`back-abs ${favorites.includes(listing.id) ? "on" : ""}`}
          style={{ left: "auto", right: 8 }}
          onClick={() => toggleFavorite(listing.id)}
          aria-label="Save"
        >
          <IconHeart filled={favorites.includes(listing.id)} />
        </button>
      </div>
      <div className="detail">
        <h1>{listing.title}</h1>
        <div className="stars" style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <IconStar /> {listing.rating.toFixed(1)}{" "}
          <span className="muted">({listing.reviewCount} reviews)</span>
        </div>
        <div className="host-row">
          <div className="avatar">{initials(host.name)}</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <strong>Hosted by {host.shortName}</strong>
            <div className="muted">Member since {host.memberSince}</div>
          </div>
        </div>
        <div style={{ padding: "10px 0" }}>
          {host.verified && <span className="badge">ID verified</span>}
          {host.insured && <span className="badge">Insured</span>}
          {listing.delivery && <span className="badge">Delivery</span>}
          <span className="badge">{formatMoney(listing.deposit)} deposit</span>
        </div>
        <div className="specs">
          {listing.specs.map((s) => (
            <div key={s.label}>
              {s.label}
              <strong>{s.value}</strong>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 16, margin: "8px 0" }}>Pricing</h2>
        <div className="pricing-row">
          <div>
            <strong>{formatMoney(listing.daily)}</strong>
            <span className="muted">/ day</span>
          </div>
          <div>
            <strong>{formatMoney(listing.weekly)}</strong>
            <span className="muted">/ week</span>
          </div>
          <div>
            <strong>{formatMoney(listing.monthly)}</strong>
            <span className="muted">/ month</span>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.45 }}>
          {listing.description}
        </p>
        {listing.reviews.map((r) => (
          <div className="review" key={r.author}>
            <strong>{r.author}</strong> · {r.rating.toFixed(1)}
            <div style={{ marginTop: 4 }}>{r.text}</div>
          </div>
        ))}
      </div>
      <div className="sticky-cta">
        <Link className="btn-gold" to={`/listings/${listing.id}/availability`}>
          Check availability
        </Link>
      </div>
    </div>
  );
}
