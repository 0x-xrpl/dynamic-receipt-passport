export type PassportStats = {
  level: number;
  totalSpend: number;
  totalVat: number;
  citiesVisited: number;
  storesCount: number;
  xpProgress: number;
  owner: string;
  wallet: string;
  favoriteCity: string;
  totalPurchases: number;
  heroGradient: string;
};

export type Purchase = {
  id: string;
  store: string;
  city: string;
  country: string;
  category: "Food" | "Transport" | "Culture" | "Groceries" | "Wellness" | "Fashion";
  amount: number;
  currency: string;
  vat: number;
  method: "XRP" | "Card";
  memo: string;
  date: string;
  time: string;
  isXrp: boolean;
  icon: string;
  hash: string;
};

export type StampCard = {
  id: string;
  store: string;
  city: string;
  progress: number;
  goal: number;
  benefit: string;
  unlocked: boolean;
  rebateAmount?: number;
  rebateTarget?: number;
  rebateRate?: number;
};

export type StorePin = {
  id: string;
  name: string;
  city: string;
  type: "purchase" | "store";
  lat: number;
  lng: number;
  description: string;
  isNew?: boolean;
  acceptsXrp?: boolean;
  stampBenefit?: string;
  distance?: string;
};

export type CategoryStat = {
  label: string;
  amount: number;
  color: string;
};

export const mockPassport: PassportStats = {
  level: 3,
  totalSpend: 4820,
  totalVat: 690,
  citiesVisited: 4,
  storesCount: 27,
  xpProgress: 0.68,
  owner: "0x-xrpl",
  wallet: "rU2R...8X9Q",
  favoriteCity: "Paris",
  totalPurchases: 64,
  heroGradient:
    "bg-[radial-gradient(circle_at_top,_rgba(150,120,255,0.8),_rgba(32,8,56,0.95))]",
};

export const mockPurchases: Purchase[] = [
  {
    id: "p-001",
    store: "Atelier Lumière",
    city: "Paris",
    country: "France",
    category: "Culture",
    amount: 86,
    currency: "EUR",
    vat: 12,
    method: "XRP",
    memo: "Immersive Monet evening",
    date: "2025-11-12",
    time: "19:40",
    isXrp: true,
    icon: "🎨",
    hash: "0x9bc12a4fbd3498aa71234f9012ab76c9",
  },
  {
    id: "p-002",
    store: "Embarqué Café",
    city: "Paris",
    country: "France",
    category: "Food",
    amount: 22.5,
    currency: "EUR",
    vat: 2.4,
    method: "Card",
    memo: "Residency breakfast",
    date: "2025-11-11",
    time: "08:10",
    isXrp: false,
    icon: "🥐",
    hash: "0xb881f334acf81239ff10ed6aacc41f8a",
  },
  {
    id: "p-003",
    store: "XRPL Commons Studio Store",
    city: "Paris",
    country: "France",
    category: "Fashion",
    amount: 245,
    currency: "EUR",
    vat: 49,
    method: "XRP",
    memo: "Resident merch + hardware wallet",
    date: "2025-11-09",
    time: "14:25",
    isXrp: true,
    icon: "🧥",
    hash: "0xc34b11a0fd77fabcd8891f23b90a1d23",
  },
  {
    id: "p-004",
    store: "Veló Electrique",
    city: "Lyon",
    country: "France",
    category: "Transport",
    amount: 48,
    currency: "EUR",
    vat: 6.5,
    method: "Card",
    memo: "eBike day rental",
    date: "2025-11-03",
    time: "11:03",
    isXrp: false,
    icon: "🚲",
    hash: "0xd12b234fae6712bcaf89123209bcaa67",
  },
  {
    id: "p-005",
    store: "Galerie Sensorielle",
    city: "Brussels",
    country: "Belgium",
    category: "Culture",
    amount: 65,
    currency: "EUR",
    vat: 7.8,
    method: "XRP",
    memo: "XR art meetup ticket",
    date: "2025-10-28",
    time: "20:20",
    isXrp: true,
    icon: "🌀",
    hash: "0xa12b2f45e67129bcefa19002ab1d78fe",
  },
  {
    id: "p-006",
    store: "Marché Vivant",
    city: "Paris",
    country: "France",
    category: "Groceries",
    amount: 58.4,
    currency: "EUR",
    vat: 3.6,
    method: "Card",
    memo: "Weekly produce haul",
    date: "2025-10-26",
    time: "10:15",
    isXrp: false,
    icon: "🥬",
    hash: "0xe31cd2ab1199de34fdd88aab7781cca0",
  },
];

