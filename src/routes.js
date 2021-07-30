import DashboardLayout from './components/layout/DashboardLayout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Likes from './pages/Likes';
import Edit from './pages/Edit';
import LogOut from './pages/Logout';
import Search from './pages/Search';
import Category from './pages/Category';

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
      { path: '/search', element: <Search /> },
      { path: '/category', element: <Category /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
