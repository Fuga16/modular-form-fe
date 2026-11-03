import { Navigate, createBrowserRouter } from 'react-router-dom';

import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { ResourceGeneralInfoPage } from '@/pages/ResourceGeneralInfoPage';
import { ResourceOverviewPage } from '@/pages/ResourceOverviewPage';
import { ResourceProjectDetailsPage } from '@/pages/ResourceProjectDetailsPage';
import { ResourceDetailsPage } from '@/pages/ResourcesDetailsPage';
import { ResourcesListPage } from '@/pages/ResourcesListPage';

import { ResourceLayout } from '@/layouts/ResourceLayout/ResourceLayout';

export const router = createBrowserRouter([
  {
    path: '/',
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
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
