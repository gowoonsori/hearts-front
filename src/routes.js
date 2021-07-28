import DashboardLayout from './components/layout/DashboardLayout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Likes from './pages/Likes';
import Edit from './pages/Edit';
import LogOut from './pages/Logout';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Home /> },
      { path: '/likes', element: <Likes /> },
      { path: '/profile', element: <Profile /> },
      { path: '/logout', element: <LogOut /> },
      { path: '/edit', element: <Edit /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
