import { useEffect } from "react";
import { mdiPencil } from "@mdi/js";

import { useTranslation } from "react-i18next";

import RolesTable from "../../../shared/components/Table";
import Icon from "../../../shared/components/Icon";
import Link from "../../../shared/components/Link";

import {
  getRoles,
  settingsSelector,
} from "../../../redux/services/SettingsServices";
import { useSelector, useDispatch } from "react-redux";

function Roles() {
  const { roles } = useSelector(settingsSelector);
  const dispatch = useDispatch();

  const { t } = useTranslation("settings");

  const Action = () => <Icon icon={mdiPencil} />;

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
    <RolesTable
      tableLabel="Roles Taple"
      headLabels={[t("roles"), t("summary"), t("action")]}
      rowsData={rowsData}
    />
  );
}

export default Roles;
