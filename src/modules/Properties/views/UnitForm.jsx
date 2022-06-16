import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

import { useParams, useLocation, useNavigate } from "react-router-dom";

import {
  useGetPropertyQuery,
  useGetUnitQuery,
  useAddUnitMutation,
  useUpdateUnitMutation,
  useGetAllUnitTypesQuery,
  useGetAllRoomTypesQuery,
  useDeleteRoomMutation,
} from "../../../redux/services/properties";
import { useGetAllUsersByRoleQuery } from "../../../redux/services/people";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { mdiPlusCircleOutline, mdiDeleteOutline } from "@mdi/js";

import { endOfToday } from "date-fns";
import { formatDate } from "../../../helpers/datetime";

import useNavigationBlocker from "../../../shared/hooks/useNavigationBlocker";

import AccessDenied from "../../../shared/views/AccessDenied";
import NotFound from "../../../shared/views/NotFound";

import Loader from "../../../shared/components/Loader";
import Dialog from "../../../shared/components/Dialog";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Link from "../../../shared/components/Link";
import Icon from "../../../shared/components/Icon";
import Radio from "../../../shared/components/inputs/Radio";
import TextInput from "../../../shared/components/inputs/TextInput";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import CounterInput from "../../../shared/components/inputs/CounterInput";
import DatePicker from "../../../shared/components/inputs/DatePicker";

import {
  WALLET_TYPES,
  USER_ROLES,
  UNIT_CUSTOMER_TYPES,
} from "../../../constants/system";

