import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAuthed = Boolean(localStorage.getItem('auth_token'));

  if (!isAuthed) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}


