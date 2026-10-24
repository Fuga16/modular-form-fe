import { ResourceLayout } from '@/layouts/ResourceLayout/ResourceLayout'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import { ResourceBasicInfoPage } from '@/pages/ResourceBasicInfoPage'
import { ResourceOverviewPage } from '@/pages/ResourceOverviewPage'
import { ResourceProjectDetailsPage } from '@/pages/ResourceProjectDetailsPage'
import { ResourceDetailsPage } from '@/pages/ResourcesDetailsPage'
import { ResourcesListPage } from '@/pages/ResourcesListPage'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to="/resources" replace />,
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
            path: 'basic-info',
            element: <ResourceBasicInfoPage />,
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
])
