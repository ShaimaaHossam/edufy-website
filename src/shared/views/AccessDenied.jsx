import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Box, Grid, Typography, Button } from "@mui/material";

import accessDeniedSvg from "../../assets/errors/403.svg";

function AccessDenied() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={2}
      flexGrow={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Box
          component="img"
          alt="access denied"
          src={accessDeniedSvg}
          width={560}
          height={400}
        />
      </Grid>

      <Grid item>
        <Typography component="h1" variant="h5" color="primary" align="center">
          {t("access_denied")}
        </Typography>

        <Typography color="textSecondary" align="center">
          {t("access_denied_message")}
        </Typography>
      </Grid>

      <Grid item>
        <Button size="medium" variant="outlined" onClick={() => navigate(-1)}>
          {t("go_back")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default AccessDenied;
