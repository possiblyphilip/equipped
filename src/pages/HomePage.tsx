import { Link, useNavigate } from "react-router-dom";
import { asset } from "../asset";
import { CATEGORIES, HOME_CATEGORIES } from "../data/catalog";
import { IconBell, IconChevron, IconSearch, Logo } from "../components/Icons";
import { useStore } from "../store/AppStore";

export function HomePage() {
  const nav = useNavigate();
  const { listings, recentlyViewed, filters, setFilters } = useStore();
  const recent = recentlyViewed
    .map((id) => listings.find((l) => l.id === id))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div>
      <div
        className="home-hero"
        style={{ ["--hero" as string]: `url(${asset("images/hero-excavator.jpg")})` }}
      >
        <div className="home-top">
          <Logo />
          <Link to="/inbox" className="icon-btn" aria-label="Notifications">
            <IconBell />
          </Link>
        </div>
        <h1>
          Rent Equipment.
          <br />
          <em>Get the job done.</em>
        </h1>
        <p className="lede">The easiest way to rent the equipment you need, from people you trust.</p>
        <form
          className="search-pill"
          onSubmit={(e) => {
            e.preventDefault();
            nav("/search");
          }}
        >
          <IconSearch />
          <input
            placeholder="Search equipment..."
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
          />
        </form>
        <button className="loc-row" onClick={() => nav("/search")}>
          <span>Current location</span>
          <IconChevron />
        </button>
      </div>

      <div className="home-sheet">
        <div className="section-head">
          <h2>Browse Categories</h2>
          <Link to="/categories">View all</Link>
        </div>
        <div className="cat-row">
          {HOME_CATEGORIES.map((id) => {
            const c = CATEGORIES.find((x) => x.id === id)!;
            return (
              <button
                key={id}
                className="cat-mini"
                onClick={() => {
                  setFilters({ category: id });
                  nav("/search");
                }}
              >
                <img src={c.photo} alt="" />
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="section-head" style={{ marginTop: 22 }}>
          <h2>Recently Viewed</h2>
          <Link to="/listings">View all</Link>
        </div>
        <div className="recent-row">
          {recent.map((l) => (
            <Link key={l!.id} to={`/listings/${l!.id}`}>
              <img src={l!.photo} alt={l!.title} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
