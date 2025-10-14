import {
  ChartAreaIcon,
  CircleQuestionMarkIcon,
  InfoIcon,
  LayoutPanelTopIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  Trash2Icon,
  UtensilsCrossedIcon,
} from "lucide-react";
export const dashboardNavs = {
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: LayoutPanelTopIcon,
    },

    {
      title: "Orders",
      url: "/orders",
      icon: ShoppingCartIcon,
    },
    {
      title: "Products",
      url: "/products",
      icon: UtensilsCrossedIcon,
    },
    {
      title: "About",
      url: "/about",
      icon: InfoIcon,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartAreaIcon,
    },
    {
      title: "Activity",
      url: "/activity",
      icon: ListIcon,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash2Icon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "/contact-us",
      icon: CircleQuestionMarkIcon,
    },
    {
      title: "Search",
      url: "/search",
      icon: SearchIcon,
    },
  ],
};
