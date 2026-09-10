import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import type { Listing } from "../types";

function pin(price: number, active?: boolean) {
  return L.divIcon({
    className: "price-pin",
    html: `<span style="${active ? "background:#0B0B0D;color:#F5C400" : ""}">$${price}</span>`,
    iconSize: [54, 28],
    iconAnchor: [27, 28],
  });
}

function Fit({ listings }: { listings: Listing[] }) {
  const map = useMap();
  useEffect(() => {
    if (!listings.length) {
      map.setView([45.523, -122.676], 12);
      return;
    }
    const b = L.latLngBounds(listings.map((l) => [l.lat, l.lng]));
    map.fitBounds(b, { padding: [28, 28], maxZoom: 13 });
  }, [listings, map]);
  return null;
}

export function MapView({ listings, activeId }: { listings: Listing[]; activeId?: string }) {
  const nav = useNavigate();
  return (
    <div className="map-wrap">
      <MapContainer
        center={[45.523, -122.676]}
        zoom={12}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Fit listings={listings} />
        {listings.map((l) => (
          <Marker
            key={l.id}
            position={[l.lat, l.lng]}
            icon={pin(l.daily, l.id === activeId)}
            eventHandlers={{ click: () => nav(`/listings/${l.id}`) }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
