import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';

const Home = lazy(() => import('./Home.tsx'));
const History = lazy(() => import('./History.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/history',
    element: <History />,
  },
]);

export default router;
