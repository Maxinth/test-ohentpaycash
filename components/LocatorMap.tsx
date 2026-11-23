"use client";
import { useEffect, useMemo, useState } from "react";
import { APIProvider, AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { agents, type Agent } from "@/lib/agents";

type LatLng = { lat: number; lng: number };
const CENTERS: Record<"us" | "ca", LatLng> = { us: { lat: 40.73, lng: -73.99 }, ca: { lat: 43.65, lng: -79.38 } };

function km(a: LatLng, b: LatLng) {
  const r = (d: number) => (d * Math.PI) / 180;
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 +
    Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

export default function LocatorMap({ country }: { country: "us" | "ca" }) {
  const [query, setQuery] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [me, setMe] = useState<LatLng | null>(null);
  const [geoError, setGeoError] = useState(false);
  const [hour, setHour] = useState<number | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => setHour(new Date().getHours()), []);
  const isOpen = (a: Agent) => hour !== null && hour >= a.opens && hour < a.closes;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agents
      .filter((a) => a.country === country)
      .filter((a) => !q || `${a.name} ${a.address}`.toLowerCase().includes(q))
      .filter((a) => !openOnly || (hour !== null && hour >= a.opens && hour < a.closes))
      .map((a) => ({ a, d: me ? km(me, a) : null }))
      .sort((x, y) => (x.d ?? 0) - (y.d ?? 0));
  }, [query, openOnly, me, hour, country]);

  function locate() {
    setGeoError(false);
    navigator.geolocation?.getCurrentPosition(
      (p) => setMe({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setGeoError(true),
    );
  }

  const active = agents.find((a) => a.id === selected);
  const center = active ?? me ?? CENTERS[country];

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[22rem_1fr]">
      <div>
        <div className="space-y-3">
          <label className="block text-sm font-medium">Area or shop name
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={country === "ca" ? "e.g. Toronto" : "e.g. Brooklyn"}
              className="mt-1 w-full border border-line bg-white px-3 py-2.5" />
          </label>
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} /> Open now
            </label>
            <button onClick={locate} className="rounded-full border border-ink px-4 py-1.5 text-sm font-medium hover:bg-sky">
              Use my location
            </button>
          </div>
          {geoError && <p role="alert" className="text-sm text-red-700">We could not get your location. Allow access in your browser, or search by area.</p>}
        </div>

        <ul className="mt-5 max-h-[28rem] divide-y divide-line overflow-auto border-y border-line">
          {list.length === 0 && <li className="py-6 text-sm">No payment points match. Try a different area or clear the filters.</li>}
          {list.map(({ a, d }) => (
            <li key={a.id}>
              <button onClick={() => setSelected(a.id)} aria-pressed={selected === a.id}
                className={`w-full px-2 py-4 text-left hover:bg-sky/60 ${selected === a.id ? "bg-sky" : ""}`}>
                <span className="block font-display text-lg font-semibold">{a.name}</span>
                <span className="block text-sm text-ink/80">{a.address}</span>
                <span className="mt-1 block text-sm">
                  <span className={isOpen(a) ? "font-medium text-royal" : "text-ink/60"}>
                    {hour === null ? "" : isOpen(a) ? "Open" : "Closed"}
                  </span>
                  {" "}{a.opens}:00 to {a.closes}:00{d !== null && ` · ${d.toFixed(1)} km away`}
                </span>
              </button>
              {selected === a.id && (
                <a className="mb-3 ml-2 inline-block text-sm underline underline-offset-4" target="_blank" rel="noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${a.lat},${a.lng}`}>Get directions</a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-[28rem] bg-sky lg:h-[36rem]">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "DEMO_MAP_ID"} center={center} defaultZoom={12}
              zoom={active ? 15 : undefined} gestureHandling="greedy" disableDefaultUI>
              {list.map(({ a }) => (
                <AdvancedMarker key={a.id} position={a} title={a.name} onClick={() => setSelected(a.id)}>
                  <Pin background={selected === a.id ? "#F0B03A" : "#0A2540"} borderColor="#0A2540" glyphColor="#fff" />
                </AdvancedMarker>
              ))}
              {me && <AdvancedMarker position={me} title="You are here"><Pin background="#1D5FC7" glyphColor="#fff" /></AdvancedMarker>}
            </Map>
          </APIProvider>
        ) : (
          <div className="flex h-full items-center p-8 text-sm">
            Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local to show the map. The list still works without it.
          </div>
        )}
      </div>
    </div>
  );
}
