import { useGetAllRolesQuery } from "../../../redux/services/dashboard";
import { useGetAllPropertiesQuery } from "../../../redux/services/properties";

import { Box } from "@mui/material";

import Orders from "../components/Ordes";
import JobsByService from "../components/JobsByService";
import MaterialSpending from "../components/MaterialSpending";
import PropertyStats from "../components/PropertyStats";
import DetailedOrders from "../components/DetailedOrders";

function Dashboard() {
  const { data: allRoles = [] } = useGetAllRolesQuery();
  const { data: allProperties = [] } = useGetAllPropertiesQuery();

  return (
    <Box>
      <Orders/>
      <DetailedOrders allRoles={allRoles} allProperties={allProperties} />
      <JobsByService />
      <MaterialSpending allRoles={allRoles} allProperties={allProperties} />
      <PropertyStats allRoles={allRoles} allProperties={allProperties} />
    </Box>
  );
}

export default Dashboard;
