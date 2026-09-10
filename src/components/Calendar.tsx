import { useMemo, useState } from "react";

const DOW = ["S", "M", "T", "W", "T", "F", "S"];

function ymd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function Calendar({
  start,
  end,
  onChange,
  blocked = [],
}: {
  start: string | null;
  end: string | null;
  onChange: (start: string | null, end: string | null) => void;
  blocked?: string[];
}) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const cells = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const out: { date: string | null; day: number | null }[] = [];
    for (let i = 0; i < first; i++) out.push({ date: null, day: null });
    for (let d = 1; d <= days; d++) {
      const dt = new Date(y, m, d);
      out.push({ date: ymd(dt), day: d });
    }
    return out;
  }, [cursor]);

  const label = cursor.toLocaleString("en-US", { month: "long", year: "numeric" });

  const click = (date: string) => {
    if (blocked.includes(date)) return;
    if (!start || (start && end)) {
      onChange(date, null);
      return;
    }
    if (date < start) {
      onChange(date, start);
      return;
    }
    onChange(start, date);
  };

  const inRange = (date: string) => start && end && date > start && date < end;

  return (
    <div className="cal">
      <div className="cal-head">
        <button className="icon-btn" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
          ‹
        </button>
        {label}
        <button className="icon-btn" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
          ›
        </button>
      </div>
      <div className="cal-grid">
        {DOW.map((d) => (
          <div key={d} className="dow">
            {d}
          </div>
        ))}
        {cells.map((c, i) => {
          if (!c.date) return <div key={i} />;
          const cls = [
            "cal-day",
            c.date === start || c.date === end ? (c.date === start ? "start" : "end") : "",
            inRange(c.date) ? "in" : "",
            blocked.includes(c.date) ? "mute" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button key={c.date} className={cls} onClick={() => click(c.date!)}>
              {c.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
