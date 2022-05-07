import { Typography, Paper, Box } from "@mui/material";

function FormContainer({ children, title }) {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "50%",
        mt: -18,
        mx: "auto",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        position: "relative",
      }}
    >
      <Box height={50} />

      <Box
        sx={{
          height: 56,
          px: 3,
          py: 1,
          display: "flex",
          alignItems: "center",
          borderBottom: 2,
          borderBottomColor: "#111B3321",
        }}
      >
        <Typography color="text.primary" variant="h5">
          {title}
        </Typography>
      </Box>

      <Box mb={3}>{children}</Box>
    </Paper>
  );
}

export default FormContainer;
