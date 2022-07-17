import { Fragment, useEffect, useState } from "react";

import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  deleteCategory,
  orderFormDataSelector,
  updateVal,
} from "../../../state/orderFormData";
import { decrementSteps } from "../../../state/orderFormSteps";

import { format } from "date-fns";

import Dialog from "../../../../../shared/components/Dialog";
import useNavigationBlocker from "../../../../../shared/hooks/useNavigationBlocker";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "../../../../../shared/components/Icon";
import { mdiAlertCircle, mdiDeleteOutline, mdiPencil } from "@mdi/js";
import IconButton from "../../../../../shared/components/IconButton";
import { useAddOrderMutation } from "../../../../../redux/services/orders";

const OrderSummery = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");
  const { orderType } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type, selectedPropertyId, selectedUnits, categories } = useSelector(
    orderFormDataSelector
  );
  const [canLeave, setCanLeave] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

  useNavigationBlocker(!canLeave, () => setLeaveDialogOpen(true));
  const [addOrder] = useAddOrderMutation();

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(language, options);
  };

  const changeDateFormatToDDMMYYYY = (date) => {
    var [mm, dd, yyyy] = date.split("/");
    if (parseInt(mm) < 10) {
      mm = "0" + mm;
    }
    if (parseInt(dd) < 10) {
      dd = "0" + dd;
    }
    return `${dd}-${mm}-${yyyy}`;
  };

  const handleAddOrder = async () => {
    setCanLeave(true);
    var formatedCategory = [];
    categories.forEach((category) => {
      formatedCategory.push({
        id: category.service_type,
        note: {
          attachments: category.attachments,
          note: category.note,
        },
        schedule: {
          date: changeDateFormatToDDMMYYYY(
            category.schedule.date_string.split(",")[0]
          ),
          from_time: format(
            new Date(category.schedule.from_time_string),
            "HH:mm"
          ),
          to_time: format(new Date(category.schedule.to_time_string), "HH:mm"),
        },
        items: category.services.map((service) => ({
          id: service.category_id,
          quantity: service.quantity,
        })),
      });
    });
    var formData = {
      type: type,
      property_id: selectedPropertyId,
      units: selectedUnits,
      categories: formatedCategory,
    };

    addOrder(formData)
      .unwrap()
      .then((res) => {
        navigate(`/orders/${orderType}`);
      })
      .catch(({ data: { errors } }) => {
        console.log(errors);
        setCanLeave(false);
      });
  };

  const totalServicesPrice = () => {
    let total = 0;
    categories.forEach((category) => {
      category.services.forEach((service) => {
        total += service.unit_cost * service.quantity;
      });
    });
    return total.toFixed(2);
  };

  return (
    <Grid item container>
      <Typography sx={{ pb: 5 }} component="h6" variant="h6">
        {t("orderSummary")}
      </Typography>
      {categories.map((category, index) => (
        <Fragment key={index}>
          <Grid
            item
            container
            mb={3}
            sx={{
              p: 2,
              border: 1,
              borderColor: "divider",
              backgroundColor: "white",
            }}
          >
            <Grid
              item
              container
              display={"flex"}
              justifyContent={"space-between"}
              xs={12}
              mb={4}
            >
              <Typography component="h6" variant="h6">
                {t("service")} {index + 1}:
              </Typography>
              <Grid item>
                <IconButton
                  aria-label="toggle edit service"
                  icon={mdiPencil}
                  size="medium"
                  shape="rounded"
                  color="primary"
                  onClick={() => {
                    dispatch(() =>
                      dispatch(
                        updateVal({
                          key: "selectedServiceIdxToEdit",
                          val: index,
                        })
                      )
                    );
                    dispatch(() =>
                      dispatch(updateVal({ key: "editService", val: true }))
                    );
                  }}
                />
                <IconButton
                  aria-label="remove service"
                  icon={mdiDeleteOutline}
                  size="medium"
                  shape="rounded"
                  color="error"
                  onClick={() => dispatch(deleteCategory(index))}
                />
              </Grid>
            </Grid>

            <Grid item container sx={{ pb: 1 }}>
              <Grid item xs={3}>
                <Typography variant="subtitle2">{t("item")}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle2">{t("unitPrice")}</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle2">{t("quantity")}</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle2">{t("totalPrice")}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>
            {category.services.map((service, idx) => (
              <Grid
                key={service.category_id + idx}
                item
                container
                sx={{
                  py: 1,
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "divider",
                  backgroundColor: "white",
                  borderStyle: "dashed",
                }}
              >
                <Grid item xs={3}>
                  <Typography component="span" variant="body2">
                    {language === "en"
                      ? `${service.description.en} ${service.selectedItemType.name.en} ${service.selectedItem.name.en}`
                      : `${service.description.ar} ${service.selectedItem.name.ar} ${service.selectedItemType.name.ar}`}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography component="span" variant="body2">
                    {service.unit_cost.toFixed(2)} {t("sr")}
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography component="span" variant="body2">
                    {service.quantity}
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography component="span" variant="body2">
                    {(service.unit_cost * service.quantity).toFixed(2)}{" "}
                    {t("sr")}
                  </Typography>
                </Grid>
              </Grid>
            ))}
            <Box my={1} component="div" display={"flex"} alignItems={"center"}>
              <Icon icon={mdiAlertCircle} size="small" color="warning" />
              <Typography ml={1} color={"#FFA303"} variant="body2">
                {t("servicePriceVatInfo")}
              </Typography>
            </Box>
            <Grid
              item
              container
              xs={12}
              my={1}
              sx={{
                py: 1,
                borderWidth: "0px 0px 2px 0px",
                borderColor: "divider",
                backgroundColor: "white",
                borderStyle: "dashed",
              }}
            >
              <Typography component="h6" variant="h6">
                {t("dateTime")}
              </Typography>
              <Grid item xs={12}>
                <Typography variant="subtitle2">{`${formatDate(
                  category.schedule.date_string
                )} AT ${category.schedule.from_time_string.split(",")[1]} - ${
                  category.schedule.to_time_string.split(",")[1]
                }`}</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3} direction="column">
              <Grid item>
                <Button
                  color="primary"
                  variant="text"

                  // onClick={() => handleDialogOpen(index)}
                >
                  {t("viewOrderNotes")}
                </Button>
              </Grid>
              <Grid item display={"flex"} justifyContent={"space-between"}>
                <Typography variant="subtitle2">
                  {t("totalServicesPrice")}
                </Typography>

                <Typography variant="subtitle2">
                  {totalServicesPrice()} {t("sr")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Fragment>
      ))}
      <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
        <Button
          variant="outlined"
          sx={{ mt: 1, mr: 1 }}
          onClick={() => dispatch(decrementSteps())}
        >
          {t("back")}
        </Button>
        <Button
          disabled={categories.length === 0}
          variant="contained"
          color="success"
          sx={{ mt: 1, mr: 1 }}
          onClick={handleAddOrder}
        >
          {t("sendOrder")}
        </Button>
      </Grid>
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

export default OrderSummery;
