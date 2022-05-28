import { useEffect, useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import CheckboxMenu from "../../../shared/components/inputs/CheckboxMenu";
import Dialog from "../../../shared/components/Dialog";

function RolesAndPermissions() {
  const [open, setOpen] = useState(false);

  const [dashboardlist, setDashboardList] = useState([
    { id: "1", label: "ali", value: false },
  ]);
  const [ordersList, setOrders] = useState([
    { id: "1", label: "ali", value: false },
  ]);
  const [propertiesList, setPropertiesList] = useState([
    { id: "1", label: "ali", value: false },
  ]);
  const [accountingList, setAccountingList] = useState([
    { id: "1", label: "ali", value: false },
  ]);
  const [servicesList, setServicesList] = useState([
    { id: "1", label: "ali", value: false },
  ]);
  const [peopleList, setPeopleList] = useState([
    { id: "1", label: "ali", value: false },
  ]);

  const handelSave = () => {
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        User Role
      </Typography>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Role Permissions
      </Typography>

      <Box
        sx={{
          marginBottom: 3,
        }}
      >
        <CheckboxMenu
          title="Dashboard"
          values={dashboardlist}
          onChange={(dashboardlist) => setDashboardList(dashboardlist)}
        />
      </Box>

      <Box
        sx={{
          marginBottom: 3,
        }}
      >
        <CheckboxMenu
          title="Orders"
          values={ordersList}
          onChange={(ordersList) => setOrders(ordersList)}
        />
      </Box>

      <Box
        sx={{
          marginBottom: 3,
        }}
      >
        <CheckboxMenu
          title="Properties"
          values={propertiesList}
          onChange={(propertiesList) => setPropertiesList(propertiesList)}
        />
      </Box>

      <Box
        sx={{
          marginBottom: 3,
        }}
      >
        <CheckboxMenu
          title="Accounting"
          values={accountingList}
          onChange={(accountingList) => setAccountingList(accountingList)}
        />
      </Box>

      <Box
        sx={{
          marginBottom: 3,
        }}
      >
        <CheckboxMenu
          title="Services"
          values={servicesList}
          onChange={(servicesList) => setServicesList(servicesList)}
        />
      </Box>

      <Box>
        <CheckboxMenu
          title="People"
          values={peopleList}
          onChange={(peopleList) => setPeopleList(peopleList)}
        />
      </Box>

      <Box textAlign="right" mt={6} mb={4}>
        <Dialog
          title="Are you sure you want to Save changes ?"
          open={open}
          onClose={handleClose}
          onConfirm={handelSave}
        />
        <Button
          type="submit"
          sx={{
            backgroundColor: "success.main",
            color: "white",
            "&:hover": { backgroundColor: "success.main" },
          }}
          onClick={handleOpen}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
}

export default RolesAndPermissions;
