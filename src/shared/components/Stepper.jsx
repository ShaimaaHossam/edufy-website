import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  SvgIcon,
  Typography,
  StepConnector,
  styled,
  alpha,
} from "@mui/material";

import { stepConnectorClasses } from "@mui/material/StepConnector";

import { mdiCheck } from "@mdi/js";

function CustomStepper({
  orientation = "vertical",
  steps,
  activeStep,
  stepHeight = 50,
  connectorHeight = 20,
}) {
  const IconContainer = styled("div")(({ theme, ownerState }) => {
    return {
      color: "#242E4261",
      background: "#fff",
      width: 36,
      height: 36,
      display: "flex",
      borderRadius: "50%",
      borderColor: "#242E4261",
      justifyContent: "center",
      alignItems: "center",
      ...(ownerState.active && {
        background: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.primary.main,
      }),
      ...(ownerState.completed && {
        background: theme.palette.success.main,
        color: "#fff",
      }),
    };
  });
  const STATUS_TYPES = {
    pending: "pending",
    active: "active",
    success: "success",
    error: "error",
  };
  const STATUS = {
    active: "in progress",
    success: "Done",
    error: "Error",
  };

  function renderIcon(props, step) {
    const { active, completed, className } = props;
    return (
      <IconContainer ownerState={{ completed, active }} className={className}>
        <SvgIcon fontSize="small">
          <path d={completed ? mdiCheck : step.icon} />
        </SvgIcon>
      </IconContainer>
    );
  }

  const Connector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      background: theme.palette.primary.main,
    },
    [`&.${stepConnectorClasses.root}`]: {
      marginLeft: 18,
      height: connectorHeight,
      marginTop: 6,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        background: theme.palette.primary.main,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        background: theme.palette.success.main,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      border: 0,
      width: 1,
      borderRadius: 1,
      background: "#242E4261",
    },
  }));

  return (
    <Stepper
      orientation={orientation}
      activeStep={activeStep}
      connector={<Connector />}
    >
      {steps.map((step) => (
        <Step
          key={step.title}
          sx={{
            height: stepHeight,
          }}
        >
          <StepLabel StepIconComponent={(props) => renderIcon(props, step)}>
            <Typography variant="subtitle2" color="#242E42">
              {step.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  step.status === STATUS_TYPES.active
                    ? "primary.main"
                    : "success.main",
              }}
            >
              {step.title === "Services" ? (
                <Typography variant="body2" color="#242E4261">
                  select service to need
                </Typography>
              ) : null}
              {step.status === STATUS_TYPES.active
                ? STATUS.active
                : step.status === STATUS_TYPES.success
                ? STATUS.success
                : null}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default CustomStepper;
