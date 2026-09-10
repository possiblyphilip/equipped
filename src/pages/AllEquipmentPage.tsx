import { useNavigate } from "react-router-dom";
import { ListingRow } from "../components/ListingRow";
import { IconFilter } from "../components/Icons";
import { TopBar } from "../components/TopBar";
import { useStore } from "../store/AppStore";

export function AllEquipmentPage() {
  const nav = useNavigate();
  const { filteredListings, favorites, toggleFavorite } = useStore();
  return (
    <div>
      <TopBar
        title="All Equipment"
        right={
          <button className="icon-btn" onClick={() => nav("/filters")} aria-label="Filters">
            <IconFilter />
          </button>
        }
      />
      <div className="results-label">{filteredListings.length} results</div>
      {filteredListings.map((l) => (
        <ListingRow
          key={l.id}
          listing={l}
          favorited={favorites.includes(l.id)}
          onHeart={() => toggleFavorite(l.id)}
        />
      ))}
    </div>
  );
}
