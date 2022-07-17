import { Grid } from "@mui/material";

import OrderSummary from "./OrderSummery";

import SelectPropertyUnits from "./SelectPropertyUnits";

const OrderPreview = () => {
  return (
    <Grid container spacing={8} direction="column">
      <Grid item>
        <SelectPropertyUnits preview />
      </Grid>
      <OrderSummary />
    </Grid>
  );
};

export default OrderPreview;
