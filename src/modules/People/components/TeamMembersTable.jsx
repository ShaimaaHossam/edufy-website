import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { peopleSelector, setTeamMembersFilters } from "../state";

import { useGetUsersQuery } from "../../../redux/services/people";

import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";
import { mdiPencil, mdiContentCopy } from "@mdi/js";

import Table from "../../../shared/components/Table";
import IconButton from "../../../shared/components/IconButton";
import Link from "../../../shared/components/Link";
import Switch from "../../../shared/components/inputs/Switch";

import { USER_TYPES } from "../../../constants/global";

import NoContent from "../../../shared/views/NoContent";

function TeamMembersTable({ userRole }) {
  const { t } = useTranslation("people");
  
  const dispatch = useDispatch();


  const { teamMembersFilters } = useSelector(peopleSelector);
  
  useEffect(()=>{
    if (userRole) {
      dispatch(setTeamMembersFilters({
        ...teamMembersFilters,
        "filter[role]":userRole
      }))
    }
    else{
      dispatch(setTeamMembersFilters({
        "filter[user_type]": USER_TYPES.teamMember
      }))
    }
  },[userRole])

  const { isLoading, data: teamMembers } = useGetUsersQuery(teamMembersFilters);


  const tableLabels = [
    t("name"),
    t("role"),
    t("property"),
    t("email"),
    t("phoneNumber"),
    t("actions"),
  ];
  const tableData = teamMembers?.map((item) => ({
    id: item.id,
    active: item.active,
    clickable: true,
    rowCells: [
      <Typography component="span" variant="body2">
        {item.name}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.role}
      </Typography>,
      <Typography component="span" variant="body2">
        {/* {item.properties.length ? item.properties[0] : "-"} */}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.email}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.phone}
      </Typography>,
      <Grid container onClick={(e) => e.stopPropagation()}>
        <Grid item>
          <IconButton
            aria-label="edit property"
            size="small"
            icon={mdiPencil}
            disabled={!item.active}
            component={Link}
            to={`/people/team/edit/${item.id}`}
          />
        </Grid>

        <Grid item>
          <IconButton
            aria-label="clone property"
            size="small"
            icon={mdiContentCopy}
            disabled={!item.active}
            component={Link}
            to={`/people/team/clone/${item.id}`}
          />
        </Grid>

        <Grid item sx={{ textAlign: "center", ml: 0.5, mt: 0.5 }}>
          <Switch
            color="primary"
            checked={item.active}
            onChange={() => console.log("kk")}
          />
          <Typography component="span" variant="caption" display="block">
            {item.active ? t("active") : t("inactive")}
          </Typography>
        </Grid>
      </Grid>,
    ],
  }));
  if (isLoading) return null;

  return !!tableData?.length ? (
    <Table
      tableLabel="team members list"
      headLabels={tableLabels}
      rowsData={tableData}
    />
  ) : (
    <NoContent />
  );
}

export default TeamMembersTable;
