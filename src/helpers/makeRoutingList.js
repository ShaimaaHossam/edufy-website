import { MODS_ICONS } from "../constants/icons";

function makeRoutingList({ permissions }) {
  const {
    dashboard: dashboardPerms,
    property: propertiesPerms,
    people: peoplePerms,
    order: orderPerms,
    setting: settingPerms,
  } = permissions;

  return [
    {
      navName: "dashboard",
      navLink: "/dashboard",
      icon: MODS_ICONS.dashboard,
      active: dashboardPerms.access,
    },
    {
      navName: "properties",
      navLink: "/properties",
      icon: MODS_ICONS.properties,
      active: propertiesPerms,
    },
    {
      navName: "people",
      navLink: "/people",
      icon: MODS_ICONS.people,
      active: peoplePerms.access,
    },
    {
      navName: "orders",
      navLink: "/orders",
      icon: MODS_ICONS.orders,
      active: orderPerms.access,
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
      active: false,
    },
    {
      navName: "services",
      navLink: "/services",
      icon: MODS_ICONS.services,
      active: false,
    },
    {
      navName: "settings",
      navLink: "/settings",
      icon: MODS_ICONS.settings,
      active: settingPerms.access,
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
