import { forwardRef } from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import {
  Slide,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";

const Transition = forwardRef(function Transition(
  { sided, ...restProps },
  ref
) {
  const { direction } = useTheme();
  const slideDir = !sided ? "up" : direction === "rtl" ? "right" : "left";

  return <Slide ref={ref} direction={slideDir} {...restProps} />;
});

const sizeMapping = {
  small: "xs",
  medium: "sm",
  large: "md",
  extraLarge: "lg",
};

function SideDialog({
  withoutTitle,
  title,
  titleColor,

  withoutConfirm,
  confirmLabel,
  confirmColor,
  onConfirm,

  open,
  onClose,
  size = "small",
  sided,

  onExited,

  children,
}) {
  const { t } = useTranslation();

  return (
    <Dialog
      fullWidth
      maxWidth={sizeMapping[size]}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      TransitionProps={{ sided, onExited }}
      transitionDuration={400}
      {...(sided && {
        sx: {
          "& .MuiDialog-paper": {
            margin: 0,
          },
          "& .MuiDialog-scrollPaper": {
            justifyContent: "flex-end",
            alignItems: "stretch",
          },
          "& .MuiDialog-paperScrollPaper": {
            maxHeight: "100%",
          },
        },
      })}
    >
      {!withoutTitle && (
        <DialogTitle color={titleColor} sx={{ pt: 3 }}>
          {title}
        </DialogTitle>
      )}

      <DialogContent>
        <Box sx={{ height: "100%" }}>{children}</Box>
      </DialogContent>

      {!withoutConfirm && (
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            justifyContent: sided ? "flex-start" : "flex-end",
          }}
        >
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                size="medium"
                variant="outlined"
                color="inherit"
                onClick={onClose}
              >
                {t("cancel")}
              </Button>
            </Grid>

            <Grid item>
              <Button size="medium" color={confirmColor} onClick={onConfirm}>
                {confirmLabel || t("confirm")}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      )}
    </Dialog>
  );
}

SideDialog.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.oneOf([
    "info",
    "error",
    "warning",
    "success",
    "primary",
    "secondary",
  ]),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large", "extraLarge"]),
  sided: PropTypes.bool,

  onExited: PropTypes.func,

  confirmLabel: PropTypes.string,
  confirmColor: PropTypes.oneOf([
    "info",
    "error",
    "warning",
    "success",
    "primary",
    "secondary",
  ]),
  onConfirm: PropTypes.func,
};

export default SideDialog;
