import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import { mdiPencil } from "@mdi/js";

import { useTranslation } from "react-i18next";

import Taple from "../../../shared/components/Table";
import {
  getRoles,
  settingsSelector,
} from "../../../redux/services/SettingsServices";
import { useSelector, useDispatch } from "react-redux";

function Roles() {
  const { roles } = useSelector(settingsSelector);
  const dispatch = useDispatch();

  const { t } = useTranslation("settings");

  const Action = () => (
    <SvgIcon fontSize="small">
      <path d={mdiPencil} />
    </SvgIcon>
  );
  let rowsData = roles.map((obj) => {
    return {
      id: obj.id,
      active: true,
      clickable: false,
      rowCells: [
        t(`${obj.name}`),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
        <Link to="/settings/permissions" state={obj}>
          <Action />
        </Link>,
      ],
    };
  });

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return (
    <Taple
      tableLabel="Roles Taple"
      headLabels={[t("roles"), t("summary"), t("action")]}
      rowsData={rowsData}
    />
  );
}

export default Roles;
