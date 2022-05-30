import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@mui/material";

import emptySvg from "../../assets/errors/empty.svg";

function NoContent({ children }) {
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={2}
      flexGrow={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      wrap="nowrap"
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

      {!!children && <Grid item>{children}</Grid>}
    </Grid>
  );
}

export default NoContent;
