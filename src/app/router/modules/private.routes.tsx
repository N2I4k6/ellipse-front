import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import Statistics from '@/pages/Statistics';
import CompaniesPage from '@/pages/Companies';
import Settings from '@/pages/Settings';
import Notifications from '@/pages/Notifications';
import Messages from '@/pages/Messages';

const Calendar = lazy(() => import('@/pages/Calendar'));
const CoverLetterPage = lazy(() => import('@/pages/CoverLetter'));
const Resume = lazy(() => import('@/pages/Resume'));
const Study = lazy(() => import('@/pages/Study'));
const Documentation = lazy(() => import('@/pages/Documentation'));
const DocumentationTopic = lazy(() => import('@/pages/DocumentationTopic'));
const Tests = lazy(() => import('@/pages/Tests'));
const Test = lazy(() => import('@/pages/Test'));

export const privateRoutes: RouteObject[] = [
  { index: true, element: <Statistics /> },
  { path: 'companies', element: <CompaniesPage /> },
  { path: 'settings', element: <Settings /> },
  { path: 'notifications', element: <Notifications /> },
  { path: 'messages', element: <Messages /> },
  { path: 'calendar', element: <Calendar /> },
  { path: 'cover-letter', element: <CoverLetterPage /> },
  { path: 'resume', element: <Resume /> },
  {
    path: 'study',
    children: [
      { index: true, element: <Study /> },
      { path: 'documentation', element: <Documentation /> },
      { path: 'documentation/:id', element: <DocumentationTopic /> },
      { path: 'tests', element: <Tests /> },
      { path: 'tests/:id', element: <Test /> },
      { path: 'general-test', element: <Test /> },
    ],
  },
];