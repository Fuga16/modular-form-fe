import { Navigate, createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { ResourceGeneralInfoPage } from '@/pages/ResourceGeneralInfoPage';
import { ResourceOverviewPage } from '@/pages/ResourceOverviewPage';
import { ResourceProjectDetailsPage } from '@/pages/ResourceProjectDetailsPage';
import { ResourceDetailsPage } from '@/pages/ResourcesDetailsPage';
import { ResourcesListPage } from '@/pages/ResourcesListPage';

import { AuthProvider } from '@/context/AuthProvider';
import { ProtectedLayout } from '@/layouts/ProtectedLayout/ProtectedLayout';
import { ResourceLayout } from '@/layouts/ResourceLayout/ResourceLayout';

export const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '/',
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="/resources"
                replace
              />
            ),
          },
          {
            path: 'resources',
            element: <ResourcesListPage />,
          },
          {
            path: 'resources/:resourceId',
            element: <ResourceLayout />,
            children: [
              {
                index: true,
                element: <ResourceOverviewPage />,
              },
              {
                path: 'general-info',
                element: <ResourceGeneralInfoPage />,
              },
              {
                path: 'project-details',
                element: <ResourceProjectDetailsPage />,
              },
              {
                path: 'details',
                element: <ResourceDetailsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
