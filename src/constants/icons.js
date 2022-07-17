import {
  mdiChartBar,
  mdiOrderBoolDescendingVariant,
  mdiAccountSupervisorOutline,
  mdiFileDocumentOutline,
  mdiSwapHorizontalBold,
  mdiVolumeMedium,
  mdiTools,
  mdiCogs,
  mdiHelpCircleOutline,
} from "@mdi/js";

import notif_default from "../assets/notifications/default.svg";

export const MODS_ICONS = {
  dashboard: mdiChartBar,
  properties: mdiOrderBoolDescendingVariant,
  people: mdiAccountSupervisorOutline,
  orders: mdiFileDocumentOutline,
  accounting: mdiSwapHorizontalBold,
  communication: mdiVolumeMedium,
  services: mdiTools,
  settings: mdiCogs,
  help: mdiHelpCircleOutline,
};

export const NOTIF_ICONS = {
  default: notif_default,
};
