export const WALLET_TYPES = { unlimited: 1, restricted: 2 };

export const USER_ROLES = {
  admin: "admin",
  areaManager: "Area Manager",
  propertyManager: "Property Manager",
  accountant: "Accountant",
  unitOwner: "Unit Owner",
  unitTenant: "Unit Tenant",
};

export const USER_TYPES = {
  customer: "customer",
  teamMember: "team_member",
};

export const UNIT_CUSTOMER_TYPES = { owner: 1, tenant: 2 };

export const ORDER_TYPES = {
  maintenance: "maintenance",
  cleaning: "cleaning",
};

export const ORDER_STATUSES = {
  created: "Created",
  confirmed: "Confirmed",
  assigned: "SPAssigned",
  in_progress: "InProgress",
  pending: "Pending",
  sp_done: 'SPDone',
  completed: "Completed",
  canceled: "Canceled",
};

export const VAT_AMOUNT = 0.15;
