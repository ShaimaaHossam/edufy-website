import { useEffect, useState, useRef } from "react";

import {
  getRoles,
  getPermesion,
  getSelectedPermesion,
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
  const {  roles, permesions, selectedPermesion } =useSelector(settingsSelector);

  const [role, setRole] = useState("");
  const permesionRef = useRef(false);

  const [cityPermesion, setCityPermesion] = useState([]);
  const [unitPermesion, setUnitPermesion] = useState([]);
  const [companyPermesion, setCompanyPermesion] = useState([]);
  const [roomPermesion, setRoomPermesion] = useState([]);
  const [roomTypePermesion, setRoomTypePermesion] = useState([]);
  const [unitTypePermesion, setunitTypePermesion] = useState([]);

  const [cityList, setCityList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [unitTypeList, setUnitTypeList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getPermesion());
  }, []);

  useEffect(() => {
    let roleObj = roles.filter((obj)=> obj.name === role)
    console.log("id", roleObj[0]?.id)

   dispatch(getSelectedPermesion(roleObj[0]?.id));
  }, [role]);

  console.log("selectedPermesion", selectedPermesion)

  useEffect(() => {
    if (!permesionRef.current) {
      permesionRef.current = true;
    } else {
      setCityList(
        permesions.City.map((obj) => {
          return {
            id: obj.id,
            label: obj.name,
            value: false,
          };
        })
      );
      setUnitList(
        permesions.Unit.map((obj) => {
          return {
            id: obj.id,
            label: obj.name,
            value: false,
          };
        })
      );
      setCompanyList(
        permesions.Company.map((obj) => {
          return {
            id: obj.id,
            label: obj.name,
            value: false,
          };
        })
      );
      setRoomList(
        permesions.Room.map((obj) => {
          return {
            id: obj.id,
            label: obj.name,
            value: false,
          };
        })
      );
      setRoomTypeList(
        permesions.RoomType.map((obj) => {
          return {
            id: obj.id,
            label: obj.name,
            value: false,
          };
        })
      );

      setUnitTypeList(
        permesions.UnitType.map((obj) => {
          return {
            id: obj.id,
            label: obj.name,
            value: false,
          };
        })
      );
    }
  }, [permesions]);

  
  const selectPerm = (permissionslist, callBack) => {
    let list = permissionslist.filter((obj) => obj.value === true);
    let perm = list.map((obj) => obj.id);
    callBack(perm);
  };

  const handelSave = () => {
    let result = roles.filter((obj) => obj.name === role);
    let permesions = [
      ...cityPermesion,
      ...unitPermesion,
      ...companyPermesion,
      ...roomPermesion,
      ...roomTypePermesion,
      ...unitTypePermesion
    ];
    let data = {
      id: result[0].id,
      data: {
        company_id: result[0].company_id,
        name: result[0].name,
      },
      permesion: permesions
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
          title="City"
          values={cityList}
          onChange={(cityList) => {
            setCityList(cityList);
            selectPerm(cityList, setCityPermesion);
          }}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="Unit"
          values={unitList}
          onChange={(unitList) => {
            setUnitList(unitList);
            selectPerm(unitList, setUnitPermesion);
          }}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="Company"
          values={companyList}
          onChange={(companyList) => {
            setCompanyList(companyList);
            selectPerm(companyList, setCompanyPermesion);
          }}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="Room"
          values={roomList}
          onChange={(roomList) => {
            setRoomList(roomList);
            selectPerm(roomList, setRoomPermesion);
          }}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="Room Type"
          values={roomTypeList}
          onChange={(roomTypeList) => {
            setRoomTypeList(roomTypeList);
            selectPerm(roomTypeList, setRoomTypePermesion);
          }}
        />
      </Grid>

      <Grid item xs={11}>
        <CheckboxMenu
          title="Unit Type"
          values={unitTypeList}
          onChange={(unitTypeList) => {
            setUnitTypeList(unitTypeList);
            selectPerm(unitTypeList, setunitTypePermesion);
          }}
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
