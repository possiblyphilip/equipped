import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppStoreProvider } from "./store/AppStore";
import { PhoneShell } from "./components/PhoneShell";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { AllEquipmentPage } from "./pages/AllEquipmentPage";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { AvailabilityPage } from "./pages/AvailabilityPage";
import { FiltersPage } from "./pages/FiltersPage";
import { MyListingsPage } from "./pages/MyListingsPage";
import { ListToolPage } from "./pages/ListToolPage";
import { InboxPage } from "./pages/InboxPage";
import { ThreadPage } from "./pages/ThreadPage";
import { BookingsPage } from "./pages/BookingsPage";
import { BookingDetailPage } from "./pages/BookingDetailPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  return (
    <AppStoreProvider>
      <HashRouter>
        <Routes>
          <Route element={<PhoneShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/listings" element={<AllEquipmentPage />} />
            <Route path="/listings/:id" element={<ListingDetailPage />} />
            <Route path="/listings/:id/availability" element={<AvailabilityPage />} />
            <Route path="/filters" element={<FiltersPage />} />
            <Route path="/my-listings" element={<MyListingsPage />} />
            <Route path="/list" element={<ListToolPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/inbox/:threadId" element={<ThreadPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/bookings/:id" element={<BookingDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppStoreProvider>
  );
}
