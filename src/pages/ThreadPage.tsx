import { FormEvent, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { TopBar, initials } from "../components/TopBar";
import { listingById, useStore } from "../store/AppStore";

export function ThreadPage() {
  const { threadId } = useParams();
  const { threads, messages, users, listings, me, sendMessage } = useStore();
  const thread = threads.find((t) => t.id === threadId);
  const input = useRef<HTMLInputElement>(null);

  if (!thread) return <div className="empty">Conversation not found.</div>;

  const otherId = thread.participantIds.find((id) => id !== me.id) ?? thread.participantIds[0];
  const other = users.find((u) => u.id === otherId);
  const listing = listingById(listings, thread.listingId);
  const msgs = messages.filter((m) => m.threadId === thread.id);

  const onSend = (e: FormEvent) => {
    e.preventDefault();
    const text = input.current?.value.trim();
    if (!text) return;
    sendMessage(thread.id, text);
    if (input.current) input.current.value = "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <TopBar title={other?.shortName ?? "Messages"} />
      {listing && (
        <Link to={`/listings/${listing.id}`} className="muted" style={{ padding: "0 20px 8px", display: "block" }}>
          {listing.title}
        </Link>
      )}
      <div className="bubble-wrap" style={{ flex: 1 }}>
        {msgs.map((m) => (
          <div key={m.id} className={`bubble ${m.fromId === me.id ? "me" : "them"}`}>
            {m.fromId !== me.id && (
              <div className="muted" style={{ marginBottom: 4, display: "flex", gap: 6, alignItems: "center" }}>
                <span className="avatar" style={{ width: 22, height: 22, fontSize: 9 }}>
                  {initials(other?.name ?? "?")}
                </span>
              </div>
            )}
            {m.text}
          </div>
        ))}
      </div>
      <form className="composer" onSubmit={onSend}>
        <input ref={input} placeholder="Message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
