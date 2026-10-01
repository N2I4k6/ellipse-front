import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import { selectIsAuthenticated } from '@/entities/User';
import { ROUTES } from '@/shared/config/routes';

interface AuthGuardProps {
  mode: 'private' | 'public';
}

export const AuthGuard = ({ mode }: AuthGuardProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (mode === 'private' && !isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (mode === 'public' && isAuthenticated) {
    return <Navigate to={ROUTES.root} replace />;
  }

  return <Outlet />;
};