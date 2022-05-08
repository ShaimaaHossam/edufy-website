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
        paddingTop: 6,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1,
          display: "flex",
          alignItems: "center",
          borderBottom: 2,
          borderBottomColor: "border",
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
