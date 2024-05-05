import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";
import ListingPage from "./pages/ListingPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/listing/:id" element={<ListingPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
