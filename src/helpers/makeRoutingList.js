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
      active: propertiesPerms.access,
    },
    {
      navName: "people",
      icon: MODS_ICONS.people,
      active: peoplePerms.access,
      subItems: [
        {
          navName: "teamMember",
          navLink: "/people/team",
          active: true,
        },
        {
          navName: "customers",
          navLink: "/people/customers",
          active: true,
        },
      ],
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
      subItems: [
        {
          navName: "wallet",
          navLink: "/accounting/wallet",
          active: true,
        },
        {
          navName: "invoices",
          navLink: "/accounting/invoices",
          active: true,
        },
        {
          navName: "transactions",
          navLink: "/accounting/transactions",
          active: true,
        },
      ],
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
      icon: MODS_ICONS.settings,
      active: settingPerms.access,
      subItems: [
        {
          navName: "personalInformation",
          navLink: "/settings/personal",
          active: true,
        },
        {
          navName: "notifications",
          navLink: "/settings/notifications",
          active: true,
        },
        {
          navName: "rolesAndPermissions",
          navLink: "/settings/roles",
          active: true,
        },
        {
          navName: "servicesSettings",
          navLink: "/settings/services-settings",
          active: true,
        },
      ],
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
