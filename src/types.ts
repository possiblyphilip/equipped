export type CategoryId =
  | "excavators"
  | "skid-steers"
  | "trailers"
  | "lawn-garden"
  | "chainsaws"
  | "pressure-washers"
  | "generators"
  | "concrete";

export type Spec = { label: string; value: string };

export type User = {
  id: string;
  name: string;
  shortName: string;
  memberSince: number;
  verified: boolean;
  insured: boolean;
  rating: number;
  reviewCount: number;
  bio: string;
  neighborhood: string;
};

export type Listing = {
  id: string;
  title: string;
  category: CategoryId;
  photo: string;
  daily: number;
  weekly: number;
  monthly: number;
  deposit: number;
  specs: Spec[];
  delivery: boolean;
  lat: number;
  lng: number;
  hostId: string;
  rating: number;
  reviewCount: number;
  miles: number;
  description: string;
  reviews: { author: string; text: string; rating: number }[];
};

export type BookingStatus = "pending" | "confirmed" | "declined" | "completed";

export type Booking = {
  id: string;
  listingId: string;
  renterId: string;
  start: string;
  end: string;
  pickupTime: string;
  returnTime: string;
  status: BookingStatus;
  total: number;
  address: string;
};

export type Thread = {
  id: string;
  listingId: string;
  participantIds: [string, string];
  preview: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  threadId: string;
  fromId: string;
  text: string;
  at: string;
};

export type Filters = {
  category: CategoryId | null;
  maxPrice: number;
  minPrice: number;
  deliveryOnly: boolean;
  distance: number;
  query: string;
};

export type AppData = {
  users: User[];
  listings: Listing[];
  bookings: Booking[];
  threads: Thread[];
  messages: Message[];
  currentUserId: string;
  favorites: string[];
  recentlyViewed: string[];
  filters: Filters;
};
