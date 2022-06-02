import { useEffect } from "react";
import PropTypes from "prop-types";

import { useParams, useLocation, useNavigate } from "react-router-dom";

import {
  useGetPropertyQuery,
  useGetUnitQuery,
  useAddUnitMutation,
  useUpdateUnitMutation,
  useGetAllUnitTypesQuery,
  useGetAllUnitSubtypesQuery,
} from "../../../redux/services/properties";

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

import AccessDenied from "../../../shared/views/AccessDenied";
import NotFound from "../../../shared/views/NotFound";

import Loader from "../../../shared/components/Loader";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Link from "../../../shared/components/Link";
import TextInput from "../../../shared/components/inputs/TextInput";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import LocationInput from "../../../shared/components/inputs/LocationInput";
import Radio from "../../../shared/components/inputs/Radio";
import NumberInput from "../../../shared/components/inputs/NumberInput";

function UnitForm({ formType }) {
  const { t } = useTranslation("properties");

  const { unitID } = useParams();
  const { propertyID } = useLocation().state || {};
  const navigate = useNavigate();

  const { isFetching: isFetchingProperty, data: property } =
    useGetPropertyQuery(propertyID, { skip: !propertyID });
  const {
    isFetching: isFetchingUnit,
    error: unitError,
    data: unit,
  } = useGetUnitQuery(unitID, { skip: !unitID });
  const [addUnit] = useAddUnitMutation();
  const [updateUnit] = useUpdateUnitMutation();

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {
      title: "",
      unit_type_id: "",
      unit_subtype_id: "",
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
      unit_subtype_id: Yup.string().test(
        "opt required",
        t("requiredField"),
        function (type) {
          const unitTypeID = this.parent.unit_type_id;
          return !!unitTypeID ? !!type : true;
        }
      ),
    }),
    onSubmit: async (values, { setErrors }) => {
      const { unit_type_id, unit_subtype_id, ...formData } = values;

      if (formType === "edit") {
        Object.assign(formData, { id: unitID });
        updateUnit(formData)
          .unwrap()
          .then((data) => navigate(`/properties/${""}`))
          .catch(({ data: { errors } }) => setErrors(errors));
      } else {
        Object.assign(formData, { unit_type_id, unit_subtype_id });
        addUnit(formData)
          .unwrap()
          .then((data) => navigate(`/properties/${""}`))
          .catch(({ data: { errors } }) => setErrors(errors));
      }
    },
  });

  const {
    setValues,
    setFieldValue,
    values: { unit_type_id: unitTypeID },
  } = formik;

  const { data: allUnitTypes = [] } = useGetAllUnitTypesQuery();
  const { data: allUnitSubtypes = [] } = useGetAllUnitSubtypesQuery(
    unitTypeID,
    { skip: !unitTypeID }
  );

  // reset unit subtype if unit type is cleared
  useEffect(() => {
    !unitTypeID && setFieldValue("unit_subtype_id", "");
  }, [unitTypeID, setFieldValue]);

  useEffect(() => {
    if (formType === "add" || isFetchingUnit || !unit) return;

    setValues({
      title: unit.title,
      unit_type_id: unit.unit_type.id,
      unit_subtype_id: unit.unit_subtype.id,
    });
  }, [formType, isFetchingUnit, unit, setValues]);

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
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("unitTypes")}
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
                <Autocomplete
                  required
                  disabled={!formik.values.unit_type_id}
                  name="unit_subtype_id"
                  label={t("unitSubtype")}
                  fixedValue={formType === "edit"}
                  options={allUnitSubtypes.map((type) => ({
                    value: type.id,
                    label: type.title,
                  }))}
                  noOptionsText={t("noTypes")}
                  value={formik.values.unit_subtype_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.unit_subtype_id &&
                    !!formik.errors.unit_subtype_id
                  }
                  helperText={
                    formik.touched.unit_subtype_id &&
                    formik.errors.unit_subtype_id
                  }
                />
              </Grid>
            </Grid>

            <Grid item alignSelf="flex-end">
              <Button type="submit" color="success">
                {t("saveUnit")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

UnitForm.propTypes = {
  formType: PropTypes.oneOf(["add", "clone", "edit"]).isRequired,
};

export default UnitForm;
