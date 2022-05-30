import { Box, CircularProgress } from "@mui/material";

function Loader() {
  return (
    <Box
      flexGrow={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={40} color="secondary" />
    </Box>
  );
}

export default Loader;
