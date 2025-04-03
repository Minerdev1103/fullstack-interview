import React, { useState } from 'react';
import "./App.css";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tickets from "./components/Tickets";

function App() {
  const [cart, setCart] = useState<any[]>([]); // สร้าง state สำหรับ cart
  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Tickets setCart={setCart} />
      <Cart cart={cart} setCart={setCart} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
