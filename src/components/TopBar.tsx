import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IconBack } from "./Icons";

export function TopBar({
  title,
  right,
  dark,
}: {
  title: string;
  right?: ReactNode;
  dark?: boolean;
}) {
  const nav = useNavigate();
  return (
    <div className={`topbar ${dark ? "dark" : ""}`}>
      <button className="icon-btn" onClick={() => nav(-1)} aria-label="Back">
        <IconBack />
      </button>
      <h1>{title}</h1>
      {right ?? <span style={{ width: 44 }} />}
    </div>
  );
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}
