import { ROUTES } from '@routes/routes-config';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const Layout = lazy(() => import('@layouts/layout'));
const CardDetailPage = lazy(() => import('@pages/card/card-datail'));
const LoginPage = lazy(() => import('@pages/login/login-page'));
const SignupPage = lazy(() => import('@pages/signup/signup-page'));
const WorryPage = lazy(() => import('@pages/worry/worry-page'));
const RecordPage = lazy(() => import('@pages/record/record-page'));
const MainPage = lazy(() => import('@pages/main/main-page'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.LOGIN} replace />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: ROUTES.MAIN,
        element: <MainPage />,
      },
      {
        path: ROUTES.WORRY,
        element: <WorryPage />,
      },
      {
        path: ROUTES.RECORD,
        element: <RecordPage />,
      },
      {
        path: ROUTES.CARD_DETAIL(),
        element: <CardDetailPage />,
      },
    ],
  },
]);
