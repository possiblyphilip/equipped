import { LISTINGS, USERS } from "./catalog";
import type { AppData, Booking, Message, Thread } from "../types";

export const DEFAULT_FILTERS: AppData["filters"] = {
  category: null,
  maxPrice: 1000,
  minPrice: 0,
  deliveryOnly: false,
  distance: 25,
  query: "",
};

const threads: Thread[] = [
  {
    id: "t-sarah",
    listingId: "cat-303",
    participantIds: ["sarah", "john"],
    preview: "Requesting CAT 303.5E CR Mini…",
    updatedAt: "2026-09-10T08:02:00",
  },
  {
    id: "t-mike",
    listingId: "bigtex-14et",
    participantIds: ["mike", "john"],
    preview: "Is the trailer still available…",
    updatedAt: "2026-09-10T07:40:00",
  },
  {
    id: "t-tom",
    listingId: "stihl-ms261",
    participantIds: ["tom", "john"],
    preview: "Thanks for the quick response!",
    updatedAt: "2026-09-09T18:11:00",
  },
  {
    id: "t-jen",
    listingId: "cat-303",
    participantIds: ["jennifer", "john"],
    preview: "Can you deliver to my job site?",
    updatedAt: "2026-09-08T09:20:00",
  },
  {
    id: "t-david",
    listingId: "honda-hrx",
    participantIds: ["david", "john"],
    preview: "Great equipment, thanks!",
    updatedAt: "2026-09-07T16:00:00",
  },
];

const messages: Message[] = [
  {
    id: "m1",
    threadId: "t-sarah",
    fromId: "sarah",
    text: "Hi John — requesting the CAT 303.5E for a backyard retaining wall Thu–Sat. Can you deliver to SE Division?",
    at: "2026-09-10T07:50:00",
  },
  {
    id: "m2",
    threadId: "t-sarah",
    fromId: "john",
    text: "Yes, I can drop it Thursday 8am. Site needs to be accessible for a 10k rollback.",
    at: "2026-09-10T08:02:00",
  },
  {
    id: "m3",
    threadId: "t-mike",
    fromId: "mike",
    text: "Is the trailer still available this weekend? I have a 3/4 ton with a 2-5/16.",
    at: "2026-09-10T07:40:00",
  },
  {
    id: "m4",
    threadId: "t-tom",
    fromId: "tom",
    text: "Thanks for the quick response!",
    at: "2026-09-09T18:11:00",
  },
  {
    id: "m5",
    threadId: "t-jen",
    fromId: "jennifer",
    text: "Can you deliver to my job site? 123 Main St, Portland.",
    at: "2026-09-08T09:20:00",
  },
  {
    id: "m6",
    threadId: "t-david",
    fromId: "david",
    text: "Great equipment, thanks!",
    at: "2026-09-07T16:00:00",
  },
];

const bookings: Booking[] = [
  {
    id: "b-cat-pending",
    listingId: "cat-303",
    renterId: "sarah",
    start: "2026-09-15",
    end: "2026-09-17",
    pickupTime: "8:00 AM",
    returnTime: "5:00 PM",
    status: "pending",
    total: 700,
    address: "123 Main St, Portland, OR",
  },
  {
    id: "b-trailer",
    listingId: "bigtex-14et",
    renterId: "mike",
    start: "2026-09-10",
    end: "2026-09-12",
    pickupTime: "8:00 AM",
    returnTime: "5:00 PM",
    status: "confirmed",
    total: 150,
    address: "Pickup in Sellwood",
  },
];

export function createSeed(): AppData {
  return {
    users: USERS,
    listings: LISTINGS.map((l) => ({ ...l })),
    bookings: bookings.map((b) => ({ ...b })),
    threads: threads.map((t) => ({ ...t })),
    messages: messages.map((m) => ({ ...m })),
    currentUserId: "john",
    favorites: ["kubota-u35", "honda-eu2200"],
    recentlyViewed: ["cat-303", "bigtex-14et", "stihl-ms261"],
    filters: { ...DEFAULT_FILTERS },
  };
}
