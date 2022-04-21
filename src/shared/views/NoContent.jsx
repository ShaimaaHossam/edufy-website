import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@mui/material";

import emptySvg from "../../assets/errors/empty.svg";

function NoContent() {
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%" }}
    >
      <Grid item>
        <Box component="img" alt="no content" src={emptySvg} width={200} />
      </Grid>

      <Grid item>
        <Typography component="h1" variant="h5" color="primary" align="center">
          {t("no_content")}
        </Typography>

        <Typography color="textSecondary" align="center">
          {t("no_content_message")}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NoContent;
