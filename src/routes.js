import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Home /> },
    ]
  }
];

export default routes;
