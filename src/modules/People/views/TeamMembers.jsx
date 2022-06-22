import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { peopleSelector, setTeamMembersFilters } from "../state";

import { useGetAllRolesByUserTypeQuery } from "../../../redux/services/roles";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography, Button } from "@mui/material";

import Icon from "../../../shared/components/Icon";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import Link from "../../../shared/components/Link";
import SearchInput from "../../../shared/components/inputs/SearchInput";
import { mdiPlus } from "@mdi/js";

import TeamMembersTable from "../components/TeamMembersTable";

import { USER_TYPES } from "../../../constants/system";

function TeamMembers() {
  const { t } = useTranslation("people");

  const [userRole, setUserRole] = useState("");

  const dispatch = useDispatch();
  const { teamMembersFilters } = useSelector(peopleSelector);

  const { data: allRoles = [] } = useGetAllRolesByUserTypeQuery(
    USER_TYPES.teamMember,
    { refetchOnMountOrArgChange: true }
  );

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography component="h1" variant="h5">
          {t("teamMembers")}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ p: 3 }}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item sx={{ width: 320 }}>
              <SearchInput
                size="small"
                label={t("searchUser")}
                placeholder={t("user")}
                onChange={(keyword) => {
                  dispatch(
                    setTeamMembersFilters({
                      ...teamMembersFilters,
                      "filter[keyword]": keyword,
                    })
                  );
                }}
              />
            </Grid>

            <Grid item sx={{ width: 320 }}>
              <Autocomplete
                size="small"
                name="roles filter"
                label={t("byUserRole")}
                noOptionsText={t("noTypes")}
                options={allRoles?.map((type) => ({
                  value: type.name,
                  label: type.name,
                }))}
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value);
                  dispatch(
                    setTeamMembersFilters({
                      ...teamMembersFilters,
                      "filter[role]": e.target.value,
                    })
                  );
                }}
              />
            </Grid>

            <Grid item sx={{ ml: "auto" }}>
              <Button
                startIcon={<Icon icon={mdiPlus} />}
                component={Link}
                to="/people/team/add"
              >
                {t("newUser")}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TeamMembersTable />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TeamMembers;
