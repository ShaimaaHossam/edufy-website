import { useEffect, useState } from "react";

import {
  getRoles,
  updatePermesion,
  settingsSelector,
} from "../../../redux/services/SettingsServices";
import { useSelector, useDispatch } from "react-redux";

import {
  Typography,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from "@mui/material";
import CheckboxMenu from "../../../shared/components/inputs/CheckboxMenu";
import Dialog from "../../../shared/components/Dialog";

function Roles() {
  const [open, setOpen] = useState(false);
  const { isSuccess, isError, errors, roles } = useSelector(settingsSelector);
  const [role, setRole] = useState("");
  const [dashboardPermesion, setDashboardPermesion] = useState([]);
  const [ordersPermesion, setOrdersPermesion] = useState([]);

  const dispatch = useDispatch();

  const [dashboardlist, setDashboardList] = useState([
    { id: "1", label: "View Dashboard Content", value: false },
    { id: "2", label: "View  Content", value: false },
    { id: "3", label: "View Dashboard ", value: false },
  ]);
  const [ordersList, setOrders] = useState([
    { id: "1", label: "View Orders Content", value: false },
    { id: "2", label: "View  Content", value: false },
    { id: "3", label: "View Orders ", value: false },
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

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  const handelSave = () => {
    let result = roles.filter((obj) => obj.name === role);
    console.log("result", result);
    let permesion = [...dashboardPermesion, ...ordersPermesion];
    console.log("All permesion", permesion);

    let data = {
      id: result[0].id,
      data: {
        company_id: result[0].company_id,
        name: result[0].name,
      },
    };

    dispatch(updatePermesion(data));

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSelect = (event) => {
    setRole(event.target.value);
  };

  const selectPerm = (permissionslist, callBack) => {
    let list = permissionslist.filter((obj) => obj.value === true);
    let perm = list.map((obj) => obj.label);
    callBack(perm);
    console.log("perm", perm);
  };

  return (
    <Grid container spacing={5} margin="auto">
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          User Role
        </Typography>
      </Grid>

      <Grid item xs={11} mt={-5}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Roles</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={handleSelect}
          >
            {roles.map((role) => {
              return <MenuItem value={role.name}>{role.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={11}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Role Permissions
        </Typography>
      </Grid>

      <Grid item xs={11} mt={-5}>
        <CheckboxMenu
          title="Dashboard"
          values={dashboardlist}
          onChange={(dashboardlist) => {
            setDashboardList(dashboardlist);
            selectPerm(dashboardlist, setDashboardPermesion);
          }}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="Orders"
          values={ordersList}
          onChange={(ordersList) => {
            setOrders(ordersList);
            selectPerm(ordersList, setOrdersPermesion);
          }}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="Properties"
          values={propertiesList}
          onChange={(propertiesList) => setPropertiesList(propertiesList)}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="Accounting"
          values={accountingList}
          onChange={(accountingList) => setAccountingList(accountingList)}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="Services"
          values={servicesList}
          onChange={(servicesList) => setServicesList(servicesList)}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="People"
          values={peopleList}
          onChange={(peopleList) => setPeopleList(peopleList)}
        />
      </Grid>

      <Grid item xs={11} textAlign="right" mt={6} mb={4}>
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
      </Grid>
    </Grid>
  );
}

export default Roles;
