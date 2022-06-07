import { useEffect, useState, useRef } from "react";

import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import {
  getPermesion,
  getSelectedPermesion,
  updatePermesion,
  settingsSelector,
} from "../../../redux/services/SettingsServices";
import { useSelector, useDispatch } from "react-redux";

import { Typography, Button, Grid } from "@mui/material";
import CheckboxMenu from "../../../shared/components/inputs/CheckboxMenu";
import Dialog from "../../../shared/components/Dialog";

function Permissions() {
  const [open, setOpen] = useState(false);
  const { permesions, selectedPermesion } = useSelector(settingsSelector);
  const location = useLocation();
  const role = location.state;
  const permesionRef = useRef(false);

  const { t } = useTranslation("settings");

  const [cityPermesion, setCityPermesion] = useState([]);
  const [unitPermesion, setUnitPermesion] = useState([]);
  const [companyPermesion, setCompanyPermesion] = useState([]);
  const [roomPermesion, setRoomPermesion] = useState([]);
  const [roomTypePermesion, setRoomTypePermesion] = useState([]);
  const [unitTypePermesion, setunitTypePermesion] = useState([]);

  const formik = useFormik({
    initialValues: {
      city: [],
      unit: [],
      company: [],
      room: [],
      roomType: [],
      unitType: [],
    },
  });
  const { setValues, setFieldValue } = formik;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPermesion());
    dispatch(getSelectedPermesion(role.id));
  }, []);

  useEffect(() => {
    if (!permesionRef.current) {
      permesionRef.current = true;
    } else {
      setValues({
        city: permesions.City.map((obj) => {
          return { id: obj.id, label: obj.name, value: false };
        }),
        unit: permesions.Unit.map((obj) => {
          return { id: obj.id, label: obj.name, value: false };
        }),
        company: permesions.Company.map((obj) => {
          return { id: obj.id, label: obj.name, value: false };
        }),
        room: permesions.Room.map((obj) => {
          return { id: obj.id, label: obj.name, value: false };
        }),
        roomType: permesions.RoomType.map((obj) => {
          return { id: obj.id, label: obj.name, value: false };
        }),
        unitType: permesions.UnitType.map((obj) => {
          return { id: obj.id, label: obj.name, value: false };
        }),
      });
    }
  }, [permesions]);

  const selectPerm = (permissionslist, callBack) => {
    let list = permissionslist.filter((obj) => obj.value === true);
    let perm = list.map((obj) => obj.id);
    callBack(perm);
  };

  const handelSave = () => {
    let permesions = [
      ...cityPermesion,
      ...unitPermesion,
      ...companyPermesion,
      ...roomPermesion,
      ...roomTypePermesion,
      ...unitTypePermesion,
    ];

    let data = {
      id: role.id,
      data: {
        company_id: role.company_id,
        name: role.name,
      },
      permesion: permesions,
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

  return (
    <Grid container spacing={5} margin="auto">
      <Grid item xs={10}>
        <Typography variant="h5" mb={3}>
          {t(`${role.name}`)}
        </Typography>
      </Grid>

      <Grid item xs={10} mt={-5}>
        <CheckboxMenu
          title="City"
          values={formik.values.city || []}
          onChange={(cityList) => {
            setFieldValue("city", cityList);
            selectPerm(cityList, setCityPermesion);
          }}
        />
      </Grid>

      <Grid item xs={10}>
        <CheckboxMenu
          title="Unit"
          values={formik.values.unit || []}
          onChange={(unitList) => {
            setFieldValue("unit", unitList);
            selectPerm(unitList, setUnitPermesion);
          }}
        />
      </Grid>

      <Grid item xs={10}>
        <CheckboxMenu
          title="Company"
          values={formik.values.company || []}
          onChange={(companyList) => {
            setFieldValue("company", companyList);
            selectPerm(companyList, setCompanyPermesion);
          }}
        />
      </Grid>

      <Grid item xs={10}>
        <CheckboxMenu
          title="Room"
          values={formik.values.room || []}
          onChange={(roomList) => {
            setFieldValue("room", roomList);
            selectPerm(roomList, setRoomPermesion);
          }}
        />
      </Grid>

      <Grid item xs={10}>
        <CheckboxMenu
          title="Room Type"
          values={formik.values.roomType || []}
          onChange={(roomTypeList) => {
            setFieldValue("roomType", roomTypeList);
            selectPerm(roomTypeList, setRoomTypePermesion);
          }}
        />
      </Grid>

      <Grid item xs={10}>
        <CheckboxMenu
          title="Unit Type"
          values={formik.values.unitType || []}
          onChange={(unitTypeList) => {
            setFieldValue("uintType", unitTypeList);
            selectPerm(unitTypeList, setunitTypePermesion);
          }}
        />
      </Grid>

      <Grid item xs={10} textAlign="right" mt={6} mb={4}>
        <Dialog
          title={t("saveMesage")}
          open={open}
          onClose={handleClose}
          onConfirm={handelSave}
        />
        <Button color="success" onClick={handleOpen}>
          {t("saveChanges")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default Permissions;
