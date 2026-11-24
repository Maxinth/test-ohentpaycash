"use client";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { agents, type Agent } from "@/lib/agents";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type LatLng = { lat: number; lng: number };
const CENTERS: Record<"us" | "ca", LatLng> = {
  us: { lat: 40.73, lng: -73.99 },
  ca: { lat: 43.65, lng: -79.38 },
};

function km(a: LatLng, b: LatLng) {
  const r = (d: number) => (d * Math.PI) / 180;
  const h =
    Math.sin(r(b.lat - a.lat) / 2) ** 2 +
    Math.cos(r(a.lat)) *
      Math.cos(r(b.lat)) *
      Math.sin(r(b.lng - a.lng) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

// Current hour, read from the browser clock. null on the server so nothing mismatches on hydration.
function subscribeToClock(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}
const getHour = () => new Date().getHours();
const getServerHour = () => null;

function PanTo({ target, zoom }: { target: LatLng; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    map.panTo(target);
    if (zoom) map.setZoom(zoom);
  }, [map, target, zoom]);
  return null;
}

export default function LocatorMap({ country }: { country: "us" | "ca" }) {
  const [query, setQuery] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [me, setMe] = useState<LatLng | null>(null);
  const [geoError, setGeoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const hour = useSyncExternalStore<number | null>(
    subscribeToClock,
    getHour,
    getServerHour,
  );
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const isOpen = (a: Agent) =>
    hour !== null && hour >= a.opens && hour < a.closes;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agents
      .filter((a) => a.country === country)
      .filter((a) => !q || `${a.name} ${a.address}`.toLowerCase().includes(q))
      .filter(
        (a) =>
          !openOnly || (hour !== null && hour >= a.opens && hour < a.closes),
      )
      .map((a) => ({ a, d: me ? km(me, a) : null }))
      .sort((x, y) => (x.d ?? 0) - (y.d ?? 0));
  }, [query, openOnly, me, hour, country]);

  const normalizedQuery = query.trim().toLowerCase();
  const suggestions = normalizedQuery
    ? agents
        .filter((a) => a.country === country)
        .filter((a) =>
          `${a.name} ${a.address}`.toLowerCase().includes(normalizedQuery),
        )
        .slice(0, 5)
    : [];

  function chooseSuggestion(agent: Agent) {
    setIsLoading(true);
    setQuery(agent.address);
    setSelected(agent.id);
    setSuggestionsOpen(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, [country, query, openOnly]);

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
          <div className="space-y-1">
            <Label htmlFor="payment-point-search">Area or shop name</Label>
            <Popover
              open={suggestionsOpen && suggestions.length > 0}
              onOpenChange={setSuggestionsOpen}
            >
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    id="payment-point-search"
                    value={query}
                    onChange={(event) => {
                      setIsLoading(true);
                      setQuery(event.target.value);
                      setSelected(null);
                      setSuggestionsOpen(true);
                    }}
                    onFocus={() => setSuggestionsOpen(true)}
                    role="combobox"
                    aria-expanded={suggestionsOpen && suggestions.length > 0}
                    aria-controls="payment-point-suggestions"
                    aria-autocomplete="list"
                    placeholder={
                      country === "ca" ? "e.g. Toronto" : "e.g. Brooklyn"
                    }
                    className="pr-10"
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => {
                        setIsLoading(true);
                        setQuery("");
                        setSelected(null);
                        setSuggestionsOpen(false);
                      }}
                      className="absolute cursor-pointer inset-y-0 right-0 flex w-10 items-center justify-center text-ink/50 transition-colors hover:text-ink"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent
                id="payment-point-suggestions"
                role="listbox"
                className="p-1"
              >
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    role="option"
                    aria-selected={selected === suggestion.id}
                    onClick={() => chooseSuggestion(suggestion)}
                    className="w-full rounded-sm px-3 py-3 text-left hover:bg-sky focus:bg-sky focus:outline-none"
                  >
                    <span className="block font-medium">{suggestion.name}</span>
                    <span className="block text-xs text-ink/60">
                      {suggestion.address}
                    </span>
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center justify-between gap-3">
            <label className="items-center gap-2 text-sm hidden">
              <input
                type="checkbox"
                checked={openOnly}
                onChange={(e) => {
                  setIsLoading(true);
                  setOpenOnly(e.target.checked);
                }}
              />{" "}
              Open now
            </label>
            <button
              onClick={locate}
              className="rounded-full hidden  border border-ink px-4 py-1.5 text-sm font-medium hover:bg-sky"
            >
              Use my location
            </button>
          </div>
          {geoError && (
            <p role="alert" className="text-sm text-red-700">
              We could not get your location. Allow access in your browser, or
              search by area.
            </p>
          )}
        </div>

        <ul
          className="mt-5 max-h-112 divide-y divide-line overflow-auto border-y border-line"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <li aria-label="Loading payment points" className="space-y-4 p-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="animate-pulse space-y-2">
                  <div className="h-5 w-2/3 rounded bg-ink/10" />
                  <div className="h-4 w-full rounded bg-ink/10" />
                  <div className="h-4 w-1/2 rounded bg-ink/10" />
                </div>
              ))}
            </li>
          ) : (
            list.length === 0 && (
              <li className="py-6 text-sm">
                No payment points match your entry. Try a different area or shop
                name.
              </li>
            )
          )}
          {!isLoading &&
            list.map(({ a, d }) => (
              <li key={a.id}>
                <button
                  onClick={() => setSelected(a.id)}
                  aria-pressed={selected === a.id}
                  className={`w-full px-2 py-4 text-left hover:bg-sky/60 cursor-pointer ${
                    selected === a.id ? "bg-sky" : ""
                  }`}
                >
                  <span className="block font-display text-lg font-semibold">
                    {a.name}
                  </span>
                  <span className="block text-sm text-ink/80">{a.address}</span>
                  <span className="mt-1 block text-sm">
                    <span
                      className={
                        isOpen(a) ? "font-medium text-royal" : "text-ink/60"
                      }
                    >
                      {hour === null ? "" : isOpen(a) ? "Open" : "Closed"}
                    </span>{" "}
                    {a.opens}:00 to {a.closes}:00
                    {d !== null && ` · ${d.toFixed(1)} km away`}
                  </span>
                </button>
                {selected === a.id && (
                  <a
                    className="mb-3 ml-2 inline-block text-sm underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${a.lat},${a.lng}`}
                  >
                    Get directions
                  </a>
                )}
              </li>
            ))}
        </ul>
      </div>

      <div className="h-112 bg-sky lg:h-144">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "DEMO_MAP_ID"}
              defaultCenter={CENTERS[country]}
              defaultZoom={11}
              gestureHandling="greedy"
              disableDefaultUI
            >
              <PanTo target={center} zoom={active ? 15 : undefined} />
              {list.map(({ a }) => (
                <AdvancedMarker
                  key={a.id}
                  position={a}
                  title={a.name}
                  onClick={() => setSelected(a.id)}
                >
                  <Pin
                    background={selected === a.id ? "#F0B03A" : "#0A2540"}
                    borderColor="#0A2540"
                    glyphColor="#fff"
                  />
                </AdvancedMarker>
              ))}
              {me && (
                <AdvancedMarker position={me} title="You are here">
                  <Pin background="#1D5FC7" glyphColor="#fff" />
                </AdvancedMarker>
              )}
            </Map>
          </APIProvider>
        ) : (
          <div className="flex h-full items-center p-8 text-sm">
            Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local to show the map.
            The list still works without it.
          </div>
        )}
      </div>
    </div>
  );
}
