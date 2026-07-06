import { useState } from "react";
import { USERS } from "./data/users";
import { INIT_PRODUCTS } from "./data/products";
import { INIT_ORDERS } from "./data/orders";
import { COURIERS } from "./data/couriers";

import LoginPage from "./pages/LoginPage";
import CustomerPortal from "./pages/CustomerPortal";
import FarmerPortal from "./pages/FarmerPortal";
import AdminPortal from "./pages/AdminPortal";
import CourierPortal from "./pages/CourierPortal";

// ══════════════════════════════════════════════════════════════
// 🌾 KrishiBazar — Root App
// Routes the logged-in user to one of five portals:
// Customer · Farmer · Admin · Courier (+ shared LoginPage)
// All state here is in-memory demo state — swap for a real
// backend/API when moving this past the prototype stage.
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [users, setUsers] = useState(USERS);
  const [couriers, setCouriers] = useState(COURIERS);

  const logout = () => setUser(null);

  if (!user) return <LoginPage onLogin={setUser} dark={dark} />;

  if (user.role === "admin")
    return (
      <AdminPortal
        users={users}
        setUsers={setUsers}
        products={products}
        setProducts={setProducts}
        orders={orders}
        setOrders={setOrders}
        couriers={couriers}
        setCouriers={setCouriers}
        dark={dark}
        setDark={setDark}
        onLogout={logout}
      />
    );

  if (user.role === "farmer") {
    const farmerData = users.find((u) => u.id === user.id) || user;
    return (
      <FarmerPortal
        user={farmerData}
        products={products}
        setProducts={setProducts}
        orders={orders}
        dark={dark}
        setDark={setDark}
        onLogout={logout}
      />
    );
  }

  if (user.role === "courier") {
    const courierData = couriers.find((c) => c.userId === user.id) || couriers[0];
    return (
      <CourierPortal
        user={user}
        courier={courierData}
        couriers={couriers}
        setCouriers={setCouriers}
        orders={orders}
        setOrders={setOrders}
        products={products}
        dark={dark}
        setDark={setDark}
        onLogout={logout}
      />
    );
  }

  return (
    <CustomerPortal
      user={user}
      products={products}
      orders={orders}
      setOrders={setOrders}
      dark={dark}
      setDark={setDark}
      lang={lang}
      setLang={setLang}
      onLogout={logout}
    />
  );
}