function UnitForm({ formType }) {
  const { t } = useTranslation("properties");

  const { unitID } = useParams();
  const { propertyID } = useLocation().state || {};
  const navigate = useNavigate();

  const { isFetching: isFetchingProperty, data: property } =
    useGetPropertyQuery(propertyID, { skip: !propertyID });
  const { error: unitError, data: unit } = useGetUnitQuery(unitID, {
    skip: !unitID,
  });
  const { data: allUnitTypes = [] } = useGetAllUnitTypesQuery(propertyID, {
    skip: !propertyID,
  });
  const { data: allRoomTypes = [] } = useGetAllRoomTypesQuery();
  const { data: allOwners = [] } = useGetAllUsersByRoleQuery(
    USER_ROLES.unitOwner
  );
  const { data: allTenants = [] } = useGetAllUsersByRoleQuery(
    USER_ROLES.unitTenant
  );
  const [addUnit] = useAddUnitMutation();
  const [updateUnit] = useUpdateUnitMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {
      property_id: propertyID,
      title: "",
      floor: null,
      unit_type_id: "",
      size: null,

      rooms: [],

      wallet_type_id: null,
      wallet_amount: null,

      customer_type_id: null,
      customer_id: "",
      expiry_date: null, // format it to "yyyy-mm-dd"
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(3, t("tooShortName"))
        .max(60, t("tooLongName"))
        .required(t("requiredField"))
        .test("cloneTest", t("nameShouldChange"), (title) => {
          if (formType !== "clone") return true;
          return title !== unit?.title;
        }),
      unit_type_id: Yup.string().required(t("requiredField")),
      floor: Yup.number().nullable(),
      size: Yup.number().nullable(),

      rooms: Yup.array().of(
        Yup.object().shape({
          title: Yup.string()
            .min(3, t("tooShortName"))
            .max(60, t("tooLongName"))
            .required(t("requiredField")),
          room_type_id: Yup.string().required(t("requiredField")),
          quantity: Yup.number().required(t("requiredField")),
          size: Yup.number().nullable(),
        })
      ),

      wallet_type_id: Yup.number().required(t("requiredField")),
      wallet_amount: Yup.number()
        .nullable()
        .test("opt required", t("requiredField"), function (amount) {
          const walletType = this.parent.wallet_type_id;
          return walletType === WALLET_TYPES.restricted ? !!amount : true;
        })
        .test(
          "out of property range",
          t("walletOutOfPropertyRange_amount", {
            amount: property?.wallet_amount,
          }),
          function (amount) {
            if (property.wallet_type_id === WALLET_TYPES.unlimited) return true;

            return amount >= 1000 && amount <= property.wallet_amount;
          }
        )
        .test(
          "out of unlimited range",
          t("unitWalletOutOfRange"),
          function (amount) {
            const walletType = this.parent.wallet_type_id;
            return walletType === WALLET_TYPES.restricted
              ? amount >= 1000 && amount <= 500000
              : true;
          }
        ),

      customer_type_id: Yup.number().nullable(),
      customer_id: Yup.string().test(
        "opt required",
        t("requiredField"),
        function (id) {
          const customerType = this.parent.customer_type_id;
          return !!customerType ? !!id : true;
        }
      ),
      expiry_date: Yup.date()
        .typeError(t("invalidDate"))
        .nullable()
        .test("not before tomorrow", t("startFromTomorrow"), function (date) {
          if (!date) return true;

          return date >= endOfToday();
        }),
    }),
    onSubmit: async (values, { setErrors }) => {
      const { title, unit_type_id, customer_id, expiry_date, ...formData } =
        values;

      !!values.customer_type_id &&
        Object.assign(formData, {
          customer_id,
          expiry_date: !!expiry_date ? formatDate(expiry_date) : null,
        });

      if (formType === "edit") {
        Object.assign(formData, { id: unitID });
        title !== unit.title && Object.assign(formData, { title });
        updateUnit(formData)
          .unwrap()
          .then(() => navigate(`/properties/${propertyID}`))
          .catch(({ data: { errors } }) => setErrors(errors));
      } else {
        Object.assign(formData, { title, unit_type_id });
        formType === "clone" &&
          // remove ids of cloned unit
          Object.assign(formData, {
            rooms: values.rooms.map(({ id, ...room }) => room),
          });
        addUnit(formData)
          .unwrap()
          .then(() => navigate(`/properties/${propertyID}`))
          .catch(({ data: { errors } }) => setErrors(errors));
      }
    },
  });

  const {
    resetForm,
    setFieldValue,
    values: { wallet_type_id: walletType },
  } = formik;

  // reset wallet amount if type changed to unlimited
  useEffect(() => {
    walletType === WALLET_TYPES.unlimited &&
      setFieldValue("wallet_amount", null);
  }, [walletType, setFieldValue]);

  useEffect(() => {
    if (formType === "add" || !unit || !property) return;

    resetForm({
      values: {
        property_id: property.id,
        title: unit.title,
        unit_type_id: unit.unit_type.id,
        floor: unit.floor,
        size: unit.size,
        rooms: unit.rooms,
        wallet_type_id:
          property.wallet_type_id === WALLET_TYPES.restricted &&
          unit.wallet_type_id === WALLET_TYPES.unlimited
            ? property.wallet_type_id
            : unit.wallet_type_id,
        wallet_amount: unit.wallet_amount || null,

        customer_type_id: unit.customer_type_id,
        customer_id: unit.customer?.id,
        expiry_date: !!unit.expiry_date ? new Date(unit.expiry_date) : null,
      },
    });
  }, [formType, unit, property, resetForm]);

  const [leaveConfirmed, setLeaveConfirmed] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  useNavigationBlocker(formik.dirty && !leaveConfirmed, () =>
    setLeaveDialogOpen(true)
  );

  const addRoom = () => {
    const newRooms = [
      ...formik.values.rooms,
      { title: "", room_type_id: "", quantity: 1, size: null },
    ];
    formik.setFieldValue("rooms", newRooms);
  };
  const removeRoom = (idx) => {
    const roomID = formik.values.rooms[idx].id;
    const newRooms = formik.values.rooms.filter((_, index) => index !== idx);

    if (formType === "edit" && !!roomID) {
      deleteRoom(roomID)
        .unwrap()
        .then(() => formik.setFieldValue("rooms", newRooms));
    } else {
      formik.setFieldValue("rooms", newRooms);
    }
  };

  if (!propertyID) return <AccessDenied />;
  if (isFetchingProperty) return <Loader />;
  if (unitError?.status === 404) return <NotFound />;

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs
          items={[
            { label: t("properties"), url: "/properties" },
            { label: property.title, url: `/properties/${property.id}` },
          ]}
        />

        <Typography component="h1" variant="h5">
          {t(`${formType}UnitFormTitle`)}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ py: 4, px: 3 }}>
          <Grid
            container
            spacing={5}
            direction="column"
            sx={{
              width: { xs: "100%", lg: 760 },
              mx: "auto",
            }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("propertyInformation")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="title"
                  label={t("name")}
                  type="text"
                  fixedValue
                  value={property.title}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="city"
                  label={t("city")}
                  type="text"
                  fixedValue
                  value={property.city?.title}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("unitInformation")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="title"
                  label={t("name")}
                  type="text"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && !!formik.errors.title}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>

              <Grid item xs={12}>
                <CounterInput
                  name="floor"
                  label={t("floor")}
                  step={1}
                  max={100}
                  value={formik.values.floor}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.floor && !!formik.errors.floor}
                  helperText={
                    formik.touched.floor && !!formik.errors.floor
                      ? formik.errors.floor
                      : t("from0To100")
                  }
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("unitType")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  required
                  name="unit_type_id"
                  label={t("unitType")}
                  fixedValue={formType === "edit"}
                  options={allUnitTypes.map((type) => ({
                    value: type.id,
                    label: type.title,
                  }))}
                  noOptionsText={t("noTypes")}
                  value={formik.values.unit_type_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.unit_type_id && !!formik.errors.unit_type_id
                  }
                  helperText={
                    formik.touched.unit_type_id && formik.errors.unit_type_id
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <NumberInput
                  name="size"
                  label={t("size")}
                  unit={
                    <>
                      {t("m")}
                      <sup>{t("2")}</sup>
                    </>
                  }
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.size && !!formik.errors.size}
                  helperText={formik.touched.size && formik.errors.size}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("unitRooms")}
                </Typography>
              </Grid>

              {!!formik.values.rooms.length ? (
                <>
                  {formik.values.rooms.map((room, idx) => (
                    <Fragment key={idx}>
                      <Grid
                        item
                        xs={12}
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: -1 }}
                      >
                        <Grid item>
                          <Typography variant="subtitle1">
                            {t("room")} {idx + 1}:
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Button
                            color="error"
                            size="small"
                            variant="text"
                            startIcon={<Icon icon={mdiDeleteOutline} />}
                            sx={{ textDecoration: "underline" }}
                            onClick={() => removeRoom(idx)}
                          >
                            {t("removeRoom")}
                          </Button>
                        </Grid>
                      </Grid>

                      <Grid item xs={6}>
                        <Autocomplete
                          required
                          name={`rooms[${idx}].room_type_id`}
                          label={t("roomType")}
                          options={allRoomTypes.map((type) => ({
                            value: type.id,
                            label: type.title,
                          }))}
                          noOptionsText={t("noTypes")}
                          value={room.room_type_id}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.rooms?.[idx]?.room_type_id &&
                            !!formik.errors.rooms?.[idx]?.room_type_id
                          }
                          helperText={
                            formik.touched.rooms?.[idx]?.room_type_id &&
                            formik.errors.rooms?.[idx]?.room_type_id
                          }
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <CounterInput
                          required
                          name={`rooms[${idx}].quantity`}
                          label={t("quantity")}
                          step={1}
                          min={1}
                          value={room.quantity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.rooms?.[idx]?.quantity &&
                            !!formik.errors.rooms?.[idx]?.quantity
                          }
                          helperText={
                            formik.touched.rooms?.[idx]?.quantity &&
                            formik.errors.rooms?.[idx]?.quantity
                          }
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextInput
                          required
                          name={`rooms[${idx}].title`}
                          label={t("roomName")}
                          type="text"
                          value={room.title}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.rooms?.[idx]?.title &&
                            !!formik.errors.rooms?.[idx]?.title
                          }
                          helperText={
                            formik.touched.rooms?.[idx]?.title &&
                            formik.errors.rooms?.[idx]?.title
                          }
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <NumberInput
                          name={`rooms[${idx}].size`}
                          label={t("size")}
                          unit={
                            <>
                              {t("m")}
                              <sup>{t("2")}</sup>
                            </>
                          }
                          value={room.size}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.rooms?.[idx]?.size &&
                            !!formik.errors.rooms?.[idx]?.size
                          }
                          helperText={
                            formik.touched.rooms?.[idx]?.size &&
                            formik.errors.rooms?.[idx]?.size
                          }
                        />
                      </Grid>
                    </Fragment>
                  ))}

                  <Grid item>
                    <Button
                      color="primary"
                      variant="outlined"
                      disabled={!!formik.errors.rooms}
                      startIcon={<Icon icon={mdiPlusCircleOutline} />}
                      onClick={addRoom}
                    >
                      {t("addRoom")}
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" mb={0.5}>
                    {t("youCanAddRooms")}
                  </Typography>

                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                    startIcon={<Icon icon={mdiPlusCircleOutline} />}
                    sx={{ textDecoration: "underline" }}
                    onClick={addRoom}
                  >
                    {t("addRoom")}
                  </Button>
                </Grid>
              )}
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6" id="radio-group-label">
                  {t("walletType")}
                </Typography>
              </Grid>

              <Grid item xs={12} my={-1}>
                <FormControl>
                  <RadioGroup
                    row
                    name="wallet_type_id"
                    aria-labelledby="radio-group-label"
                    value={formik.values.wallet_type_id}
                    onChange={(_, value) =>
                      formik.setFieldValue("wallet_type_id", parseInt(value))
                    }
                  >
                    <FormControlLabel
                      label={t("unlimited")}
                      value={WALLET_TYPES.unlimited}
                      control={<Radio />}
                      disabled={
                        property.wallet_type_id === WALLET_TYPES.restricted
                      }
                    />
                    <FormControlLabel
                      label={t("restricted")}
                      value={WALLET_TYPES.restricted}
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <NumberInput
                  required={
                    formik.values.wallet_type_id === WALLET_TYPES.restricted
                  }
                  disabled={
                    formik.values.wallet_type_id === WALLET_TYPES.unlimited
                  }
                  name="wallet_amount"
                  label={t("maxSpendings")}
                  unit={t("sr")}
                  value={formik.values.wallet_amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.wallet_amount &&
                    !!formik.errors.wallet_amount
                  }
                  helperText={
                    formik.touched.wallet_amount &&
                    !!formik.errors.wallet_amount
                      ? formik.errors.wallet_amount
                      : property.wallet_type_id === WALLET_TYPES.restricted
                      ? t("from1000To_amount", {
                          amount: property?.wallet_amount || "",
                        })
                      : ""
                  }
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography component="h2" variant="h6">
                    {t("unitCustomer")}
                  </Typography>
                </Grid>

                {!!formik.values.customer_type_id && (
                  <Grid item>
                    <Button
                      color="error"
                      variant="text"
                      size="small"
                      startIcon={<Icon icon={mdiDeleteOutline} />}
                      sx={{ textDecoration: "underline" }}
                      onClick={() =>
                        formik.setFieldValue("customer_type_id", null)
                      }
                    >
                      {t("removeCustomer")}
                    </Button>
                  </Grid>
                )}
              </Grid>

              {!!formik.values.customer_type_id ? (
                <>
                  <Grid item xs={12} my={-1}>
                    <FormControl>
                      <Typography variant="body2" color="text.secondary">
                        {t("anInvitationWillBeSent")}
                      </Typography>

                      <RadioGroup
                        row
                        name="customer_type_id"
                        aria-labelledby="radio-group-label"
                        value={formik.values.customer_type_id}
                        onChange={(_, value) =>
                          formik.setFieldValue(
                            "customer_type_id",
                            parseInt(value)
                          )
                        }
                      >
                        <FormControlLabel
                          label={t("owner")}
                          value={UNIT_CUSTOMER_TYPES.owner}
                          control={<Radio />}
                        />
                        <FormControlLabel
                          label={t("tenant")}
                          value={UNIT_CUSTOMER_TYPES.tenant}
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      required
                      name="customer_id"
                      label={t("customer")}
                      options={(formik.values.customer_type_id ===
                      UNIT_CUSTOMER_TYPES.owner
                        ? allOwners
                        : allTenants
                      ).map((user) => ({
                        value: user.id,
                        label: user.name,
                      }))}
                      noOptionsText={
                        formik.values.customer_type_id ===
                        UNIT_CUSTOMER_TYPES.owner
                          ? t("noOwners")
                          : t("noTenants")
                      }
                      value={formik.values.customer_id}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.customer_id &&
                        !!formik.errors.customer_id
                      }
                      helperText={
                        formik.touched.customer_id && formik.errors.customer_id
                      }
                    />
                  </Grid>

                  <Grid item xs={12} mt={-2}>
                    <Typography variant="body2">
                      {t("didntFoundCustomer")}{" "}
                      <Link to="/people/add">{t("createNewCustomer")}</Link>
                    </Typography>
                  </Grid>

                  {formik.values.customer_type_id ===
                    UNIT_CUSTOMER_TYPES.tenant && (
                    <Grid item xs={12}>
                      <DatePicker
                        name="expiry_date"
                        label={t("expiryDate")}
                        value={formik.values.expiry_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.expiry_date &&
                          !!formik.errors.expiry_date
                        }
                        helperText={
                          formik.touched.expiry_date &&
                          formik.errors.expiry_date
                        }
                        shouldDisableDate={(date) => date <= endOfToday()}
                      />
                    </Grid>
                  )}
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" mb={0.5}>
                    {t("youCanAddCustomer")}
                  </Typography>

                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                    startIcon={<Icon icon={mdiPlusCircleOutline} />}
                    sx={{ textDecoration: "underline" }}
                    onClick={() =>
                      formik.setFieldValue(
                        "customer_type_id",
                        UNIT_CUSTOMER_TYPES.owner
                      )
                    }
                  >
                    {t("addCustomer")}
                  </Button>
                </Grid>
              )}
            </Grid>

            <Grid item alignSelf="flex-end">
              <Button type="submit" color="success">
                {t("saveUnit")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Dialog
        size="small"
        open={leaveDialogOpen}
        title={t("discardChanges")}
        titleColor="error"
        confirmLabel={t("discard")}
        confirmColor="error"
        onClose={() => setLeaveDialogOpen(false)}
        onConfirm={() => setLeaveConfirmed(true)}
      >
        {t("unitFormLeaveMessage")}
      </Dialog>
    </Grid>
  );
}

UnitForm.propTypes = {
  formType: PropTypes.oneOf(["add", "clone", "edit"]).isRequired,
};

export default UnitForm;
