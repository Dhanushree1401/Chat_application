import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Profile from "./components/Profile"; // Import Profile Component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protected Routes - Redirects to login if not authenticated */}
          <Route path="/" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Fallback for any unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

/* ✅ Protected Route Wrapper */
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default App;
