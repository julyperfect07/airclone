import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";
import ListingPage from "./pages/ListingPage";
import FavoritesPage from "./pages/FavoritesPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
