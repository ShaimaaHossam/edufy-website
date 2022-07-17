import { useTranslation } from "react-i18next";

import {
  styled,
  Stepper,
  Step,
  StepConnector as MuiStepConnector,
  stepConnectorClasses,
  stepLabelClasses,
  StepLabel,
} from "@mui/material";
import { mdiCheck } from "@mdi/js";

import Icon from "../../../../shared/components/Icon";

const StepConnector = styled(MuiStepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    position: "static",
  },

  [`&.${stepConnectorClasses.vertical}`]: {
    display: "flex",
    flexWrap: "wrap",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderRight: `2px ${theme.palette.success.main} dashed`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderRight: `2px solid ${theme.palette.success.main}`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 0,
    border: 0,
    borderRight: `2px ${theme.palette.grey[400]} dashed`,
  },
}));
const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  [`& .${stepLabelClasses.label}`]: {
    [`&.${stepLabelClasses.completed}`]: {
      marginTop: "0px",
      marginLeft: "5px",
    },
    [`&.${stepLabelClasses.active}`]: {
      marginTop: "0px",
      marginLeft: "5px",
    },
    marginTop: "0px",
    marginLeft: "5px",
  },
}));
const StepIconContainer = styled("div", {
  shouldForwardProp: (prop) => ["active", "completed"].indexOf(prop) === -1,
})(({ theme, active, completed }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 30,
  height: 30,
  borderRadius: "50%",
  color: theme.palette.grey[400],
  backgroundColor: "transparent",
  border: `1px solid ${theme.palette.grey[400]}`,

  ...(active && {
    backgroundImage: "linear-gradient(180deg, #3EE6EF33 0%, #1E7AF033 100%)",
    color: "#1E7AF0",
    border: "none",
    fontSize: 14,
  }),
  ...(completed && {
    fontSize: 20,
    color: "#FFF",
    border: "none",
    backgroundColor: theme.palette.success.main,
  }),
}));
function StepIcon(props) {
  const { active, completed, icon, className } = props;

  return (
    <StepIconContainer
      active={active}
      completed={completed}
      className={className}
    >
      {completed ? <Icon icon={mdiCheck} /> : icon}
    </StepIconContainer>
  );
}

function CreateOrderSteps({ currentStep }) {
  const { t } = useTranslation("orders");

  return (
    <Stepper
      orientation="vertical"
      alternativeLabel
      connector={<StepConnector />}
    >
      <Step active={currentStep === 1} completed={currentStep > 1}>
        <CustomStepLabel StepIconComponent={StepIcon}>
          {t("selectPropertyUnits")}
        </CustomStepLabel>
      </Step>

      <Step active={currentStep === 2} completed={currentStep > 2}>
        <CustomStepLabel StepIconComponent={StepIcon}>
          {t("selectServices")}
        </CustomStepLabel>
      </Step>

      <Step active={currentStep === 3} completed={currentStep > 3}>
        <CustomStepLabel StepIconComponent={StepIcon}>
          {t("Preview")}
        </CustomStepLabel>
      </Step>
    </Stepper>
  );
}

export default CreateOrderSteps;
