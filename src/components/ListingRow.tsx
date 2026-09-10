import { Link } from "react-router-dom";
import { IconHeart, IconStar } from "./Icons";
import type { Listing } from "../types";
import { formatMoney } from "../store/AppStore";

export function ListingRow({
  listing,
  favorited,
  onHeart,
}: {
  listing: Listing;
  favorited: boolean;
  onHeart: () => void;
}) {
  return (
    <div className="listing-row">
      <Link to={`/listings/${listing.id}`}>
        <img src={listing.photo} alt="" />
      </Link>
      <Link to={`/listings/${listing.id}`}>
        <h3>{listing.title}</h3>
        <div className="price">
          {formatMoney(listing.daily)} <span className="muted">/ day</span>
        </div>
        <div className="muted" style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2 }}>
          <span style={{ color: "#d4a800", display: "inline-flex", gap: 3, alignItems: "center" }}>
            <IconStar /> {listing.rating.toFixed(1)}
          </span>
          ({listing.reviewCount}) · {listing.miles.toFixed(1)} mi away
        </div>
      </Link>
      <button className={`heart ${favorited ? "on" : ""}`} onClick={onHeart} aria-label="Save">
        <IconHeart filled={favorited} />
      </button>
    </div>
  );
}
