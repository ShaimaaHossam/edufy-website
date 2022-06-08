import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Spinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        heght: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
