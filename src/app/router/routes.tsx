import { createBrowserRouter, Navigate } from 'react-router-dom';

import { App } from '@/app/App';
import { AuthGuard } from '@/app/router/guards/AuthGuard';
import { ROUTES } from '@/shared/config/routes';
import { publicRoutes } from '@/app/router/modules/public.routes';
import { privateRoutes } from '@/app/router/modules/private.routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <AuthGuard mode="private" />,
    children: [
      {
        element: <App />,
        children: privateRoutes,
      },
    ],
  },
  {
    element: <AuthGuard mode="public" />,
    children: publicRoutes,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.root} replace />,
  },
]);