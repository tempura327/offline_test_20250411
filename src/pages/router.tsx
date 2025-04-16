import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';

const Layout = lazy(() => import('@/components/Layout.tsx'));
const Home = lazy(() => import('@/pages/Home.tsx'));
const OrderHistory = lazy(() => import('@/pages/OrderHistory.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/history',
        element: <OrderHistory />,
      },
    ],
  },
]);

export default router;
