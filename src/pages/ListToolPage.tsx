import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/catalog";
import { TopBar } from "../components/TopBar";
import { useStore } from "../store/AppStore";
import type { CategoryId } from "../types";

export function ListToolPage() {
  const nav = useNavigate();
  const { addListing } = useStore();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryId>("excavators");
  const [daily, setDaily] = useState("75");
  const [delivery, setDelivery] = useState(false);

  return (
    <div>
      <TopBar title="List a tool" />
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          const listing = addListing({
            title: title.trim() || "New listing",
            category,
            daily: Number(daily) || 50,
            delivery,
          });
          nav(`/listings/${listing.id}`, { replace: true });
        }}
      >
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="CAT 303.5E CR Mini Excavator" />
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Daily rate (USD)
          <input inputMode="numeric" value={daily} onChange={(e) => setDaily(e.target.value)} />
        </label>
        <button
          type="button"
          className="row-link"
          onClick={() => setDelivery(!delivery)}
        >
          Delivery available
          <span className={`toggle ${delivery ? "on" : ""}`}>
            <i />
          </span>
        </button>
        <button className="btn-gold" type="submit">
          Publish listing
        </button>
      </form>
    </div>
  );
}
