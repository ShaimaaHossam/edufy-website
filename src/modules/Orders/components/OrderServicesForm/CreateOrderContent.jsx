import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { ORDER_TYPES } from "../../../../constants/system";
import SelectPropertyUnits from "./Maintenance/SelectPropertyUnits";
import SelectMaintenanceServices from "./Maintenance/SelectServices";
import SelectServicesNew from "./Maintenance/SelectServicesNew";

const CreateOrderContent = ({ currentStep }) => {
  const { orderType } = useParams();
  return (
    <Grid item xs={12}>
      {currentStep === 1 ? (
        <SelectPropertyUnits />
      ) : orderType === ORDER_TYPES.maintenance ? (
        <SelectMaintenanceServices />
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default CreateOrderContent;
