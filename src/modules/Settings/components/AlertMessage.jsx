import { useState, forwardRef, useEffect } from "react";

import {Stack, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertMessage({ isSuccess, isError }) {
  const [success, setSuccess] = useState(isSuccess);
  const [error, setError] = useState(isError);
  const [vertical] = useState("top");
  const [horizontal] = useState("right");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setSuccess(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setSuccess(isSuccess);
    }
    if (isError) {
      setError(isError);
      setSuccess(false);
    }
  }, [isSuccess, isError]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {isSuccess && (
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Update successful
          </Alert>
        </Snackbar>
      )}

      {isError && (
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Please check required fields
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}
export default AlertMessage;
