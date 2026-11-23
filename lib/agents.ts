export type Agent = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  opens: number;
  closes: number;
};

// Sample data. Replace with your database or API.
export const agents: Agent[] = [
  {
    id: "1",
    name: "Bodija Market Cash Desk",
    address: "Bodija Market, Ibadan",
    lat: 7.43,
    lng: 3.9071,
    opens: 8,
    closes: 19,
  },
  {
    id: "2",
    name: "Dugbe Mini Mart",
    address: "Dugbe, Ibadan",
    lat: 7.3869,
    lng: 3.8919,
    opens: 7,
    closes: 21,
  },
  {
    id: "3",
    name: "Ring Road Pharmacy",
    address: "Ring Road, Ibadan",
    lat: 7.3775,
    lng: 3.9047,
    opens: 8,
    closes: 22,
  },
  {
    id: "4",
    name: "Challenge Pay Point",
    address: "Challenge, Ibadan",
    lat: 7.3586,
    lng: 3.8741,
    opens: 9,
    closes: 18,
  },
  {
    id: "5",
    name: "Mokola Super Store",
    address: "Mokola, Ibadan",
    lat: 7.401,
    lng: 3.889,
    opens: 8,
    closes: 20,
  },
  {
    id: "6",
    name: "UI Gate Provisions",
    address: "University of Ibadan Gate",
    lat: 7.4443,
    lng: 3.9,
    opens: 7,
    closes: 23,
  },
];
