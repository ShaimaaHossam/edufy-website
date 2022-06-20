export const WALLET_TYPES = { unlimited: 1, restricted: 2 };

export const USER_ROLES = {
  admin: "admin",
  areaManager: "Area Manager",
  propertyManager: "Property Manager",
  accountant: "Accountant",
  unitOwner: "Unit Owner",
  unitTenant: "Unit Tenant",
};

export const UNIT_CUSTOMER_TYPES = { owner: 1, tenant: 2 };

export const ORDER_TYPES = {
  maintenance: "maintenance",
  cleaning: "cleaning",
};

export const ORDER_STATUSES = {
  requested: "requested",
  pending: "pending",
  assigned: "assigned",
  in_progress: "in_progress",
  completed: "completed",
  canceled: "canceled",
};
