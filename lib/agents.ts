export type Agent = {
  id: string; country: "us" | "ca"; name: string; address: string;
  lat: number; lng: number; opens: number; closes: number;
};

// Sample data. Replace with your database or API.
export const agents: Agent[] = [
  { id: "us1", country: "us", name: "Brooklyn Corner Market", address: "Brooklyn, NY", lat: 40.6782, lng: -73.9442, opens: 7, closes: 22 },
  { id: "us2", country: "us", name: "Midtown Pharmacy", address: "Midtown, New York, NY", lat: 40.7549, lng: -73.984, opens: 8, closes: 21 },
  { id: "us3", country: "us", name: "Queens Convenience", address: "Queens, NY", lat: 40.7282, lng: -73.7949, opens: 6, closes: 23 },
  { id: "ca1", country: "ca", name: "Downtown Variety", address: "Downtown Toronto, ON", lat: 43.6532, lng: -79.3832, opens: 8, closes: 22 },
  { id: "ca2", country: "ca", name: "Scarborough Pharmacy", address: "Scarborough, ON", lat: 43.7731, lng: -79.2578, opens: 9, closes: 21 },
  { id: "ca3", country: "ca", name: "Mississauga Mart", address: "Mississauga, ON", lat: 43.589, lng: -79.6441, opens: 7, closes: 23 },
];
