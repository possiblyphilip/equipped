import { Link } from "react-router-dom";
import { formatWhen, listingById, useStore } from "../store/AppStore";
import { initials } from "../components/TopBar";

export function InboxPage() {
  const { threads, users, listings, me } = useStore();
  const sorted = [...threads].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

  return (
    <div>
      <div className="topbar">
        <span style={{ width: 44 }} />
        <h1>Messages</h1>
        <span style={{ width: 44 }} />
      </div>
      {sorted.map((t) => {
        const otherId = t.participantIds.find((id) => id !== me.id) ?? t.participantIds[0];
        const other = users.find((u) => u.id === otherId);
        const listing = listingById(listings, t.listingId);
        return (
          <Link key={t.id} to={`/inbox/${t.id}`} className="msg-row">
            <div className="avatar">{initials(other?.name ?? "?")}</div>
            <div style={{ minWidth: 0 }}>
              <strong>{other?.shortName}</strong>
              <p>{t.preview}</p>
            </div>
            <div className="muted">{formatWhen(t.updatedAt)}</div>
            {listing ? null : null}
          </Link>
        );
      })}
    </div>
  );
}
