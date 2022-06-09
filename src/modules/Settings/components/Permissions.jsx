import { useEffect, useState, useRef } from "react";

import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import {
  getPermesion,
  getSelectedPermesion,
  updatePermesion,
  settingsSelector,
} from "../../../redux/slices/settings";
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
      uintType: [],
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
        uintType: permesions.UnitType.map((obj) => {
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
    <Grid
      container
      direction="column"
      spacing={4}
      sx={{ width: "50%", m: "auto" }}
    >
      <Grid item xs={12}>
        <Typography component="h2" variant="h6">
          {t(role.name)}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <CheckboxMenu
          title={t("city")}
          values={formik.values.city || []}
          onChange={(cityList) => {
            setFieldValue("city", cityList);
            selectPerm(cityList, setCityPermesion);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <CheckboxMenu
          title={t("unit")}
          values={formik.values.unit || []}
          onChange={(unitList) => {
            setFieldValue("unit", unitList);
            selectPerm(unitList, setUnitPermesion);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <CheckboxMenu
          title={t("company")}
          values={formik.values.company || []}
          onChange={(companyList) => {
            setFieldValue("company", companyList);
            selectPerm(companyList, setCompanyPermesion);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <CheckboxMenu
          title={t("room")}
          values={formik.values.room || []}
          onChange={(roomList) => {
            setFieldValue("room", roomList);
            selectPerm(roomList, setRoomPermesion);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <CheckboxMenu
          title={t("roomType")}
          values={formik.values.roomType || []}
          onChange={(roomTypeList) => {
            setFieldValue("roomType", roomTypeList);
            selectPerm(roomTypeList, setRoomTypePermesion);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <CheckboxMenu
          title={t("uintType")}
          values={formik.values.uintType || []}
          onChange={(unitTypeList) => {
            setFieldValue("uintType", unitTypeList);
            selectPerm(unitTypeList, setunitTypePermesion);
          }}
        />
      </Grid>

      <Grid item alignSelf="flex-end">
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
