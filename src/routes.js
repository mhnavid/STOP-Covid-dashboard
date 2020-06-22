import Dashboard from "./views/Dashboard";
import Reports from "./views/Reports";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-home",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "pe-7s-graph",
    component: Reports,
    layout: "/admin"
  },
  {
    path: "/image-bank",
    name: "Image Bank",
    icon: "pe-7s-star",
    component: "Dashboard",
    layout: "/admin"
  },
  {
    path: "/visualization",
    name: "Visualization",
    icon: "pe-7s-settings",
    component: "Dashboard",
    layout: "/admin"
  },
];

export default dashboardRoutes;
