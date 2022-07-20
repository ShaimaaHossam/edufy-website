import { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import {
  orderFormDataSelector,
  updateVal,
  updateCategory,
} from "../../../state/orderFormData";

import { endOfToday } from "date-fns";
import * as Yup from "yup";
import {
  mdiAlertCircle,
  mdiCheck,
  mdiCloseCircle,
  mdiDeleteOutline,
  mdiPencil,
} from "@mdi/js";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";

import { useGetCompanyServicesTreeQuery } from "../../../../../redux/services/general";
import { ORDER_TYPES } from "../../../../../constants/system";

import Autocomplete from "../../../../../shared/components/inputs/Autocomplete";
import IconButton from "../../../../../shared/components/IconButton";
import CounterInput from "../../../../../shared/components/inputs/CounterInput";
import Icon from "../../../../../shared/components/Icon";
import NumberInput from "../../../../../shared/components/inputs/NumberInput";
import Dialog from "../../../../../shared/components/Dialog";
import DatePicker from "../../../../../shared/components/inputs/DatePicker";
import TimePicker from "../../../../../shared/components/inputs/TimePicker";
import TextInput from "../../../../../shared/components/inputs/TextInput";
import ImageDropbox from "../../../../../shared/components/inputs/ImageDropbox";
import useNavigationBlocker from "../../../../../shared/hooks/useNavigationBlocker";

const ServiceEdit = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");
  const dispatch = useDispatch();

  const { categories, selectedServiceIdxToEdit, totalPrice } = useSelector(
    orderFormDataSelector
  );
  const [canLeave, setCanLeave] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [servicess, setServicess] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [price, setPrice] = useState("");

  const {
    isLoading,
    isFetching,
    data: allServices = [],
  } = useGetCompanyServicesTreeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const DATE = new Date();
  const formik = useFormik({
    // validateOnMount: false,
    // validateOnBlur: false,
    // validateOnChange: false,
    initialValues: {
      category: {
        service_type: categories[selectedServiceIdxToEdit].service_type,
        services: categories[selectedServiceIdxToEdit].services,
        schedule: {
          date: new Date(
            categories[selectedServiceIdxToEdit].schedule.date_string
          ),
          from_time: new Date(
            categories[selectedServiceIdxToEdit].schedule.from_time_string
          ),
          to_time: new Date(
            categories[selectedServiceIdxToEdit].schedule.to_time_string
          ),
        },
        note: categories[selectedServiceIdxToEdit].note,
        attachments: categories[selectedServiceIdxToEdit].attachments,
        baseImages: categories[selectedServiceIdxToEdit].baseImages,
      },
    },
    validationSchema: Yup.object().shape({
      category: Yup.object().shape({
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
          date: Yup.date().required(t("requiredField")),
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
      }),
    }),
    onSubmit: (values) => {
      // category.schedule.date.toLocaleString()

      const data = {
        ...values.category,
        schedule: {
          date_string: values.category.schedule.date.toLocaleString("en-US"),
          from_time_string:
            values.category.schedule.from_time.toLocaleString("en-US"),
          to_time_string:
            values.category.schedule.to_time.toLocaleString("en-US"),
        },
      };

      const total = data.services.reduce((acc, service) => {
        return acc + service.unit_cost * service.quantity;
      }, 0);

      if (total !== price) {
        dispatch(
          updateVal({
            key: "totalPrice",
            val: totalPrice - price + total,
          })
        );
      }
      dispatch(updateCategory({ index: selectedServiceIdxToEdit, val: data }));
      dispatch(updateVal({ key: "editService", val: false }));
    },
  });
  const { values, errors, setFieldValue } = formik;

  useNavigationBlocker(!canLeave, () => setLeaveDialogOpen(true));

  useEffect(() => {
    if (!isLoading || !isFetching) {
      setServicess(
        allServices.filter(
          (service) => service.slug.en === ORDER_TYPES.maintenance
        )[0].children
      );
    }
  }, [isLoading, isFetching, allServices]);

  useEffect(() => {
    setPrice(
      categories[selectedServiceIdxToEdit].services.reduce((acc, service) => {
        return acc + service.unit_cost * service.quantity;
      }, 0)
    );
  }, []);

  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  const categoryIdChangeHandler = (serviceId, value) => {
    formik.setFieldValue(`category.services[${serviceId}].category_id`, value);
    if (value) {
      formik.setFieldValue(
        `category.services[${serviceId}].category_label`,
        formik.values.category.services[serviceId].selectedItemType.items.find(
          (service) => service.id === value
        ).name.en
      );
      formik.setFieldValue(
        `category.services[${serviceId}].unit_cost`,
        formik.values.category.services[serviceId].selectedItemType.items.find(
          (service) => service.id === value
        ).price
      );
      formik.setFieldValue(
        `category.services[${serviceId}].description`,
        formik.values.category.services[serviceId].selectedItemType.items.find(
          (service) => service.id === value
        ).description
      );
    }
  };

  const addSubService = () => {
    const newSubServices = [
      ...formik.values.category.services,
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
    setFieldValue(`category.services`, newSubServices);
  };

  const removeSubService = (serviceId) => {
    const newSubServices = [...formik.values.category.services];
    newSubServices.splice(serviceId, 1);
    setFieldValue(`category.services`, newSubServices);
  };

  const resetCategory = (serviceType) => {
    formik.setFieldValue(`category`, {
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

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const removeAttachment = (attachmentId) => {
    const newAttachments = [...formik.values.category.attachments];
    const newbaseImages = [...formik.values.category.baseImages];

    newAttachments.splice(attachmentId, 1);
    newbaseImages.splice(attachmentId, 1);

    setFieldValue(`category.attachments`, newAttachments);
    setFieldValue(`category.baseImages`, newbaseImages);
  };

  if (isLoading || isFetching) return null;

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Grid item>
        <Typography component="h6" variant="h6">
          {t("EditService")}
        </Typography>
      </Grid>
      {servicess.length > 0 && (
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
                    {t("service")} {selectedServiceIdxToEdit + 1}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="remove category"
                    icon={mdiDeleteOutline}
                    size="small"
                    shape="rounded"
                    color="error"
                    // onClick={() => removeService(index)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  required
                  name={`category.service_type`}
                  label={t("serviceType")}
                  options={servicess.map((service) => ({
                    value: service.id,
                    label:
                      language === "en" ? service.name.en : service.name.ar,
                  }))}
                  noOptionsText={t("noServices")}
                  value={formik.values.category.service_type}
                  onChange={(e) => {
                    resetCategory(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  // error={
                  //   formik.touched.category.service_type &&
                  //   !!formik.errors.category.service_type
                  // }
                  // helperText={
                  //   formik.touched.category.service_type &&
                  //   formik.errors.category.service_type
                  // }
                />
              </Grid>
              {formik.values.category.service_type && (
                <>
                  {!!formik.values.category.services.length && (
                    <>
                      {formik.values.category.services.map((service, idx) => (
                        <Fragment key={idx}>
                          {idx ===
                          formik.values.category.services.length - 1 ? (
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
                                {formik.values.category.services.length > 1 && (
                                  <Grid item>
                                    <IconButton
                                      aria-label="remove service"
                                      icon={mdiDeleteOutline}
                                      size="small"
                                      shape="rounded"
                                      color="error"
                                      onClick={() => removeSubService(idx)}
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
                                      service.id ===
                                      formik.values.category.service_type
                                  )?.[0]
                                  ?.children?.map((item) => (
                                    <Grid item xs={3} key={item.id}>
                                      <Button
                                        onClick={() => {
                                          formik.setFieldValue(
                                            `category.services[${idx}].selectedItem`,
                                            item
                                          );
                                        }}
                                        sx={{
                                          color:
                                            item.id === service.selectedItem.id
                                              ? "primary.main"
                                              : "#000000",
                                          width: "100%",
                                          backgroundColor:
                                            item.id === service.selectedItem.id
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
                                                `category.services[${idx}].selectedItemType`,
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
                                    <Grid item xs={12} xl={6}>
                                      <Autocomplete
                                        name={`category.services[${idx}].category_id`}
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
                                            idx,
                                            e.target.value
                                          );
                                        }}
                                        onBlur={formik.handleBlur}
                                        error={
                                          formik.touched.category?.services?.[
                                            idx
                                          ]?.category_id &&
                                          !!formik.errors.category?.services?.[
                                            idx
                                          ]?.category_id
                                        }
                                        helperText={
                                          formik.touched.category?.services?.[
                                            idx
                                          ]?.category_id &&
                                          formik.errors.category?.services?.[
                                            idx
                                          ]?.category_id
                                        }
                                      />
                                    </Grid>
                                    <Grid item xs={4} xl={2}>
                                      <CounterInput
                                        name={`category.services[${idx}].quantity`}
                                        label={t("quantity")}
                                        value={service.quantity}
                                        disabled={!service.category_id}
                                        step={1}
                                        min={1}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                          formik.touched.category?.services?.[
                                            idx
                                          ]?.quantity &&
                                          !!formik.errors.category?.services?.[
                                            idx
                                          ]?.quantity
                                        }
                                        helperText={
                                          formik.touched.category?.services?.[
                                            idx
                                          ]?.quantity &&
                                          formik.errors.category?.services?.[
                                            idx
                                          ]?.quantity
                                        }
                                      />
                                    </Grid>
                                    <Grid item xs={4} xl={2}>
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
                                    <Grid item xs={4} xl={2}>
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
                                    <Grid item xs={12}>
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
                                      {
                                        formik.values.category.services[idx]
                                          .category_label
                                      }
                                    </Typography>
                                  )}
                                </Grid>
                                {formik.values.category.services.length > 1 && (
                                  <Grid item>
                                    <IconButton
                                      aria-label="toggle edit service"
                                      disabled={!!formik.errors.category}
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
                                      onClick={() => removeSubService(idx)}
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
                                          service.id ===
                                          formik.values.category.service_type
                                      )[0]
                                      .children.map((item) => (
                                        <Grid item xs={3} key={item.id}>
                                          <Button
                                            onClick={() => {
                                              formik.setFieldValue(
                                                `category.services[${idx}].selectedItem`,
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
                                                    `category.services[${idx}].selectedItemType`,
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
                                        <Grid item xs={12} xl={6}>
                                          <Autocomplete
                                            name={`category.services[${idx}].category_id`}
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
                                                idx,
                                                e.target.value
                                              );
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={
                                              formik.touched.category
                                                ?.services?.[idx]
                                                ?.category_id &&
                                              !!formik.errors.category
                                                ?.services?.[idx]?.category_id
                                            }
                                            helperText={
                                              formik.touched.category
                                                ?.services?.[idx]
                                                ?.category_id &&
                                              formik.errors.category
                                                ?.services?.[idx]?.category_id
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs={4} xl={2}>
                                          <CounterInput
                                            name={`category.services[${idx}].quantity`}
                                            label={t("quantity")}
                                            value={service.quantity}
                                            disabled={!service.category_id}
                                            step={1}
                                            min={1}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                              formik.touched.category
                                                ?.services?.[idx]?.quantity &&
                                              !!formik.errors.category
                                                ?.services?.[idx]?.quantity
                                            }
                                            helperText={
                                              formik.touched.category
                                                ?.services?.[idx]?.quantity &&
                                              formik.errors.category
                                                ?.services?.[idx]?.quantity
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs={4} xl={2}>
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
                                        <Grid item xs={4} xl={2}>
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
                                        <Grid item xs={12}>
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
                                </>
                              )}
                            </Grid>
                          )}

                          {formik.values.category.services.length === idx + 1 &&
                            service.category_id && (
                              <Grid item xs={12}>
                                <Button
                                  sx={{ backgroundColor: "#ffffff" }}
                                  variant="outlined"
                                  onClick={addSubService}
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
                          onClick={handleDialogOpen}
                        >
                          {t("addNote")}
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography mb={2} variant="subtitle1">
                          {t("scheduleService")}
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={4} xl={6}>
                            <Paper>
                              <DatePicker
                                name={`category.schedule.date`}
                                label={t("selectDate")}
                                value={formik.values.category.schedule.date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.category?.schedule?.date &&
                                  !!formik.errors.category?.schedule?.date
                                }
                                helperText={
                                  formik.touched.category?.schedule?.date &&
                                  formik.errors.category?.schedule?.date
                                }
                                shouldDisableDate={(date) =>
                                  date <= endOfToday()
                                }
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={4} xl={3}>
                            <Paper>
                              <TimePicker
                                name={`category.schedule.from_time`}
                                label={t("visitTimeFrom")}
                                value={
                                  formik.values.category.schedule.from_time
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.category?.schedule
                                    ?.from_time &&
                                  !!formik.errors.category?.schedule?.from_time
                                }
                                helperText={
                                  formik.touched.category?.schedule
                                    ?.from_time &&
                                  formik.errors.category?.schedule?.from_time
                                }
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={4} xl={3}>
                            <Paper>
                              <TimePicker
                                name={`category.schedule.to_time`}
                                label={t("visitTimeTo")}
                                value={formik.values.category.schedule.to_time}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.category?.schedule?.to_time &&
                                  !!formik.errors.category?.schedule?.to_time
                                }
                                helperText={
                                  formik.touched.category?.schedule?.to_time &&
                                  formik.errors.category?.schedule?.to_time
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
      )}
      {/* control buttons */}
      <Grid item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            disabled={!!formik.errors.category}
            variant="outlined"
            sx={{ mt: 1, mr: 1 }}
            onClick={() =>
              dispatch(updateVal({ key: "editService", val: false }))
            }
          >
            {t("back")}
          </Button>
          <Button
            disabled={!!formik.errors.category}
            type="submit"
            variant="contained"
            color="success"
            sx={{ mt: 1, mr: 1 }}
          >
            {t("saveChanges")}
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
              name={`category.note`}
              label={t("noteDescription")}
              type="text"
              value={formik.values.category.note}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item container xs={12} spacing={2}>
            {formik.values.category.baseImages.map((baseImage, i) => (
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
                    onClick={() => removeAttachment(i)}
                  />
                </Grid>
              </Grid>
            ))}
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
                    ...formik.values.category.attachments,
                    path,
                  ];
                  setFieldValue(`category.attachments`, newImage);
                }}
                pushToBaseImages={(baseImage) => {
                  if (baseImage === "" || baseImage === undefined) {
                    return;
                  }
                  setFieldValue(`category.baseImages`, [
                    ...formik.values.category.baseImages,
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

export default ServiceEdit;
