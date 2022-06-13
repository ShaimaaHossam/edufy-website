import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";
import { mdiPencil, mdiContentCopy } from "@mdi/js";

import Table from "../../../shared/components/Table";
import IconButton from "../../../shared/components/IconButton";
import Link from "../../../shared/components/Link";
import Switch from "../../../shared/components/inputs/Switch";

import NoContent from "../../../shared/views/NoContent";

import { WALLET_TYPES } from "../../../constants/system";

function TeamMembersTable() {
  const { t } = useTranslation("people");

  const tableLabels = [
    t("name"),
    t("role"),
    t("property"),
    t("email"),
    t("phoneNumber"),
    t("actions"),
  ];

  return <>Hello World</>;
}

export default TeamMembersTable;
