import { Grid } from "@mui/material";
import SelectPropertyUnits from "./Maintenance/SelectPropertyUnits";
import SelectServices from "./Maintenance/SelectServices";

const CreateOrderContent = ({ currentStep }) => {
  return (
    <Grid item xs={12}>
      {currentStep === 1 ? <SelectPropertyUnits /> : <SelectServices />}
    </Grid>
  );
};

export default CreateOrderContent;
