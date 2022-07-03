import { useEffect, Fragment, useState } from "react";

import { Button, Grid, Paper, Typography, Box, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { orderFormDataSelector, updateVal } from "../../../state/orderFormData";

import { mdiAlertCircle, mdiCheck, mdiDeleteOutline, mdiPencil } from "@mdi/js";

import Icon from "../../../../../shared/components/Icon";
import NumberInput from "../../../../../shared/components/inputs/NumberInput";
import Autocomplete from "../../../../../shared/components/inputs/Autocomplete";
import ScheduleService from "./ScheduleService";
import CounterInput from "../../../../../shared/components/inputs/CounterInput";
import IconButton from "../../../../../shared/components/IconButton";
const SelectSerivces = () => {
  const { t } = useTranslation("orders");
  const { selectedServiceType } = useSelector(orderFormDataSelector);
  const dispatch = useDispatch();
  const [filterdServices, setSilterdServices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  const services = [
    {
      value: "1",
      label: "service 1",
      price: 100,
    },
    {
      value: "2",
      label: "service 2",
      price: 150,
    },
    {
      value: "3",
      label: "service 3",
      price: 74,
    },
    {
      value: "4",
      label: "service 4",
      price: 50,
    },
    {
      value: "5",
      label: "service 5",
      price: 60,
    },
  ];
  const itemTypes = [
    {
      value: "1",
      label: "فوري",
    },
    {
      value: "2",
      label: "عادي",
    },
    {
      value: "3",
      label: "مركزي",
    },
  ];
  const items = [
    {
      value: "1",
      label: "سخانات",
    },
    {
      value: "2",
      label: "خزانات",
    },
    {
      value: "3",
      label: "مواطير",
    },
    {
      value: "4",
      label: "صفيات",
    },
    {
      value: "5",
      label: "عوامه",
    },
    {
      value: "6",
      label: "خلاط",
    },
    {
      value: "7",
      label: "أدوات صحيه",
    },
  ];

  const formik = useFormik({
    // validateOnMount: false,
    // validateOnBlur: false,
    // validateOnChange: false,
    initialValues: {
      servicesContainer: [
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
            },
          ],
        },
      ],
    },
    validationSchema: Yup.object().shape({
      servicesContainer: Yup.array().of(
        Yup.object().shape({
          service_type: Yup.string().required(t("requiredField")),
          services: Yup.array().of(
            Yup.object().shape({
              category_id: Yup.string().required(t("requiredField")),
              quantity: Yup.number().required(t("requiredField")),
              selectedItem: Yup.string().required(t("requiredField")),
              selectedItemType: Yup.string().required(t("requiredField")),
            })
          ),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
      // dispatch(
      //   updateVal({ key: "selectedServiceType", val: `${values.service_type}` })
      // );

      // dispatch(incrementSteps());
    },
  });

  const { setFieldValue } = formik;

  const addSubService = (index) => {
    const newSubServices = [
      ...formik.values.servicesContainer[index].services,
      {
        category_id: "",
        category_label: "",
        quantity: 1,
        selectedItem: "",
        selectedItemType: "",
        unit_cost: 0,
      },
    ];
    setFieldValue(`servicesContainer[${index}].services`, newSubServices);
  };
  const removeSubService = (containerId, serviceId) => {
    const newSubServices = [
      ...formik.values.servicesContainer[containerId].services,
    ];
    newSubServices.splice(serviceId, 1);
    setFieldValue(`servicesContainer[${containerId}].services`, newSubServices);
  };

  const addService = () => {
    const newServices = [
      ...formik.values.servicesContainer,
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
          },
        ],
      },
    ];
    console.log(newServices);
    setFieldValue("servicesContainer", newServices);
  };
  const removeService = (index) => {
    const newServices = [...formik.values.servicesContainer];
    newServices.splice(index, 1);
    setFieldValue("servicesContainer", newServices);
  };

  const categoryIdChangeHandler = (index, serviceId, value) => {
    formik.setFieldValue(
      `servicesContainer[${index}].services[${serviceId}].category_id`,
      value
    );
    if (value) {
      formik.setFieldValue(
        `servicesContainer[${index}].services[${serviceId}].category_label`,
        services.find((service) => service.value === value).label
      );
      formik.setFieldValue(
        `servicesContainer[${index}].services[${serviceId}].unit_cost`,
        services.find((service) => service.value === value).price
      );
    }
  };
  return (
    <Grid container spacing={5} component="form" onSubmit={formik.handleSubmit}>
      <Grid item xs={12}>
        <Typography component="h6" variant="h6">
          Select Services
        </Typography>
      </Grid>
      {formik.values.servicesContainer.map((serviceContainer, index) => (
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
                <Grid item xs={12}>
                  <Typography mb={6} component="h6" variant="h6">
                    Service {index + 1}
                  </Typography>
                  <Autocomplete
                    required
                    name={`servicesContainer[${index}].service_type`}
                    label="service type"
                    options={services}
                    noOptionsText={t("noProperties")}
                    value={serviceContainer.service_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.servicesContainer?.[index]?.service_type &&
                      !!formik.errors.servicesContainer?.[index]?.service_type
                    }
                    helperText={
                      formik.touched.servicesContainer?.[index]?.service_type &&
                      formik.errors.servicesContainer?.[index]?.service_type
                    }
                  />
                </Grid>
                {serviceContainer.service_type && (
                  <>
                    {!!serviceContainer.services.length && (
                      <>
                        {serviceContainer.services.map((service, idx) => (
                          <Fragment key={idx}>
                            {idx === serviceContainer.services.length - 1 ? (
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
                                  {serviceContainer.services.length > 1 && (
                                    <Grid item>
                                      <IconButton
                                        aria-label="toggle filters visibility"
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
                                  {items.map((item) => (
                                    <Grid item xs={3} key={item.value}>
                                      <Button
                                        onClick={() => {
                                          formik.setFieldValue(
                                            `servicesContainer[${index}].services[${idx}].selectedItem`,
                                            item.value
                                          );
                                        }}
                                        sx={{
                                          color:
                                            item.value === service.selectedItem
                                              ? "primary.main"
                                              : "#000000",
                                          width: "100%",
                                          backgroundColor:
                                            item.value === service.selectedItem
                                              ? "#F4F6FC"
                                              : "#ffffff",
                                        }}
                                        variant="outlined"
                                      >
                                        {item.label}
                                      </Button>
                                    </Grid>
                                  ))}
                                </Grid>
                                {service.selectedItem && (
                                  <Grid item xs={12}>
                                    <Typography mb={2} variant="subtitle1">
                                      Select Item Type
                                    </Typography>
                                    <Grid
                                      container
                                      rowSpacing={3}
                                      columnSpacing={{ xs: 1, sm: 2, md: 6 }}
                                    >
                                      {itemTypes.map((item) => (
                                        <Grid item xs={3} key={item.value}>
                                          <Button
                                            onClick={() => {
                                              formik.setFieldValue(
                                                `servicesContainer[${index}].services[${idx}].selectedItemType`,
                                                item.value
                                              );
                                            }}
                                            sx={{
                                              color:
                                                item.value ===
                                                service.selectedItemType
                                                  ? "primary.main"
                                                  : "#000000",
                                              width: "100%",
                                              backgroundColor:
                                                item.value ===
                                                service.selectedItemType
                                                  ? "#F4F6FC"
                                                  : "#ffffff",
                                            }}
                                            variant="outlined"
                                          >
                                            {item.label}
                                          </Button>
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </Grid>
                                )}
                                {service.selectedItemType && (
                                  <Grid item xs={12}>
                                    <Typography mb={2} variant="subtitle1">
                                      Select Service
                                    </Typography>
                                    <Grid container spacing={2}>
                                      <Grid item xs={6}>
                                        <Autocomplete
                                          name={`servicesContainer[${index}].services[${idx}].category_id`}
                                          label="service"
                                          options={services}
                                          noOptionsText={t("noProperties")}
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
                                            formik.touched.servicesContainer?.[
                                              index
                                            ]?.services?.[idx]?.category_id &&
                                            !!formik.errors.servicesContainer?.[
                                              index
                                            ]?.services?.[idx]?.category_id
                                          }
                                          helperText={
                                            formik.touched.servicesContainer?.[
                                              index
                                            ]?.services?.[idx]?.category_id &&
                                            formik.errors.servicesContainer?.[
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
                                            All Services prices are Vat
                                            inclusive.
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <CounterInput
                                          name={`servicesContainer[${index}].services[${idx}].quantity`}
                                          label={"Quantity"}
                                          value={service.quantity}
                                          disabled={!service.category_id}
                                          step={1}
                                          min={1}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          error={
                                            formik.touched.servicesContainer?.[
                                              index
                                            ]?.services?.[idx]?.quantity &&
                                            !!formik.errors.servicesContainer?.[
                                              index
                                            ]?.services?.[idx]?.quantity
                                          }
                                          helperText={
                                            formik.touched.servicesContainer?.[
                                              index
                                            ]?.services?.[idx]?.quantity &&
                                            formik.errors.servicesContainer?.[
                                              index
                                            ]?.services?.[idx]?.quantity
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={2}>
                                        <NumberInput
                                          name="unit_cost"
                                          label={"Unit cost"}
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
                                          label={"Total cost"}
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
                                                Service description
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Typography variant="body2">
                                                Select New installation with the
                                                installation of decorations
                                                accompanying the frame.
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Paper>
                                      </Grid>
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
                                        service {idx + 1} :
                                        {
                                          serviceContainer.services[idx]
                                            .category_label
                                        }
                                      </Typography>
                                    )}
                                  </Grid>
                                  {serviceContainer.services.length > 1 && (
                                    <Grid item>
                                      <IconButton
                                        aria-label="toggle filters visibility"
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
                                        aria-label="toggle filters visibility"
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
                                      mb={2}
                                    >
                                      {items.map((item) => (
                                        <Grid item xs={3} key={item.value}>
                                          <Button
                                            onClick={() => {
                                              formik.setFieldValue(
                                                `servicesContainer[${index}].services[${idx}].selectedItem`,
                                                item.value
                                              );
                                            }}
                                            sx={{
                                              color:
                                                item.value ===
                                                service.selectedItem
                                                  ? "primary.main"
                                                  : "#000000",
                                              width: "100%",
                                              backgroundColor:
                                                item.value ===
                                                service.selectedItem
                                                  ? "#F4F6FC"
                                                  : "#ffffff",
                                            }}
                                            variant="outlined"
                                          >
                                            {item.label}
                                          </Button>
                                        </Grid>
                                      ))}
                                    </Grid>
                                    {service.selectedItem && (
                                      <Grid item xs={12}>
                                        <Typography mb={2} variant="subtitle1">
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
                                          {itemTypes.map((item) => (
                                            <Grid
                                              item
                                              xs={3}
                                              key={item.value}
                                              mb={2}
                                            >
                                              <Button
                                                onClick={() => {
                                                  formik.setFieldValue(
                                                    `servicesContainer[${index}].services[${idx}].selectedItemType`,
                                                    item.value
                                                  );
                                                }}
                                                sx={{
                                                  color:
                                                    item.value ===
                                                    service.selectedItemType
                                                      ? "primary.main"
                                                      : "#000000",
                                                  width: "100%",
                                                  backgroundColor:
                                                    item.value ===
                                                    service.selectedItemType
                                                      ? "#F4F6FC"
                                                      : "#ffffff",
                                                }}
                                                variant="outlined"
                                              >
                                                {item.label}
                                              </Button>
                                            </Grid>
                                          ))}
                                        </Grid>
                                      </Grid>
                                    )}
                                    {service.selectedItemType && (
                                      <Grid item xs={12}>
                                        <Typography mb={2} variant="subtitle1">
                                          Select Service
                                        </Typography>
                                        <Grid container spacing={2}>
                                          <Grid item xs={6}>
                                            <Autocomplete
                                              name={`servicesContainer[${index}].services[${idx}].category_id`}
                                              label="service"
                                              options={services}
                                              noOptionsText={t("noProperties")}
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
                                                formik.touched
                                                  .servicesContainer?.[index]
                                                  ?.services?.[idx]
                                                  ?.category_id &&
                                                !!formik.errors
                                                  .servicesContainer?.[index]
                                                  ?.services?.[idx]?.category_id
                                              }
                                              helperText={
                                                formik.touched
                                                  .servicesContainer?.[index]
                                                  ?.services?.[idx]
                                                  ?.category_id &&
                                                formik.errors
                                                  .servicesContainer?.[index]
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
                                                All Services prices are Vat
                                                inclusive.
                                              </Typography>
                                            </Box>
                                          </Grid>
                                          <Grid item xs={2}>
                                            <CounterInput
                                              name={`servicesContainer[${index}].services[${idx}].quantity`}
                                              label={"Quantity"}
                                              value={service.quantity}
                                              disabled={!service.category_id}
                                              step={1}
                                              min={1}
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              error={
                                                formik.touched
                                                  .servicesContainer?.[index]
                                                  ?.services?.[idx]?.quantity &&
                                                !!formik.errors
                                                  .servicesContainer?.[index]
                                                  ?.services?.[idx]?.quantity
                                              }
                                              helperText={
                                                formik.touched
                                                  .servicesContainer?.[index]
                                                  ?.services?.[idx]?.quantity &&
                                                formik.errors
                                                  .servicesContainer?.[index]
                                                  ?.services?.[idx]?.quantity
                                              }
                                            />
                                          </Grid>
                                          <Grid item xs={2}>
                                            <NumberInput
                                              name="unit_cost"
                                              label={"Unit cost"}
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
                                              label={"Total cost"}
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
                                                    Service description
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <Typography variant="body2">
                                                    Select New installation with
                                                    the installation of
                                                    decorations accompanying the
                                                    frame.
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                            </Paper>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    )}
                                  </>
                                )}
                              </Grid>
                            )}

                            {serviceContainer.services.length === idx + 1 &&
                              !formik.errors.servicesContainer?.[index]
                                .services && (
                                <Grid item xs={12}>
                                  <Button
                                    sx={{ backgroundColor: "#ffffff" }}
                                    variant="outlined"
                                    onClick={() => {
                                      addSubService(index);
                                    }}
                                  >
                                    Add Additional service
                                  </Button>
                                </Grid>
                              )}
                          </Fragment>
                        ))}

                        {/* <ScheduleService /> */}
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Fragment>
      ))}
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            disabled={!!formik.errors.servicesContainer}
            variant="outlined"
            sx={{ mt: 1, mr: 1 }}
            onClick={addService}
          >
            Add service
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
            Preview
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default SelectSerivces;
