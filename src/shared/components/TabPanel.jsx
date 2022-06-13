import PropTypes from "prop-types";

import { Box } from "@mui/material";

function TabPanel({ index, value, children, ...restProps }) {
  return (
    <Box
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      hidden={value !== index}
      sx={{ mt: 3 }}
      {...restProps}
    >
      {value === index && children}
    </Box>
  );
}

TabPanel.propTypes = {
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TabPanel;
