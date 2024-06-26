import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";
import ListingPage from "./pages/ListingPage";
import FavoritesPage from "./pages/FavoritesPage";
import ReservationsPage from "./pages/ReservationsPage";
import MylistingsPage from "./pages/MylistingsPage";
import Myaccount from "./pages/Myaccount";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/listing/:id" element={<ListingPage />}></Route>
        <Route
          path="/favorites/:userId"
          element={<FavoritesPage />}
        ></Route>
        <Route
          path="/reservations"
          element={<ReservationsPage />}
        ></Route>
        <Route
          path="/mylistings"
          element={<MylistingsPage />}
        ></Route>
        <Route path="/myaccount" element={<Myaccount />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
