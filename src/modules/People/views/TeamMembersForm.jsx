import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

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

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Link from "../../../shared/components/Link";
import TextInput from "../../../shared/components/inputs/TextInput";
import Icon from "../../../shared/components/Icon";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import Radio from "../../../shared/components/inputs/Radio";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import { mdiPlusCircleOutline } from "@mdi/js";

function TeamMembersForm({ formType }) {
  const { t } = useTranslation("people");
  const [propertyShown, setPropertyShown] = useState(true);

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {
      title: "",
      email: "",
      phone: "",
      wallet_amount: null,
      property_name: "",
    },
    validationSchema: Yup.object().shape({}),
    onSubmit: async (values) => {
      console.log("values", values);
    },
  });

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs items={[{ label: t("people"), url: "/people" }]} />

        <Typography component="h1" variant="h5">
          {t(`${formType}PeopleFormTitle`)}
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
                  {t("teamMemberInformation")}
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
                <TextInput
                  required
                  name="email"
                  label={t("email")}
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="phone"
                  label={t("phoneNumber")}
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && !!formik.errors.phone}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("teamMemberRole")}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("monyhlyCap")}
                </Typography>

                <Typography component="p" variant="p" color="text.secondary">
                  {t("adminApproval")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <NumberInput
                  required
                  name="wallet_amount"
                  label={t("walletBalance")}
                  unit={t("sr")}
                  value={formik.values.wallet_amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.wallet_amount &&
                    !!formik.errors.wallet_amount
                  }
                  helperText={
                    formik.touched.wallet_amount && formik.errors.wallet_amount
                  }
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("assignOptionalProperty")}
                </Typography>
              </Grid>

              {propertyShown ? (
                <Grid item width="100%">
                    <Typography component="p" variant="p" color="text.secondary">
                    {t("assignOptionalPropertyLabel")}
                  </Typography>
                  <Link to="" onClick={() => setPropertyShown(!propertyShown)}>
                    <Icon
                      aria-label="toggle properties visibility"
                      icon={mdiPlusCircleOutline}
                      size="small"
                      shape="rounded"
                      variant="contained"
                    />
                    <span style={{ marginLeft: 5 }}>{t("assignProperty")}</span>
                  </Link>
                </Grid>
              ) : (
                <Grid item width="100%">
                  <Autocomplete
                    name="property_name"
                    label={t("property")}
                    noOptionsText={t("noTypes")}
                    options={[]}
                    value={formik.values.property_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.property_name &&
                      !!formik.errors.property_name
                    }
                    helperText={
                      formik.touched.property_name &&
                      formik.errors.property_name
                    }
                  />
                </Grid>
              )}
            </Grid>

            <Grid item alignSelf="flex-end">
              <Button type="submit" color="primary">
                {t("createUser")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TeamMembersForm;
