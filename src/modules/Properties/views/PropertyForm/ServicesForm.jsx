import { useState } from "react";
import PropTypes from "prop-types";

import { useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import {
  stepperSelector,
  setStepData,
  setCanLeave,
  setCurrentStep,
} from "../../state/propertyFormStepperSlice";
import {
  useGetPropertyQuery,
  useAddPropertyMutation,
  useUpdatePropertyMutation,
} from "../../../../redux/services/properties";
import {
  useGetCompanyServicesTreeQuery,
  useGetPropertyServicesTreeQuery,
} from "../../../../redux/services/general";

import { Grid, Typography, Button } from "@mui/material";

import ServicesSelection from "../../../../shared/components/modules/services/ServicesSelection";

function ServicesForm({ formType }) {
  const { t } = useTranslation("properties");

  const { propertyID } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { stepsData } = useSelector(stepperSelector);

  const { data: property } = useGetPropertyQuery(propertyID, {
    skip: !propertyID,
  });
  const [addProperty] = useAddPropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();
  const { data: companyServices } = useGetCompanyServicesTreeQuery(undefined, {
    skip: formType !== "add",
  });
  const { data: propertyServices } = useGetPropertyServicesTreeQuery(
    propertyID,
    { skip: !propertyID, refetchOnMountOrArgChange: true }
  );

  const [changedServices, setChangedServices] = useState({});

  const handleSubmit = () => {
    const { title, property_type_id, property_subtype_id, ...formData } =
      stepsData[1].data;

    const service_items = Object.values(changedServices)
      .filter(({ active }) => active)
      .map(({ id, checked, name, description }) => ({
        service_id: id,
        service_name: name,
        service_description: description,
        checked: checked,
      }));
    !!service_items.length && Object.assign(formData, { service_items });

    if (formType === "edit") {
      Object.assign(formData, { id: propertyID });
      title !== property.title && Object.assign(formData, { title });

      updateProperty(formData)
        .unwrap()
        .then((data) => navigate(`/properties/${data.id}`))
        .catch(({ data: { errors } }) => {
          dispatch(setCurrentStep(1));
          dispatch(setCanLeave(false));
          dispatch(setStepData({ step: 1, data: { errors } }));
        });
    } else {
      Object.assign(formData, {
        title,
        property_type_id,
        property_subtype_id,
      });

      addProperty(formData)
        .unwrap()
        .then((data) => navigate(`/properties/${data.id}`))
        .catch(({ data: { errors } }) => {
          dispatch(setCurrentStep(1));
          dispatch(setCanLeave(false));
          dispatch(setStepData({ step: 1, data: { errors } }));
        });
    }
  };

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      sx={{
        mx: "auto",
        width: { xs: "100%", lg: 760 },
      }}
    >
      <Grid item xs={12}>
        <Typography component="h2" variant="h6">
          {t("propertyServices")}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        {(companyServices || propertyServices) && (
          <ServicesSelection
            services={formType === "add" ? companyServices : propertyServices}
            changedServices={changedServices}
            onChange={(changedServices) => setChangedServices(changedServices)}
          />
        )}
      </Grid>

      <Grid item container justifyContent="space-between">
        <Grid item>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(
                setStepData({ step: 2, data: { data: changedServices } })
              );
              dispatch(setCurrentStep(1));
            }}
          >
            {t("back")}
          </Button>
        </Grid>

        <Grid item>
          <Button
            color="success"
            onClick={() => {
              dispatch(
                setStepData({ step: 2, data: { data: changedServices } })
              );
              dispatch(setCanLeave(true));
              handleSubmit();
            }}
          >
            {t("saveProperty")}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

ServicesForm.propTypes = {
  formType: PropTypes.oneOf(["add", "clone", "edit"]).isRequired,
};

export default ServicesForm;
