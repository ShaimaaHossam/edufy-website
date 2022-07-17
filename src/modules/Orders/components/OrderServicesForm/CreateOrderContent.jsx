import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { ORDER_TYPES } from "../../../../constants/system";

import OrderPreview from "./Maintenance/OrderPreview";
import SelectPropertyUnits from "./Maintenance/SelectPropertyUnits";
import SelectMaintenanceServices from "./Maintenance/SelectServices";
import SelectCleaningServices from "./Cleaning/SelectServices";
import ServiceEdit from "./Maintenance/ServiceEdit";
import { useSelector } from "react-redux";
import {
  orderFormDataSelector,
  resetAllStatus,
} from "../../state/orderFormData";
import { resetSteps } from "../../state/orderFormSteps";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const CreateOrderContent = ({ currentStep }) => {
  const { orderType } = useParams();
  const dispatch = useDispatch();
  const { editService } = useSelector(orderFormDataSelector);

  useEffect(() => {
    dispatch(resetAllStatus());
    dispatch(resetSteps());
  }, []);

  return (
    <Grid item xs={12}>
      {currentStep === 1 ? (
        <SelectPropertyUnits />
      ) : currentStep === 2 ? (
        orderType === ORDER_TYPES.maintenance ? (
          <SelectMaintenanceServices />
        ) : (
          <SelectCleaningServices />
        )
      ) : !editService ? (
        <OrderPreview />
      ) : (
        <ServiceEdit />
      )}
    </Grid>
  );
};

export default CreateOrderContent;
