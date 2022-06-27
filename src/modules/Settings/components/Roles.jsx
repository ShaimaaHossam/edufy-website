import { useEffect } from "react";

import { useTranslation } from "react-i18next";

import { mdiPencil, mdiMinus } from "@mdi/js";

import Table from "../../../shared/components/Table";
import Link from "../../../shared/components/Link";
import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";

import { getRoles, settingsSelector } from "../../../redux/slices/settings";
import { useSelector, useDispatch } from "react-redux";

function Roles() {
  const { t } = useTranslation("settings");

  const dispatch = useDispatch();
  const { roles } = useSelector(settingsSelector);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const rowsData = roles.map((role) => ({
    id: role.id,
    active: true,
    clickable: false,
    rowCells: [
      t(role.name),

      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",

      role.name === "Admin" ? (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ) : (
        <IconButton
          aria-label="edit role"
          size="small"
          icon={mdiPencil}
          component={Link}
          to={`/settings/roles/update/${role.id}`}
        />
      ),
    ],
  }));

  return (
    <Table
      tableLabel="roles list"
      headLabels={[t("name"), t("summary"), t("actions")]}
      rowsData={rowsData}
    />
  );
}

export default Roles;
