
import { Box } from "@mui/material";

import Orders from "../components/Ordes";
import JobsByService from "../components/JobsByService";
import MaterialSpending from "../components/MaterialSpending";
import PropertyStats from "../components/PropertyStats";

function Dashboard() {
  return (
    <Box>
      <Orders />
      <JobsByService />
      <MaterialSpending />
      <PropertyStats />
    </Box>
  );
}

export default Dashboard;
