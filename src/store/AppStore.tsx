import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { createSeed, DEFAULT_FILTERS } from "../data/seed";
import { CATEGORIES } from "../data/catalog";
import type {
  AppData,
  Booking,
  BookingStatus,
  CategoryId,
  Filters,
  Listing,
  Message,
} from "../types";

const KEY = "equipped-demo-v2";

function load(): AppData {
  const seed = createSeed();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppData;
      const custom = (parsed.listings ?? []).filter((l) => l.id.startsWith("l-"));
      return {
        ...seed,
        bookings: parsed.bookings ?? seed.bookings,
        threads: parsed.threads ?? seed.threads,
        messages: parsed.messages ?? seed.messages,
        favorites: parsed.favorites ?? seed.favorites,
        recentlyViewed: parsed.recentlyViewed ?? seed.recentlyViewed,
        listings: [...custom, ...seed.listings],
        filters: { ...DEFAULT_FILTERS, ...parsed.filters },
      };
    }
  } catch {
    /* ignore */
  }
  return seed;
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function nights(start: string, end: string) {
  const a = new Date(start + "T00:00:00");
  const b = new Date(end + "T00:00:00");
  return Math.max(1, Math.round((b.getTime() - a.getTime()) / 86400000));
}

type Store = AppData & {
  me: AppData["users"][number];
  filteredListings: Listing[];
  toggleFavorite: (id: string) => void;
  viewListing: (id: string) => void;
  setFilters: (patch: Partial<Filters>) => void;
  resetFilters: () => void;
  sendMessage: (threadId: string, text: string) => void;
  openThread: (listingId: string, otherUserId: string) => string;
  createBooking: (input: {
    listingId: string;
    start: string;
    end: string;
    pickupTime: string;
    returnTime: string;
  }) => Booking;
  setBookingStatus: (id: string, status: BookingStatus) => void;
  addListing: (input: {
    title: string;
    category: CategoryId;
    daily: number;
    delivery: boolean;
  }) => Listing;
  resetDemo: () => void;
};

const Ctx = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => load());

  const persist = useCallback((next: AppData) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    flushSync(() => setData(next));
  }, []);

  const me = data.users.find((u) => u.id === data.currentUserId) ?? data.users[0];

  const filteredListings = useMemo(() => {
    const q = data.filters.query.trim().toLowerCase();
    return data.listings
      .filter((l) => (data.filters.category ? l.category === data.filters.category : true))
      .filter((l) => l.daily >= data.filters.minPrice && l.daily <= data.filters.maxPrice)
      .filter((l) => (data.filters.deliveryOnly ? l.delivery : true))
      .filter((l) => l.miles <= data.filters.distance)
      .filter((l) =>
        q
          ? l.title.toLowerCase().includes(q) ||
            l.category.includes(q) ||
            l.description.toLowerCase().includes(q)
          : true
      )
      .slice()
      .sort((a, b) => a.miles - b.miles);
  }, [data.listings, data.filters]);

  const toggleFavorite = (id: string) => {
    persist({
      ...data,
      favorites: data.favorites.includes(id)
        ? data.favorites.filter((x) => x !== id)
        : [...data.favorites, id],
    });
  };

  const viewListing = (id: string) => {
    persist({
      ...data,
      recentlyViewed: [id, ...data.recentlyViewed.filter((x) => x !== id)].slice(0, 8),
    });
  };

  const setFilters = (patch: Partial<Filters>) => {
    persist({ ...data, filters: { ...data.filters, ...patch } });
  };

  const resetFilters = () => persist({ ...data, filters: { ...DEFAULT_FILTERS } });

  const sendMessage = (threadId: string, text: string) => {
    const msg: Message = {
      id: uid("m"),
      threadId,
      fromId: data.currentUserId,
      text,
      at: new Date().toISOString(),
    };
    persist({
      ...data,
      messages: [...data.messages, msg],
      threads: data.threads.map((t) =>
        t.id === threadId ? { ...t, preview: text, updatedAt: msg.at } : t
      ),
    });
  };

  const openThread = (listingId: string, otherUserId: string) => {
    const existing = data.threads.find(
      (t) =>
        t.listingId === listingId &&
        t.participantIds.includes(data.currentUserId) &&
        t.participantIds.includes(otherUserId)
    );
    if (existing) return existing.id;
    const id = uid("t");
    persist({
      ...data,
      threads: [
        {
          id,
          listingId,
          participantIds: [data.currentUserId, otherUserId],
          preview: "New conversation",
          updatedAt: new Date().toISOString(),
        },
        ...data.threads,
      ],
    });
    return id;
  };

  const createBooking = (input: {
    listingId: string;
    start: string;
    end: string;
    pickupTime: string;
    returnTime: string;
  }) => {
    const listing = data.listings.find((l) => l.id === input.listingId)!;
    const days = nights(input.start, input.end);
    const booking: Booking = {
      id: uid("b"),
      listingId: input.listingId,
      renterId: data.currentUserId,
      start: input.start,
      end: input.end,
      pickupTime: input.pickupTime,
      returnTime: input.returnTime,
      status: "pending",
      total: days * listing.daily,
      address: "123 Main St, Portland, OR",
    };
    persist({ ...data, bookings: [booking, ...data.bookings] });
    return booking;
  };

  const setBookingStatus = (id: string, status: BookingStatus) => {
    persist({
      ...data,
      bookings: data.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    });
  };

  const addListing = (input: {
    title: string;
    category: CategoryId;
    daily: number;
    delivery: boolean;
  }) => {
    const listing: Listing = {
      id: uid("l"),
      title: input.title,
      category: input.category,
      photo: CATEGORIES.find((c) => c.id === input.category)?.photo ?? "/images/listings/mini-excavator.jpg",
      daily: input.daily,
      weekly: Math.round(input.daily * 3.4),
      monthly: input.daily * 10,
      deposit: input.daily > 200 ? 500 : 150,
      specs: [
        { label: "Listed by", value: "You" },
        { label: "City", value: "Portland" },
        { label: "Delivery", value: input.delivery ? "Available" : "Pickup only" },
        { label: "Status", value: "New" },
      ],
      delivery: input.delivery,
      lat: 45.512 + Math.random() * 0.02,
      lng: -122.68 + Math.random() * 0.02,
      hostId: data.currentUserId,
      rating: 5,
      reviewCount: 0,
      miles: 0.2,
      description: "Just listed on equipped.",
      reviews: [],
    };
    persist({ ...data, listings: [listing, ...data.listings] });
    return listing;
  };

  const resetDemo = () => {
    const seed = createSeed();
    persist(seed);
  };

  const value: Store = {
    ...data,
    me,
    filteredListings,
    toggleFavorite,
    viewListing,
    setFilters,
    resetFilters,
    sendMessage,
    openThread,
    createBooking,
    setBookingStatus,
    addListing,
    resetDemo,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore");
  return ctx;
}

export function listingById(listings: Listing[], id: string) {
  return listings.find((l) => l.id === id);
}

export function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function formatWhen(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / 1000;
  if (diff < 3600) return `${Math.max(1, Math.round(diff / 60))}m`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h`;
  if (diff < 172800) return "1d";
  return `${Math.round(diff / 86400)}d`;
}

export function nightsBetween(start: string, end: string) {
  return nights(start, end);
}
