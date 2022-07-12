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

export const WALLET_TRANS_TYPES = {
  deposit: "deposit",
  withdraw: "withdraw",
};
export const WALLET_TRANS_DESCRIPS = {
  refund: "refund",
  deposit: "deposit",
  free_balance: "free_balance",
  invoice_payment: "invoice_payment",
  subscription_fees: "subscription_fees",
};

export const INVOICE_TYPES = {
  invoice: "invoice",
  credit_note: "credit_note",
};
export const INVOICE_STATUSES = {
  unpaid: "unpaid",
  pending: "pending",
  paid: "paid",
  rejected: "rejected",
};
export const INVOICE_PAY_TYPES = {
  wallet: "wallet",
  transfer: "transfer",
};

export const TRANSACTION_TYPES = {
  order: "order",
  invoice: "invoice",
  payment: "payment",
  walletRecharge: "wallet_recharge",
  creditNote: "credit_note",
};
