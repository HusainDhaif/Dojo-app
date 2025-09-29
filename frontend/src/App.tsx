import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default shows SignUp directly */}
        <Route path="/" element={<SignUp />} />

        {/* Public auth pages */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />

        {/* Example protected routes (placeholders) */}
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center text-gray-800">Events (protected)</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/training"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center text-gray-800">Training (protected)</div>
            </ProtectedRoute>
          }
        />

        {/* Fallback to SignUp */}
        <Route path="*" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}


