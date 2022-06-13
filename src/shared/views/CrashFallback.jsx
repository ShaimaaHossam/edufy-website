import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useNavigate, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Box, Grid, Typography, Button } from "@mui/material";

import crashSvg from "../../assets/errors/crash.svg";

function CrashFallback({ resetError }) {
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const errorPath = useRef(pathname);

  useEffect(() => {
    if (pathname === errorPath.current) return;

    resetError();
  }, [pathname, resetError]);

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
          alt="crash"
          src={crashSvg}
          width={560}
          height={400}
        />
      </Grid>

      <Grid item>
        <Typography component="h1" variant="h5" color="primary" align="center">
          {t("error_occurred")}
        </Typography>

        <Typography color="textSecondary" align="center">
          {t("error_occurred_message")}
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

CrashFallback.propTypes = {
  resetError: PropTypes.func.isRequired,
};

export default CrashFallback;
