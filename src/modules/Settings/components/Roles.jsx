import { useEffect } from "react";
import { mdiPencil } from "@mdi/js";

import { useTranslation } from "react-i18next";

import RolesTable from "../../../shared/components/Table";
import Link from "../../../shared/components/Link";
import IconButton from "../../../shared/components/IconButton";

import { getRoles, settingsSelector } from "../../../redux/slices/settings";
import { useSelector, useDispatch } from "react-redux";

function Roles() {
  const { roles } = useSelector(settingsSelector);
  const dispatch = useDispatch();

  const { t } = useTranslation("settings");

  let rowsData = roles.map((obj) => {
    return {
      id: obj.id,
      active: true,
      clickable: false,
      rowCells: [
        t(`${obj.name}`),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
        <IconButton
          aria-label="action"
          icon={mdiPencil}
          size="small"
          component={Link}
          color="primary"
          to="/settings/permissions"
          state={obj}
        />,
      ],
    };
  });

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return (
    <RolesTable
      tableLabel="Roles Taple"
      headLabels={[t("roles"), t("summary"), t("action")]}
      rowsData={rowsData}
    />
  );
}

export default Roles;
