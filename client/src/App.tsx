import React from "react";
import { Routes, Route } from "react-router-dom";
import SharedDashboard from "./pages/Sharedview";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Logg from "./pages/Logg";

function App() {
  return (
    <>
     <Routes>
  <Route path="/" element={<Home />} />

<Route path="/share/:hash" element={<SharedDashboard />} />

  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/logg" element={<Logg />} />

  <Route path="*" element={<Error />} />
</Routes>

    </>
  );
}

export default App;
