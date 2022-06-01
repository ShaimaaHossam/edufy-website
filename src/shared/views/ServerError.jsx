import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Box, Grid, Typography, Button } from "@mui/material";

import serverErrorSvg from "../../assets/errors/500.svg";

function ServerError() {
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
          alt="server error"
          src={serverErrorSvg}
          width={560}
          height={400}
        />
      </Grid>

      <Grid item>
        <Typography component="h1" variant="h5" color="primary" align="center">
          {t("server_error")}
        </Typography>

        <Typography color="textSecondary" align="center">
          {t("server_error_message")}
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

export default ServerError;
