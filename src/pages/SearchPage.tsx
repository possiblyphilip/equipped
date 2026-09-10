import { Link, useNavigate } from "react-router-dom";
import { ListingRow } from "../components/ListingRow";
import { MapView } from "../components/MapView";
import { IconFilter, IconMap, IconMenu, IconSearch, Logo } from "../components/Icons";
import { useStore } from "../store/AppStore";

export function SearchPage() {
  const nav = useNavigate();
  const { filteredListings, favorites, toggleFavorite, filters, setFilters } = useStore();

  return (
    <div>
      <div className="page-head">
        <button className="icon-btn" onClick={() => nav("/")} aria-label="Menu">
          <IconMenu />
        </button>
        <Logo />
        <Link to="/search" className="icon-btn" aria-label="Map">
          <IconMap />
        </Link>
      </div>
      <div className="pad">
        <div className="search-pill" style={{ border: "1px solid #eee" }}>
          <IconSearch />
          <input
            placeholder="Search equipment..."
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
          />
        </div>
      </div>
      <div className="loc-line">Portland, OR</div>
      <div className="chips">
        <button className="chip" onClick={() => nav("/filters")}>
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <IconFilter /> Filters
          </span>
        </button>
        <button
          className={`chip ${filters.deliveryOnly ? "on" : ""}`}
          onClick={() => setFilters({ deliveryOnly: !filters.deliveryOnly })}
        >
          Delivery
        </button>
        <button className="chip" onClick={() => nav("/filters")}>
          Price
        </button>
        <button className="chip" onClick={() => nav("/filters")}>
          Availability
        </button>
        <button className="chip on">
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <IconMap /> Map
          </span>
        </button>
      </div>
      <MapView listings={filteredListings.slice(0, 12)} />
      <div className="results-label">{filteredListings.length} results near you</div>
      {filteredListings.map((l) => (
        <ListingRow
          key={l.id}
          listing={l}
          favorited={favorites.includes(l.id)}
          onHeart={() => toggleFavorite(l.id)}
        />
      ))}
      <div style={{ height: 12 }} />
    </div>
  );
}
