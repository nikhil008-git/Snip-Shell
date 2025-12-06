import { Routes, Route } from "react-router-dom";
import SharedDashboard from "./pages/Sharedview";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import Error from "./pages/Error";
import ProtectedRoute from "./lib/ProtectedRoute";
// {/* <Navigate to ="">* is a component that renders nothing and redirects to the specified path</Navigate> */} and naviagate("/login") and useNavigate is a hook that returns a function that lets you navigate programmatically.
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/share/:hash" element={<SharedDashboard />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
