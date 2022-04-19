import { MODS_ICONS } from "../constants/icons";

function makeRoutingList({ permissions }) {
  return [
    {
      navName: "dashboard",
      navLink: "/dashboard",
      icon: MODS_ICONS.dashboard,
      active: true,
    },
    {
      navName: "properties",
      navLink: "/properties",
      icon: MODS_ICONS.properties,
      active: true,
    },
    {
      navName: "people",
      navLink: "/people",
      icon: MODS_ICONS.people,
      active: true,
    },
    {
      navName: "orders",
      navLink: "/orders",
      icon: MODS_ICONS.orders,
      active: true,
    },
    {
      navName: "accounting",
      navLink: "/accounting",
      icon: MODS_ICONS.accounting,
      active: true,
    },
    {
      navName: "communication",
      navLink: "/communication",
      icon: MODS_ICONS.communication,
      active: true,
    },
    {
      navName: "services",
      navLink: "/services",
      icon: MODS_ICONS.services,
      active: true,
    },
    {
      navName: "settings",
      navLink: "/settings",
      icon: MODS_ICONS.settings,
      active: true,
    },
    {
      navName: "help",
      navLink: "/help",
      icon: MODS_ICONS.help,
      active: true,
    },
  ];
}

export default makeRoutingList;
