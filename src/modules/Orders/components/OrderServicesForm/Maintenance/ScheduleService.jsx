import { Grid, Typography } from "@mui/material";
import DatePicker from "../../../../../shared/components/inputs/DatePicker";
import DateTimePicker from "../../../../../shared/components/inputs/DateTimePicker";
import { endOfToday } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { orderFormDataSelector, updateVal } from "../../../state/orderFormData";
const ScheduleService = () => {
  const dispatch = useDispatch();
  const { visitDate, visitTime } = useSelector(orderFormDataSelector);

  const UpdateFormData = (key, val) => {
    dispatch(updateVal({ key: key, val: `${val}` }));
  };
  return (
    <Grid item xs={12}>
      <Typography mb={2} variant="subtitle1">
        Schedule Service
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DatePicker
            name="visit_date"
            label={"visitDate"}
            value={visitDate}
            onChange={(val, _) => {
              UpdateFormData("visitDate", val.target.value);
            }}
            // error={
            //   formik.touched.expiry_date &&
            //   !!formik.errors.expiry_date
            // }
            // helperText={
            //   formik.touched.expiry_date &&
            //   formik.errors.expiry_date
            // }
            shouldDisableDate={(date) => date <= endOfToday()}
          />
        </Grid>
        <Grid item xs={6}>
          <DateTimePicker
            name="visit_date"
            label={"visitTime"}
            value={visitTime}
            onChange={(val, _) => {
              UpdateFormData("visitTime", val.target.value);
            }}
            // error={
            //   formik.touched.expiry_date &&
            //   !!formik.errors.expiry_date
            // }
            // helperText={
            //   formik.touched.expiry_date &&
            //   formik.errors.expiry_date
            // }
            shouldDisableDate={(date) => date <= endOfToday()}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ScheduleService;
