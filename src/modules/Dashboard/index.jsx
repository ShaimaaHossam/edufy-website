import { Routes, Route } from "react-router-dom";
import NotFound from "../../shared/views/NotFound";

import Dashboard from "./views/Dashboard";

function DashboardRoot() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default DashboardRoot;