export const categoryStats: CategoryStat[] = [
  { label: "Food", amount: 680, color: "from-rose-400/80 to-orange-300/70" },
  { label: "Transport", amount: 410, color: "from-sky-400/80 to-cyan-300/70" },
  { label: "Culture", amount: 920, color: "from-violet-500/80 to-indigo-400/70" },
  { label: "Groceries", amount: 370, color: "from-emerald-400/80 to-lime-300/70" },
];

export const monthlySpend = [
  { month: "Jul", amount: 1120 },
  { month: "Aug", amount: 980 },
  { month: "Sep", amount: 1260 },
  { month: "Oct", amount: 1380 },
  { month: "Nov", amount: 920 },
];

export const topCities = [
  { label: "Paris", amount: 3200 },
  { label: "Lyon", amount: 680 },
  { label: "Brussels", amount: 480 },
];

export const topStores = [
  { label: "XRPL Commons Studio Store", amount: 780 },
  { label: "Atelier Lumière", amount: 402 },
  { label: "Embarqué Café", amount: 240 },
];

export const mockStamps: StampCard[] = [
  {
    id: "s-001",
    store: "Cafe de XRPL",
    city: "Paris",
    progress: 7,
    goal: 10,
    benefit: "Free specialty drink",
    unlocked: false,
  },
  {
    id: "s-002",
    store: "Atelier Lumière",
    city: "Paris",
    progress: 5,
    goal: 5,
    benefit: "Private gallery hour",
    unlocked: true,
  },
  {
    id: "s-003",
    store: "Veló Electrique",
    city: "Lyon",
    progress: 3,
    goal: 6,
    benefit: "25% off weekend rental",
    unlocked: false,
  },
];

export const storePins: StorePin[] = [
  {
    id: "pin-1",
    name: "Embarqué Café",
    city: "Paris",
    type: "purchase",
    lat: 48.8566,
    lng: 2.3522,
    description: "Residency breakfast spot",
    acceptsXrp: true,
    stampBenefit: "5th pastry free",
  },
  {
    id: "pin-2",
    name: "Cafe de XRPL",
    city: "Paris",
    type: "store",
    lat: 48.8586,
    lng: 2.2945,
    description: "XRPL flagship cafe",
    acceptsXrp: true,
    stampBenefit: "XRPL latte art",
    isNew: true,
    distance: "450m",
  },
  {
    id: "pin-3",
    name: "Galerie Sensorielle",
    city: "Brussels",
    type: "purchase",
    lat: 50.8503,
    lng: 4.3517,
    description: "Immersive XR art",
    acceptsXrp: true,
  },
  {
    id: "pin-4",
    name: "Marché Vivant",
    city: "Paris",
    type: "purchase",
    lat: 48.8666,
    lng: 2.3622,
    description: "Organic farmers market",
    acceptsXrp: false,
  },
  {
    id: "pin-5",
    name: "Veló Electrique",
    city: "Lyon",
    type: "store",
    lat: 45.764,
    lng: 4.8357,
    description: "XRP friendly mobility",
    acceptsXrp: true,
    isNew: true,
    distance: "2.1km",
    stampBenefit: "10th ride free",
  },
];

export const passportMilestones = [
  {
    title: "Reached Level 3",
    date: "Mar 10",
    description: "Unlocked holographic layer upgrade",
  },
  {
    title: "Visited 4 cities",
    date: "Mar 02",
    description: "Paris, Lyon, Brussels, Amsterdam",
  },
  {
    title: "Benefit unlocked",
    date: "Feb 25",
    description: "Cafe de XRPL VIP tasting",
  },
];
