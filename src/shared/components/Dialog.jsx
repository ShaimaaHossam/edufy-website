import { forwardRef } from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import {
  Slide,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  useTheme,
} from "@mui/material";

import { mdiClose } from "@mdi/js";

import IconButton from "./IconButton";

const Transition = forwardRef(function Transition(
  { sided, ...restProps },
  ref
) {
  const { direction } = useTheme();
  const slideDir = !sided ? "up" : direction === "rtl" ? "right" : "left";

  return <Slide ref={ref} direction={slideDir} {...restProps} />;
});

const sizeMapping = { small: "xs", medium: "sm", large: "md" };

function SideDialog({
  title,
  open,
  onClose,
  size = "small",
  sided,

  onExited,

  confirmLabel,
  confirmColor,
  onConfirm,

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
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "greyScale.500",
        }}
      >
        <Typography component="h2" variant="h6">
          {title}
        </Typography>

        <IconButton
          aria-label="cancel"
          variant="contained"
          icon={mdiClose}
          onClick={onClose}
        />
      </DialogTitle>

      <DialogContent>
        <Box sx={{ height: "100%", pt: 2.5 }}>{children}</Box>
      </DialogContent>

      {!!onConfirm && (
        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            justifyContent: sided ? "flex-start" : "flex-end",
          }}
        >
          <Button color={confirmColor} onClick={onConfirm}>
            {confirmLabel || t("confirm")}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

SideDialog.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
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
