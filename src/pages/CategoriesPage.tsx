import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/catalog";
import { TopBar } from "../components/TopBar";
import { useStore } from "../store/AppStore";

export function CategoriesPage() {
  const nav = useNavigate();
  const { listings, setFilters } = useStore();

  return (
    <div>
      <TopBar title="Browse Categories" />
      <div className="cat-grid">
        {CATEGORIES.map((c) => {
          const n = listings.filter((l) => l.category === c.id).length;
          return (
            <button
              key={c.id}
              className="cat-tile"
              onClick={() => {
                setFilters({ category: c.id, query: "" });
                nav("/search");
              }}
            >
              <img src={c.photo} alt="" />
              <h3>{c.label}</h3>
              <div className="muted">{n} available</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
