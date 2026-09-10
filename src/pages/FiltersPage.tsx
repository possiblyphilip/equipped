import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/catalog";
import { TopBar } from "../components/TopBar";
import { formatMoney, useStore } from "../store/AppStore";

export function FiltersPage() {
  const nav = useNavigate();
  const { filters, setFilters, resetFilters, filteredListings } = useStore();

  return (
    <div>
      <TopBar
        title="Filters"
        right={
          <button className="link" onClick={resetFilters}>
            Clear all
          </button>
        }
      />
      <div className="filter-block">
        <h3>Category</h3>
        <div className="cat-row">
          {CATEGORIES.slice(0, 4).map((c) => (
            <button
              key={c.id}
              className="cat-mini"
              onClick={() => setFilters({ category: filters.category === c.id ? null : c.id })}
            >
              <img
                src={c.photo}
                alt=""
                style={{
                  outline: filters.category === c.id ? "2px solid #0b0b0d" : "none",
                  outlineOffset: 2,
                }}
              />
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-block">
        <h3>
          Price range{" "}
          <span className="muted" style={{ fontWeight: 400 }}>
            {formatMoney(filters.minPrice)} – {formatMoney(filters.maxPrice)}
          </span>
        </h3>
        <input
          className="range"
          type="range"
          min={0}
          max={1000}
          step={25}
          value={filters.maxPrice}
          onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
        />
      </div>
      <div className="filter-block">
        <h3>Availability</h3>
        <div className="muted">Anytime</div>
      </div>
      <div className="filter-block" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ margin: 0 }}>Delivery</h3>
          <div className="muted">Show only with delivery</div>
        </div>
        <button
          className={`toggle ${filters.deliveryOnly ? "on" : ""}`}
          onClick={() => setFilters({ deliveryOnly: !filters.deliveryOnly })}
          aria-label="Delivery"
        >
          <i />
        </button>
      </div>
      <div className="filter-block">
        <h3>
          Distance <span className="muted">{filters.distance} miles</span>
        </h3>
        <input
          className="range"
          type="range"
          min={1}
          max={25}
          value={filters.distance}
          onChange={(e) => setFilters({ distance: Number(e.target.value) })}
        />
      </div>
      <div className="sticky-cta">
        <button className="btn-dark" onClick={() => nav("/search")}>
          Show {filteredListings.length} results
        </button>
      </div>
    </div>
  );
}
