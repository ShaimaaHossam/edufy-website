import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import { mdiPencil } from "@mdi/js";

import Taple from "../../../shared/components/Table";
import {
  getRoles,
  settingsSelector,
} from "../../../redux/services/SettingsServices";
import { useSelector, useDispatch } from "react-redux";

function Roles() {
  const { roles } = useSelector(settingsSelector);
  const dispatch = useDispatch();
  const Action = () => (
    <SvgIcon fontSize="small">
      <path d={mdiPencil} />
    </SvgIcon>
  );
  let rowsData = roles.map((obj) => {
    return {
      id: obj.id,
      active: true,
      clickable: true,
      rowCells: [
        obj.name,
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
      tableLabel="hh"
      headLabels={["Roles", "Summary", "Action"]}
      rowsData={rowsData}
    />
  );
}

export default Roles;
