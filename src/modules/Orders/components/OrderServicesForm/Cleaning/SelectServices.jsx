import { useEffect, Fragment, useState } from "react";

import {
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import * as Yup from "yup";

import { incrementSteps } from "../../../state/orderFormSteps";
import { useSelector, useDispatch } from "react-redux";
import { orderFormDataSelector, updateVal } from "../../../state/orderFormData";

import {
  mdiAlertCircle,
  mdiCheck,
  mdiCloseCircle,
  mdiDeleteOutline,
  mdiPencil,
  mdiPlus,
} from "@mdi/js";

import Icon from "../../../../../shared/components/Icon";
import NumberInput from "../../../../../shared/components/inputs/NumberInput";
import Autocomplete from "../../../../../shared/components/inputs/Autocomplete";
import CounterInput from "../../../../../shared/components/inputs/CounterInput";
import IconButton from "../../../../../shared/components/IconButton";

import {
  useGetAllCompanyServicesQuery,
  useGetCompanyServicesTreeQuery,
} from "../../../../../redux/services/general";
import {
  CLEANING_FREQUENCY_TYPES,
  ORDER_TYPES,
} from "../../../../../constants/system";

import DatePicker from "../../../../../shared/components/inputs/DatePicker";
import DateTimePicker from "../../../../../shared/components/inputs/DateTimePicker";
import { endOfToday } from "date-fns";
import TimePicker from "../../../../../shared/components/inputs/TimePicker";
import Dialog from "../../../../../shared/components/Dialog";
import TextInput from "../../../../../shared/components/inputs/TextInput";
import ImageDropbox from "../../../../../shared/components/inputs/ImageDropbox";
import MultiDatePicker from "../../../../../shared/components/inputs/MultiDatePicker";

const SelectSerivces = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");
  const { selectedServiceType, categories } = useSelector(
    orderFormDataSelector
  );
  const dispatch = useDispatch();
  const [filterdServices, setSilterdServices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState({});
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [servicess, setServicess] = useState([]);

  const DATE = new Date();

  const { isLoading, data: allServices = [] } =
    useGetCompanyServicesTreeQuery(undefined);

  const formik = useFormik({
    // validateOnMount: true,
    // validateOnBlur: true,
    // validateOnChange: true,
    initialValues: {
      categories: [
        {
          service_type: "",
          include_laundry: false,
          repetition_type: 2, // 1 = one time order , 2 = recurring order
          frequency: null, // 1 = Daily ,2 = Custom
          schedule: {
            from_date: DATE,
            to_date: DATE,
            from_time: DATE,
            to_time: DATE,
          },
        },
      ],
    },
    validationSchema: Yup.object().shape({
      categories: Yup.array().of(
        Yup.object().shape({
          service_type: Yup.string().required(t("requiredField")),
          include_laundry: Yup.boolean().required(t("requiredField")),
          repetition_type: Yup.number().required(t("requiredField")),

          schedule: Yup.object().shape({
            from_date: Yup.date()
              .default(() => DATE)
              .required(t("requiredField")),
            to_date: Yup.date().when(
              "from_date",
              (from_date, schema) =>
                from_date && schema.min(from_date, t("rangeDateInvalid"))
            ),

            from_time: Yup.date().default(() => DATE),
            to_time: Yup.date().when(
              "from_time",
              (from_time, schema) =>
                from_time && schema.min(from_time, t("rangeTimeInvalid"))
            ),
          }),
        })
      ),
    }),
    onSubmit: (values) => {
      // category.schedule.date.toLocaleString()
      var categories = values.categories;
      categories.forEach((category) => {
        category.schedule = {
          date_string: category.schedule.date.toLocaleString("en-US"),
          from_time_string: category.schedule.from_time.toLocaleString("en-US"),
          to_time_string: category.schedule.to_time.toLocaleString("en-US"),
        };
      });
      dispatch(updateVal({ key: "categories", val: categories }));

      dispatch(incrementSteps());
    },
  });

  const { setFieldValue, values, errors } = formik;

  useEffect(() => {
    console.log(values);
  }, [values]);

  useEffect(() => {
    if (!isLoading) {
      setServicess(
        allServices.filter(
          (service) => service.slug.en === ORDER_TYPES.maintenance
        )[0].children
      );
    }
  }, [isLoading, allServices]);

  useEffect(() => {
    if (categories.length > 0) {
      values.categories = categories.map((category) => ({
        ...category,
        schedule: {
          date: new Date(category.schedule.date_string),
          from_time: new Date(category.schedule.from_time_string),
          to_time: new Date(category.schedule.to_time_string),
        },
      }));
    }
  }, []);

  const handleDialogOpen = (index) => {
    setCategoryIndex(index);
    setOpenDialog(true);
  };

  const addService = () => {
    const newServices = [
      ...formik.values.categories,
      {
        service_type: "",
        include_laundry: false,
        repetition_type: 2,
        frequency: null,
        schedule: {
          from_date: DATE,
          to_date: DATE,
          from_time: DATE,
          to_time: DATE,
        },
      },
    ];

    setFieldValue("categories", newServices);
  };
  const removeService = (index) => {
    const newServices = [...formik.values.categories];
    newServices.splice(index, 1);
    setFieldValue("categories", newServices);
  };

  const categoryIdChangeHandler = (index, serviceId, value) => {
    formik.setFieldValue(
      `categories[${index}].services[${serviceId}].category_id`,
      value
    );
    if (value) {
      formik.setFieldValue(
        `categories[${index}].services[${serviceId}].category_label`,
        formik.values.categories[index].services[
          serviceId
        ].selectedItemType.items.find((service) => service.id === value).name.en
      );
      formik.setFieldValue(
        `categories[${index}].services[${serviceId}].unit_cost`,
        formik.values.categories[index].services[
          serviceId
        ].selectedItemType.items.find((service) => service.id === value).price
      );
      formik.setFieldValue(
        `categories[${index}].services[${serviceId}].description`,
        formik.values.categories[index].services[
          serviceId
        ].selectedItemType.items.find((service) => service.id === value)
          .description
      );
    }
  };

  const resetCategory = (index, serviceType) => {
    formik.setFieldValue(`categories[${index}]`, {
      service_type: serviceType,
      include_laundry: false,
      repetition_type: 2,
      frequency: null,
      schedule: {
        from_date: DATE,
        to_date: DATE,
        from_time: DATE,
        to_time: DATE,
      },
    });
  };

  const removeAttachment = (index, attachmentId) => {
    const newAttachments = [...formik.values.categories[index].attachments];
    const newbaseImages = [...formik.values.categories[index].baseImages];

    newAttachments.splice(attachmentId, 1);
    newbaseImages.splice(attachmentId, 1);

    setFieldValue(`categories[${index}].attachments`, newAttachments);
    setFieldValue(`categories[${index}].baseImages`, newbaseImages);
  };

  if (isLoading) return null;
  return (
    <Grid container spacing={5} component="form" onSubmit={formik.handleSubmit}>
      <Grid item xs={12}>
        <Typography component="h6" variant="h6">
          {t("selectServices")}
        </Typography>
      </Grid>
      {formik.values.categories.map((category, index) => (
        <Fragment key={index}>
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{ py: 2, px: 3 }}
              style={{
                backgroundColor: "#fafafa",
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  mb={6}
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography component="h6" variant="h6">
                      {t("service")} {index + 1}
                    </Typography>
                  </Grid>
                  {formik.values.categories.length > 1 && (
                    <Grid item>
                      <IconButton
                        aria-label="remove category"
                        icon={mdiDeleteOutline}
                        size="small"
                        shape="rounded"
                        color="error"
                        onClick={() => removeService(index)}
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    required
                    name={`categories[${index}].service_type`}
                    label={t("serviceType")}
                    options={servicess.map((service) => ({
                      value: service.id,
                      label:
                        language === "en" ? service.name.en : service.name.ar,
                    }))}
                    noOptionsText={t("noServices")}
                    value={category.service_type}
                    onChange={(e) => {
                      resetCategory(index, e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.categories?.[index]?.service_type &&
                      !!formik.errors.categories?.[index]?.service_type
                    }
                    helperText={
                      formik.touched.categories?.[index]?.service_type &&
                      formik.errors.categories?.[index]?.service_type
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    label="Include Laundry Services in Order."
                    control={
                      <Checkbox
                        size="medium"
                        checked={category.include_laundry}
                        onChange={(e) => {
                          formik.setFieldValue(
                            `categories[${index}].include_laundry`,
                            e.target.checked
                          );
                        }}
                      />
                    }
                  />
                </Grid>
                {category.service_type && (
                  <>
                    <Grid item mt={2} xs={12}>
                      <Typography variant="subtitle1">
                        {t("scheduleService")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="cleaning-order-repetition-type-radio"
                          name="row-radio-buttons-group"
                          defaultValue="2"
                          onChange={(e) => {
                            formik.setFieldValue(
                              `categories[${index}].repetition_type`,
                              e.target.value
                            );
                          }}
                        >
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="One time order"
                          />
                          <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label="Recurring order"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        required
                        name={`categories[${index}].frequency`}
                        label={t("frequency")}
                        options={CLEANING_FREQUENCY_TYPES.map((frequency) => ({
                          value: frequency.id,
                          label:
                            language === "en"
                              ? frequency.name.en
                              : frequency.name.ar,
                        }))}
                        value={category.frequency}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.categories?.[index]?.frequency &&
                          !!formik.errors.categories?.[index]?.frequency
                        }
                        helperText={
                          formik.touched.categories?.[index]?.frequency &&
                          formik.errors.categories?.[index]?.frequency
                        }
                      />
                    </Grid>
                    {category.frequency && (
                      <>
                        {category.frequency === "1" ? (
                          <Grid item container spacing={2} mt={1}>
                            <Grid item xs={6}>
                              <Paper>
                                <DatePicker
                                  name={`categories[${index}].schedule.from_date`}
                                  label={t("selectStartDate")}
                                  value={category.schedule.from_date}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.categories?.[index]?.schedule
                                      ?.from_date &&
                                    !!formik.errors.categories?.[index]
                                      ?.schedule?.from_date
                                  }
                                  helperText={
                                    formik.touched.categories?.[index]?.schedule
                                      ?.from_date &&
                                    formik.errors.categories?.[index]?.schedule
                                      ?.from_date
                                  }
                                  shouldDisableDate={(date) =>
                                    date <= endOfToday()
                                  }
                                />
                              </Paper>
                            </Grid>
                            <Grid item xs={6}>
                              <Paper>
                                <DatePicker
                                  name={`categories[${index}].schedule.to_date`}
                                  label={t("selectEndDate")}
                                  value={category.schedule.to_date}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.categories?.[index]?.schedule
                                      ?.to_date &&
                                    !!formik.errors.categories?.[index]
                                      ?.schedule?.to_date
                                  }
                                  helperText={
                                    formik.touched.categories?.[index]?.schedule
                                      ?.to_date &&
                                    formik.errors.categories?.[index]?.schedule
                                      ?.to_date
                                  }
                                  shouldDisableDate={(date) =>
                                    date <= endOfToday()
                                  }
                                />
                              </Paper>
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid item xs={12}>
                            <MultiDatePicker />
                          </Grid>
                        )}
                        <Grid item container spacing={2}>
                          <Grid item xs={6}>
                            <Paper>
                              <TimePicker
                                name={`categories[${index}].schedule.from_time`}
                                label={t("visitTimeFrom")}
                                value={category.schedule.from_time}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.categories?.[index]?.schedule
                                    ?.from_time &&
                                  !!formik.errors.categories?.[index]?.schedule
                                    ?.from_time
                                }
                                helperText={
                                  formik.touched.categories?.[index]?.schedule
                                    ?.from_time &&
                                  formik.errors.categories?.[index]?.schedule
                                    ?.from_time
                                }
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper>
                              <TimePicker
                                name={`categories[${index}].schedule.to_time`}
                                label={t("visitTimeTo")}
                                value={category.schedule.to_time}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.categories?.[index]?.schedule
                                    ?.to_time &&
                                  !!formik.errors.categories?.[index]?.schedule
                                    ?.to_time
                                }
                                helperText={
                                  formik.touched.categories?.[index]?.schedule
                                    ?.to_time &&
                                  formik.errors.categories?.[index]?.schedule
                                    ?.to_time
                                }
                              />
                            </Paper>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Fragment>
      ))}
      {/* control buttons */}
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            disabled={!!formik.errors.categories}
            variant="outlined"
            sx={{ mt: 1, mr: 1 }}
            onClick={addService}
            startIcon={<Icon icon={mdiPlus} />}
          >
            {t("addService")}
          </Button>
          <Button
            disabled={!!formik.errors.categories}
            type="submit"
            variant="contained"
            sx={{ mt: 1, mr: 1 }}
          >
            {t("preview")}
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default SelectSerivces;
