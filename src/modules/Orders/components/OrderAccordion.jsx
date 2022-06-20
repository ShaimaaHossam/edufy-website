import { useState } from "react";
import PropTypes from "prop-types";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function OrderAccordion({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
      sx={{ px: 1, border: 1, borderColor: "divider" }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{title}</Typography>
      </AccordionSummary>

      {isExpanded && <Divider variant="fullWidth" sx={{ mb: 2 }} />}

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

OrderAccordion.propTypes = {
  title: PropTypes.string.isRequired,
};

export default OrderAccordion;
