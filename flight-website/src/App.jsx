import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./index.css"; // Default CSS for all pages
import "./food.css";  // Special CSS for food-related pages

import Background from "./Components/Background/Background";
import Navbar from "./Components/Navbar/Navbar";  // For Flight app
import Navbar1 from "./Components/Navbar1/Navbar1"; // For Meals app
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import Login from "./Components/LoginForm";
import Moments from "./pages/Moments";
import Chatroom from "./pages/ChatRoom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";

const App = () => {
  let heroData = [
    { text1: "Cravings at 30,000 feet?", text2: "We’ve got you covered." },
    { text1: "Escape into", text2: "stories while you soar." },
    { text1: "Connect and", text2: "share, even in the air." },
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seatNumber, setSeatNumber] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((count) => (count === 2 ? 0 : count + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContent
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      setSeatNumber={setSeatNumber}
      heroData={heroData}
      heroCount={heroCount}
      setHeroCount={setHeroCount}
      playStatus={playStatus}
      setPlayStatus={setPlayStatus}
      seatNumber={seatNumber}
    />
  );
};

const AppContent = ({
  isLoggedIn,
  setIsLoggedIn,
  setSeatNumber,
  heroData,
  heroCount,
  setHeroCount,
  playStatus,
  setPlayStatus,
  seatNumber,
}) => {
  const location = useLocation();
  const isFoodPage = location.pathname.startsWith("/home") || location.pathname.startsWith("/cart");

  // Apply CSS dynamically
  useEffect(() => {
    if (isFoodPage) {
      document.body.classList.add("food-style");
    } else {
      document.body.classList.remove("food-style");
    }
  }, [isFoodPage]);

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setSeatNumber={setSeatNumber} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <>
          {/* ✅ Show Flight Navbar & Background on Flight Home */}
          {location.pathname === "/" && (
            <>
              <Background playStatus={playStatus} heroCount={heroCount} />
              <Navbar />
            </>
          )}

          {/* ✅ Show Meals Navbar inside the wrapper */}
          {isFoodPage && (
            <div className="food-app">
              <Navbar1 />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
          )}

          {/* ✅ Flight-related Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <Hero
                  setPlayStatus={setPlayStatus}
                  heroData={heroData[heroCount]}
                  heroCount={heroCount}
                  setHeroCount={setHeroCount}
                  playStatus={playStatus}
                />
              }
            />
            <Route path="/moments" element={<Moments seatNumber={seatNumber} />} />
            <Route path="/chatroom" element={<Chatroom seatNumber={seatNumber} />} />
          </Routes>

          {/* ✅ Show Footer outside the wrapper for proper styling */}
          {isFoodPage && <Footer />}
        </>
      )}
    </div>
  );
};

export default App;
