import Dashboard from "./views/Dashboard";
import Reports from "./views/Reports";
import ImageBank from "./views/ImageBank";
import Visualization from "./views/Visualization";
import PredictiveAnalysis from "./views/PredictiveAnalysis";
import VideoFeeds from "./views/VideoFeeds";

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
    component: ImageBank,
    layout: "/admin"
  },
  {
    path: "/visualization",
    name: "Visualization",
    icon: "pe-7s-settings",
    component: Visualization,
    layout: "/admin"
  },
  {
    path: "/predictive_analysis",
    name: "Predictive Analysis",
    icon: "pe-7s-display1",
    component: PredictiveAnalysis,
    layout: "/admin"
  },
  {
    path: "/video_feeds",
    name: "Video Feeds",
    icon: "pe-7s-film",
    component: VideoFeeds,
    layout: "/admin"
  }
];

export default dashboardRoutes;
