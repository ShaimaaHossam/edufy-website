import { Box, Toolbar } from "@mui/material";

import Header from "./Header";

function AppContainer({ children }) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />

      {/* Header's Toolbar height offset */}
      <Toolbar />

      {/* Header's Navigation height offset */}
      <Box mx={6} mt={11} mb={2} flexGrow={1} position="relative">
        {children}
      </Box>
    </Box>
  );
}

export default AppContainer;
