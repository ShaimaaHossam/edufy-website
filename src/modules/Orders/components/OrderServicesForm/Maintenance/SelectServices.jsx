import { useEffect, Fragment, useState } from "react";

import { Button, Grid, Paper, Typography, Box, Divider } from "@mui/material";
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
import { ORDER_TYPES } from "../../../../../constants/system";

import DatePicker from "../../../../../shared/components/inputs/DatePicker";
import DateTimePicker from "../../../../../shared/components/inputs/DateTimePicker";
import { endOfToday } from "date-fns";
import TimePicker from "../../../../../shared/components/inputs/TimePicker";
import Dialog from "../../../../../shared/components/Dialog";
import TextInput from "../../../../../shared/components/inputs/TextInput";
import ImageDropbox from "../../../../../shared/components/inputs/ImageDropbox";
import useNavigationBlocker from "../../../../../shared/hooks/useNavigationBlocker";

const SelectSerivces = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");
  const { categories } = useSelector(orderFormDataSelector);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState({});
  const [canLeave, setCanLeave] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
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
          all_services_types: null,
          services: [
            {
              category_id: "",
              category_label: "",
              quantity: 1,
              items: [],
              selectedItem: "",
              itemTypes: [],
              selectedItemType: "",
              unit_cost: 0,
              description: {},
            },
          ],
          schedule: {
            date: DATE,
            from_time: DATE,
            to_time: DATE,
          },
          note: "",
          attachments: [],
          baseImages: [],
        },
      ],
    },

    validationSchema: Yup.object().shape({
      categories: Yup.array().of(
        Yup.object().shape({
          service_type: Yup.string().required(t("requiredField")),
          services: Yup.array().of(
            Yup.object().shape({
              category_id: Yup.string().required(t("requiredField")),
              quantity: Yup.number().required(t("requiredField")),
              selectedItem: Yup.object().required(t("requiredField")),
              selectedItemType: Yup.object().required(t("requiredField")),
              description: Yup.object(),
            })
          ),
          schedule: Yup.object().shape({
            date: Yup.date()
              .default(() => DATE)
              .required(t("requiredField")),
            from_time: Yup.date().default(() => DATE),
            to_time: Yup.date().when(
              "from_time",
              (from_time, schema) =>
                from_time &&
                schema.min(from_time, "End date can't be before Start date")
            ),
          }),
          note: Yup.string().nullable(),
          attachments: Yup.array().nullable(),
          baseImages: Yup.array().nullable(),
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

  const { setFieldValue, values, errors, dirty } = formik;

  useNavigationBlocker(dirty && !canLeave, () => setLeaveDialogOpen(true));
  servicess
    .filter((service) => {
      return !formik.values.categories
        .map((category) => category.service_type)
        .includes(service.id);
    })
    .map((service) => ({
      value: service.id,
      label: language === "en" ? service.name.en : service.name.ar,
    }));

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

  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  const handleDialogOpen = (index) => {
    setCategoryIndex(index);
    setOpenDialog(true);
  };

  const addSubService = (index) => {
    const newSubServices = [
      ...formik.values.categories[index].services,
      {
        category_id: "",
        category_label: "",
        quantity: 1,
        selectedItem: "",
        selectedItemType: "",
        unit_cost: 0,
        description: {},
      },
    ];
    setFieldValue(`categories[${index}].services`, newSubServices);
  };
  const removeSubService = (containerId, serviceId) => {
    const newSubServices = [...formik.values.categories[containerId].services];
    newSubServices.splice(serviceId, 1);
    setFieldValue(`categories[${containerId}].services`, newSubServices);
  };

  const addService = () => {
    const newServices = [
      ...formik.values.categories,
      {
        service_type: "",
        services: [
          {
            category_id: "",
            category_label: "",
            quantity: 1,
            selectedItem: "",
            selectedItemType: "",
            unit_cost: 0,
            description: {},
          },
        ],
        schedule: {
          date: DATE,
          from_time: DATE,
          to_time: DATE,
        },
        note: "",
        attachments: [],
        baseImages: [],
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
      services: [
        {
          category_id: "",
          category_label: "",
          quantity: 1,
          items: [],
          selectedItem: "",
          itemTypes: [],
          selectedItemType: "",
          unit_cost: 0,
          description: {},
        },
      ],
      schedule: {
        date: DATE,
        from_time: DATE,
        to_time: DATE,
      },
      note: "",
      attachments: [],
      baseImages: [],
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
                    options={servicess
                      .filter((service) => {
                        return !formik.values.categories
                          .filter(
                            (cat) => cat.service_type !== category.service_type
                          )
                          .map((category) => category.service_type)
                          .includes(service.id);
                      })
                      .map((service) => ({
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
                {category.service_type && (
                  <>
                    {!!category.services.length && (
                      <>
                        {category.services.map((service, idx) => (
                          <Fragment key={idx}>
                            {idx === category.services.length - 1 ? (
                              <Grid item container xs={12}>
                                <Grid item xs={12} m={2}>
                                  <Divider sx={{ borderColor: "lightgray" }} />
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  container
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Grid item>
                                    <Typography mb={2} variant="subtitle1">
                                      Select Item
                                    </Typography>
                                  </Grid>
                                  {category.services.length > 1 && (
                                    <Grid item>
                                      <IconButton
                                        aria-label="remove service"
                                        icon={mdiDeleteOutline}
                                        size="small"
                                        shape="rounded"
                                        color="error"
                                        onClick={() =>
                                          removeSubService(index, idx)
                                        }
                                      />
                                    </Grid>
                                  )}
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  container
                                  rowSpacing={3}
                                  columnSpacing={6}
                                >
                                  {servicess
                                    .filter(
                                      (service) =>
                                        service.id === category.service_type
                                    )[0]
                                    .children.map((item) => (
                                      <Grid item xs={3} key={item.id}>
                                        <Button
                                          onClick={() => {
                                            formik.setFieldValue(
                                              `categories[${index}].services[${idx}].selectedItem`,
                                              item
                                            );
                                          }}
                                          sx={{
                                            color:
                                              item.id ===
                                              service.selectedItem.id
                                                ? "primary.main"
                                                : "#000000",
                                            width: "100%",
                                            backgroundColor:
                                              item.id ===
                                              service.selectedItem.id
                                                ? "#F4F6FC"
                                                : "#ffffff",
                                          }}
                                          variant="outlined"
                                        >
                                          {language === "en"
                                            ? item.name.en
                                            : item.name.ar}
                                        </Button>
                                      </Grid>
                                    ))}
                                </Grid>
                                {service.selectedItem && (
                                  <Grid item xs={12}>
                                    <Typography my={2} variant="subtitle1">
                                      Select Item Type
                                    </Typography>
                                    <Grid
                                      container
                                      rowSpacing={3}
                                      columnSpacing={{ xs: 1, sm: 2, md: 6 }}
                                    >
                                      {service.selectedItem.children.map(
                                        (item) => (
                                          <Grid item xs={3} key={item.id}>
                                            <Button
                                              onClick={() => {
                                                formik.setFieldValue(
                                                  `categories[${index}].services[${idx}].selectedItemType`,
                                                  item
                                                );
                                              }}
                                              sx={{
                                                color:
                                                  item.id ===
                                                  service.selectedItemType.id
                                                    ? "primary.main"
                                                    : "#000000",
                                                width: "100%",
                                                backgroundColor:
                                                  item.id ===
                                                  service.selectedItemType.id
                                                    ? "#F4F6FC"
                                                    : "#ffffff",
                                              }}
                                              variant="outlined"
                                            >
                                              {language === "en"
                                                ? item.name.en
                                                : item.name.ar}
                                            </Button>
                                          </Grid>
                                        )
                                      )}
                                    </Grid>
                                  </Grid>
                                )}
                                {service.selectedItemType && (
                                  <Grid item xs={12}>
                                    <Typography my={2} variant="subtitle1">
                                      {t("selectService")}
                                    </Typography>
                                    <Grid container spacing={2}>
                                      <Grid item xs={6}>
                                        <Autocomplete
                                          name={`categories[${index}].services[${idx}].category_id`}
                                          label={t("service")}
                                          options={service.selectedItemType.items.map(
                                            (item) => ({
                                              value: item.id,
                                              label:
                                                language === "en"
                                                  ? item.name.en
                                                  : item.name.ar,
                                              price: item.price,
                                            })
                                          )}
                                          noOptionsText={t("noServices")}
                                          value={service.category_id}
                                          onChange={(e) => {
                                            categoryIdChangeHandler(
                                              index,
                                              idx,
                                              e.target.value
                                            );
                                          }}
                                          onBlur={formik.handleBlur}
                                          error={
                                            formik.touched.categories?.[index]
                                              ?.services?.[idx]?.category_id &&
                                            !!formik.errors.categories?.[index]
                                              ?.services?.[idx]?.category_id
                                          }
                                          helperText={
                                            formik.touched.categories?.[index]
                                              ?.services?.[idx]?.category_id &&
                                            formik.errors.categories?.[index]
                                              ?.services?.[idx]?.category_id
                                          }
                                        />
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 1,
                                          }}
                                          component="div"
                                        >
                                          <Icon
                                            icon={mdiAlertCircle}
                                            size="small"
                                            color="warning"
                                          />
                                          <Typography
                                            ml={1}
                                            color={"#FFA303"}
                                            variant="subtitle2"
                                          >
                                            {t("servicePriceVatInfo")}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <CounterInput
                                          name={`categories[${index}].services[${idx}].quantity`}
                                          label={t("quantity")}
                                          value={service.quantity}
                                          disabled={!service.category_id}
                                          step={1}
                                          min={1}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          error={
                                            formik.touched.categories?.[index]
                                              ?.services?.[idx]?.quantity &&
                                            !!formik.errors.categories?.[index]
                                              ?.services?.[idx]?.quantity
                                          }
                                          helperText={
                                            formik.touched.categories?.[index]
                                              ?.services?.[idx]?.quantity &&
                                            formik.errors.categories?.[index]
                                              ?.services?.[idx]?.quantity
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={2}>
                                        <NumberInput
                                          name="unit_cost"
                                          label={t("unitPrice")}
                                          unit={t("sr")}
                                          value={
                                            service.category_id
                                              ? service.unit_cost
                                              : "0"
                                          }
                                          fixedValue
                                          isDecimal
                                        />
                                      </Grid>
                                      <Grid item xs={2}>
                                        <NumberInput
                                          name="total_cost"
                                          label={t("totalPrice")}
                                          unit={t("sr")}
                                          value={
                                            service.category_id
                                              ? service.unit_cost *
                                                service.quantity
                                              : "0"
                                          }
                                          fixedValue
                                          isDecimal
                                        />
                                      </Grid>
                                      {service.category_id && (
                                        <Grid item xs={12}>
                                          <Paper
                                            sx={{
                                              backgroundColor: "#FFF7D4",
                                              px: 2,
                                              py: 1,
                                            }}
                                          >
                                            <Grid container>
                                              <Grid item xs={12}>
                                                <Typography
                                                  color="warning.main"
                                                  variant="body2"
                                                >
                                                  {t("serviceDescription")}
                                                </Typography>
                                              </Grid>
                                              <Grid item xs={12}>
                                                <Typography variant="body2">
                                                  {language === "en"
                                                    ? service.description.en
                                                    : service.description.ar}
                                                </Typography>
                                              </Grid>
                                            </Grid>
                                          </Paper>
                                        </Grid>
                                      )}
                                    </Grid>
                                  </Grid>
                                )}
                              </Grid>
                            ) : (
                              <Grid item container xs={12}>
                                <Grid item xs={12} m={2}>
                                  <Divider sx={{ borderColor: "lightgray" }} />
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  container
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Grid item>
                                    {idx === selectedIndex ? (
                                      <Typography mb={2} variant="subtitle1">
                                        Select Item
                                      </Typography>
                                    ) : (
                                      <Typography mb={2} variant="subtitle1">
                                        {t("service")} {idx + 1} :
                                        {category.services[idx].category_label}
                                      </Typography>
                                    )}
                                  </Grid>
                                  {category.services.length > 1 && (
                                    <Grid item>
                                      <IconButton
                                        aria-label="toggle edit service"
                                        disabled={!!formik.errors.categories}
                                        icon={
                                          idx === selectedIndex
                                            ? mdiCheck
                                            : mdiPencil
                                        }
                                        size="small"
                                        shape="rounded"
                                        color={
                                          idx === selectedIndex
                                            ? "success"
                                            : "primary"
                                        }
                                        onClick={() => handleClick(idx)}
                                      />
                                      <IconButton
                                        aria-label="remove service"
                                        icon={mdiDeleteOutline}
                                        size="small"
                                        shape="rounded"
                                        color="error"
                                        onClick={() =>
                                          removeSubService(index, idx)
                                        }
                                      />
                                    </Grid>
                                  )}
                                </Grid>
                                {idx === selectedIndex && (
                                  <>
                                    <Grid
                                      item
                                      xs={12}
                                      container
                                      rowSpacing={3}
                                      columnSpacing={6}
                                    >
                                      {servicess
                                        .filter(
                                          (service) =>
                                            service.id === category.service_type
                                        )[0]
                                        .children.map((item) => (
                                          <Grid item xs={3} key={item.id}>
                                            <Button
                                              onClick={() => {
                                                formik.setFieldValue(
                                                  `categories[${index}].services[${idx}].selectedItem`,
                                                  item
                                                );
                                              }}
                                              sx={{
                                                color:
                                                  item.id ===
                                                  service.selectedItem.id
                                                    ? "primary.main"
                                                    : "#000000",
                                                width: "100%",
                                                backgroundColor:
                                                  item.id ===
                                                  service.selectedItem.id
                                                    ? "#F4F6FC"
                                                    : "#ffffff",
                                              }}
                                              variant="outlined"
                                            >
                                              {language === "en"
                                                ? item.name.en
                                                : item.name.ar}
                                            </Button>
                                          </Grid>
                                        ))}
                                    </Grid>
                                    {service.selectedItem && (
                                      <Grid item xs={12}>
                                        <Typography my={2} variant="subtitle1">
                                          Select Item Type
                                        </Typography>
                                        <Grid
                                          container
                                          rowSpacing={3}
                                          columnSpacing={{
                                            xs: 1,
                                            sm: 2,
                                            md: 6,
                                          }}
                                        >
                                          {service.selectedItem.children.map(
                                            (item) => (
                                              <Grid item xs={3} key={item.id}>
                                                <Button
                                                  onClick={() => {
                                                    formik.setFieldValue(
                                                      `categories[${index}].services[${idx}].selectedItemType`,
                                                      item
                                                    );
                                                  }}
                                                  sx={{
                                                    color:
                                                      item.id ===
                                                      service.selectedItemType
                                                        .id
                                                        ? "primary.main"
                                                        : "#000000",
                                                    width: "100%",
                                                    backgroundColor:
                                                      item.id ===
                                                      service.selectedItemType
                                                        .id
                                                        ? "#F4F6FC"
                                                        : "#ffffff",
                                                  }}
                                                  variant="outlined"
                                                >
                                                  {language === "en"
                                                    ? item.name.en
                                                    : item.name.ar}
                                                </Button>
                                              </Grid>
                                            )
                                          )}
                                        </Grid>
                                      </Grid>
                                    )}
                                    {service.selectedItemType && (
                                      <Grid item xs={12}>
                                        <Typography my={2} variant="subtitle1">
                                          {t("selectService")}
                                        </Typography>
                                        <Grid container spacing={2}>
                                          <Grid item xs={6}>
                                            <Autocomplete
                                              name={`categories[${index}].services[${idx}].category_id`}
                                              label={t("service")}
                                              options={service.selectedItemType.items.map(
                                                (item) => ({
                                                  value: item.id,
                                                  label:
                                                    language === "en"
                                                      ? item.name.en
                                                      : item.name.ar,
                                                  price: item.price,
                                                })
                                              )}
                                              noOptionsText={t("noServices")}
                                              value={service.category_id}
                                              onChange={(e) => {
                                                categoryIdChangeHandler(
                                                  index,
                                                  idx,
                                                  e.target.value
                                                );
                                              }}
                                              onBlur={formik.handleBlur}
                                              error={
                                                formik.touched.categories?.[
                                                  index
                                                ]?.services?.[idx]
                                                  ?.category_id &&
                                                !!formik.errors.categories?.[
                                                  index
                                                ]?.services?.[idx]?.category_id
                                              }
                                              helperText={
                                                formik.touched.categories?.[
                                                  index
                                                ]?.services?.[idx]
                                                  ?.category_id &&
                                                formik.errors.categories?.[
                                                  index
                                                ]?.services?.[idx]?.category_id
                                              }
                                            />
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mt: 1,
                                              }}
                                              component="div"
                                            >
                                              <Icon
                                                icon={mdiAlertCircle}
                                                size="small"
                                                color="warning"
                                              />
                                              <Typography
                                                ml={1}
                                                color={"#FFA303"}
                                                variant="subtitle2"
                                              >
                                                {t("servicePriceVatInfo")}
                                              </Typography>
                                            </Box>
                                          </Grid>
                                          <Grid item xs={2}>
                                            <CounterInput
                                              name={`categories[${index}].services[${idx}].quantity`}
                                              label={t("quantity")}
                                              value={service.quantity}
                                              disabled={!service.category_id}
                                              step={1}
                                              min={1}
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              error={
                                                formik.touched.categories?.[
                                                  index
                                                ]?.services?.[idx]?.quantity &&
                                                !!formik.errors.categories?.[
                                                  index
                                                ]?.services?.[idx]?.quantity
                                              }
                                              helperText={
                                                formik.touched.categories?.[
                                                  index
                                                ]?.services?.[idx]?.quantity &&
                                                formik.errors.categories?.[
                                                  index
                                                ]?.services?.[idx]?.quantity
                                              }
                                            />
                                          </Grid>
                                          <Grid item xs={2}>
                                            <NumberInput
                                              name="unit_cost"
                                              label={t("unitPrice")}
                                              unit={t("sr")}
                                              value={
                                                service.category_id
                                                  ? service.unit_cost
                                                  : "0"
                                              }
                                              fixedValue
                                              isDecimal
                                            />
                                          </Grid>
                                          <Grid item xs={2}>
                                            <NumberInput
                                              name="total_cost"
                                              label={t("totalPrice")}
                                              unit={t("sr")}
                                              value={
                                                service.category_id
                                                  ? service.unit_cost *
                                                    service.quantity
                                                  : "0"
                                              }
                                              fixedValue
                                              isDecimal
                                            />
                                          </Grid>
                                          {service.category_id && (
                                            <Grid item xs={12}>
                                              <Paper
                                                sx={{
                                                  backgroundColor: "#FFF7D4",
                                                  px: 2,
                                                  py: 1,
                                                }}
                                              >
                                                <Grid container>
                                                  <Grid item xs={12}>
                                                    <Typography
                                                      color="warning.main"
                                                      variant="body2"
                                                    >
                                                      {t("serviceDescription")}
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                      {language === "en"
                                                        ? service.description.en
                                                        : service.description
                                                            .ar}
                                                    </Typography>
                                                  </Grid>
                                                </Grid>
                                              </Paper>
                                            </Grid>
                                          )}
                                        </Grid>
                                      </Grid>
                                    )}
                                  </>
                                )}
                              </Grid>
                            )}

                            {category.services.length === idx + 1 &&
                              service.category_id && (
                                <Grid item xs={12}>
                                  <Button
                                    sx={{ backgroundColor: "#ffffff" }}
                                    variant="outlined"
                                    onClick={() => {
                                      addSubService(index);
                                    }}
                                  >
                                    {t("addAdditionalService")}
                                  </Button>
                                </Grid>
                              )}
                          </Fragment>
                        ))}
                        <Grid item xs={12}>
                          <Divider sx={{ borderColor: "lightgray", my: 2 }} />
                          <Button
                            color="primary"
                            variant="text"
                            startIcon={<Icon icon={mdiPencil} />}
                            onClick={() => handleDialogOpen(index)}
                          >
                            {t("addNote")}
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography mb={2} variant="subtitle1">
                            {t("scheduleService")}
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Paper>
                                <DatePicker
                                  name={`categories[${index}].schedule.date`}
                                  label={t("selectDate")}
                                  value={category.schedule.date}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.categories?.[index]?.schedule
                                      ?.date &&
                                    !!formik.errors.categories?.[index]
                                      ?.schedule?.date
                                  }
                                  helperText={
                                    formik.touched.categories?.[index]?.schedule
                                      ?.date &&
                                    formik.errors.categories?.[index]?.schedule
                                      ?.date
                                  }
                                  shouldDisableDate={(date) =>
                                    date <= endOfToday()
                                  }
                                />
                              </Paper>
                            </Grid>
                            <Grid item xs={3}>
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
                                    !!formik.errors.categories?.[index]
                                      ?.schedule?.from_time
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
                            <Grid item xs={3}>
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
                                    !!formik.errors.categories?.[index]
                                      ?.schedule?.to_time
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

      <Dialog
        withoutTitle
        size="small"
        open={openDialog}
        confirmLabel={t("ok")}
        confirmColor="primary"
        onClose={() => {
          setOpenDialog(false);
          setImagePath("");
        }}
        onConfirm={() => setOpenDialog(false)}
      >
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextInput
              name={`categories[${categoryIndex}].note`}
              label={t("noteDescription")}
              type="text"
              value={formik.values.categories?.[categoryIndex]?.note}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item container xs={12} spacing={2}>
            {formik.values.categories?.[categoryIndex]?.baseImages.map(
              (baseImage, i) => (
                <Grid item container xs={3} key={i}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      borderRadius: 2,
                      display: "inline-block",
                      width: 70,
                      height: 73,
                      backgroundImage: `url(${baseImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    {/* <img src={attachment} alt="preview" /> */}
                  </Grid>
                  <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                    <IconButton
                      aria-label="delete attachment"
                      icon={mdiCloseCircle}
                      size="small"
                      shape="rounded"
                      onClick={() => removeAttachment(categoryIndex, i)}
                    />
                  </Grid>
                </Grid>
              )
            )}
            <Grid item xs={2}>
              <ImageDropbox
                lable={t("image")}
                imagePath={imagePath}
                setImagePath={setImagePath}
                initialValue={""}
                isMulti
                onChange={(path) => {
                  if (path === "" || path === undefined) {
                    return;
                  }

                  setImagePath(path);
                  const newImage = [
                    ...formik.values.categories[categoryIndex].attachments,
                    path,
                  ];
                  setFieldValue(
                    `categories[${categoryIndex}].attachments`,
                    newImage
                  );
                }}
                pushToBaseImages={(baseImage) => {
                  if (baseImage === "" || baseImage === undefined) {
                    return;
                  }
                  setFieldValue(`categories[${categoryIndex}].baseImages`, [
                    ...formik.values.categories[categoryIndex].baseImages,
                    baseImage,
                  ]);
                }}
                error={!!formik?.errors.logo_file}
                helperText={formik?.errors.logo_file || t("imageError")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        size="small"
        open={leaveDialogOpen}
        title={t("discardChanges")}
        titleColor="error"
        confirmLabel={t("discard")}
        confirmColor="error"
        onClose={() => setLeaveDialogOpen(false)}
        onConfirm={() => setCanLeave(true)}
      >
        {t("orderFormLeaveMessage")}
      </Dialog>
    </Grid>
  );
};

export default SelectSerivces;
