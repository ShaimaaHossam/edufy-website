import { Routes, Route, Navigate } from "react-router-dom";

import NotFound from "../../shared/views/NotFound";

import Wallet from "./views/Wallet";
import Invoices from "./views/Invoices";
import Transactions from "./views/Transactions";

function AccountingRoot() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="wallet" />} />

      <Route path="/wallet" element={<Wallet />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/transactions" element={<Transactions />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AccountingRoot;
