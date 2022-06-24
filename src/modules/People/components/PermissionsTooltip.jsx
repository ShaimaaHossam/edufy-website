import {
  Box,
  Typography,
  Tooltip,
  tooltipClasses,
  styled,
  useTheme,
} from "@mui/material";

const PermissionsTooltip = styled(
  ({ className, permissions, noPermissions, ...props }) => {
    const theme = useTheme();

    return (
      <Tooltip
        placement={theme.direction === "rtl" ? "left" : "right"}
        title={
          <>
            <Box padding={2}>
              {permissions.length ? (
                permissions.map((per) => {
                  return (
                    <Typography color="primary" component="p" key={per.name}>
                      {per.name}
                    </Typography>
                  );
                })
              ) : (
                <Typography color="primary" component="p">
                  {noPermissions}
                </Typography>
              )}
            </Box>
          </>
        }
        {...props}
        classes={{ popper: className }}
      />
    );
  }
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fafbff",
    maxWidth: 300,
    maxHeight: 300,
    // overflow: "scroll",
    overflowX: "hidden",
    overflowY: "auto",
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default PermissionsTooltip;



