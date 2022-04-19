import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@mui/material";

import Link from "../../../../shared/components/Link";
import Icon from "../../../../shared/components/Icon";

import makeRoutingList from "../../../../helpers/makeRoutingList";

function Navigation() {
  const { t } = useTranslation("app");

  const { pathname } = useLocation();

  const routingList = makeRoutingList({});

  return (
    <Box component="nav" sx={{ backgroundColor: "greyScale.400" }}>
      <Grid container justifyContent="center" sx={{ height: 72 }}>
        {routingList.map(
          (item) =>
            item.active && (
              <Grid key={item.navName} item>
                <Link to={item.navLink}>
                  <Box
                    sx={{
                      px: 3,
                      height: 72,
                      minWidth: 72,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: pathname.includes(item.navLink)
                        ? "primary"
                        : "text.primary",
                      backgroundColor: pathname.includes(item.navLink)
                        ? "white"
                        : "transparent",
                    }}
                  >
                    <Icon
                      icon={item.icon}
                      sx={{
                        width: 34,
                        height: 34,
                        py: 1,
                        ...(pathname.includes(item.navLink) && {
                          backgroundColor: "infoBg",
                          borderRadius: "50%",
                        }),
                      }}
                    />

                    <Typography component="span" variant="body2">
                      {t(item.navName)}
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
}

export default Navigation;
