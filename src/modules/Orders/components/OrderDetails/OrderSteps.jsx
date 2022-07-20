import { useParams } from "react-router-dom";

import { useGetOrderQuery } from "../../../../redux/services/orders";
import { order } from "../../../../redux/services/ordersData";

import { useTranslation } from "react-i18next";

import {
  styled,
  Stepper,
  Step,
  StepConnector as MuiStepConnector,
  stepConnectorClasses,
  StepLabel,
  Typography,
} from "@mui/material";
import { mdiCheck, mdiClose } from "@mdi/js";

import Icon from "../../../../shared/components/Icon";

import { ORDER_STATUSES as STATUSES } from "../../../../constants/system";

const StepConnector = styled(MuiStepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderTop: `5px ${theme.palette.success.main} dotted`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderTop: `3px solid ${theme.palette.success.main}`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 0,
    border: 0,
    borderTop: `5px ${theme.palette.grey[400]} dotted`,
  },
}));

const StepIconContainer = styled("div", {
  shouldForwardProp: (prop) =>
    ["active", "completed", "error"].indexOf(prop) === -1,
})(({ theme, active, completed, error }) => ({
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
    color: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.main}`,
  }),
  ...(completed && {
    fontSize: 20,
    color: "#FFF",
    border: "none",
    backgroundColor: theme.palette.success.main,
  }),
  ...(error && {
    fontSize: 20,
    color: "#FFF",
    border: "none",
    backgroundColor: theme.palette.error.main,
  }),
}));
function StepIcon(props) {
  const { active, completed, error, icon, className } = props;

  return (
    <StepIconContainer
      active={active}
      completed={completed}
      error={error}
      className={className}
    >
      {error ? (
        <Icon icon={mdiClose} />
      ) : completed ? (
        <Icon icon={mdiCheck} />
      ) : (
        icon
      )}
    </StepIconContainer>
  );
}

function OrderSteps() {
  const { t } = useTranslation("orders");

  const { orderID } = useParams();

  const { data: orderDetails } = useGetOrderQuery(orderID);
  // const orderDetails = {
  //   status: "Canceled",
  // };

  return (
    <Stepper alternativeLabel connector={<StepConnector />}>
      <Step completed>
        <StepLabel
          StepIconComponent={StepIcon}
          error={orderDetails?.status === STATUSES.canceled}
        >
          {orderDetails?.status === STATUSES.canceled
            ? t("canceled")
            : t("created")}
        </StepLabel>
      </Step>

      <Step
        active={orderDetails?.status === STATUSES.created}
        completed={STATUSES.confirmed in orderDetails?.status_logs}
      >
        <StepLabel
          StepIconComponent={StepIcon}
          // error={status === STATUSES.canceled && !isAssigned}
        >
          {orderDetails?.status === STATUSES.confirmed
            ? t("confirmed")
            : t("confirming")}
        </StepLabel>
      </Step>

      <Step
        active={orderDetails?.status === STATUSES.confirmed}
        completed={STATUSES.assigned in orderDetails?.status_logs}
      >
        <StepLabel
          StepIconComponent={StepIcon}
          // error={status === STATUSES.canceled && !isAssigned}
        >
          {orderDetails?.status === STATUSES.assigned
            ? t("spAssigned")
            : t("assigningSp")}
        </StepLabel>
      </Step>

      <Step
        active={orderDetails?.status === STATUSES.assigned}
        completed={STATUSES.inprogress in orderDetails?.status_logs}
      >
        <StepLabel
          StepIconComponent={StepIcon}
          // error={status === STATUSES.canceled && !isAssigned}
        >
          {t("inprogress")}
        </StepLabel>
      </Step>

      <Step
        active={orderDetails?.status === STATUSES.inprogress}
        completed={STATUSES.sp_done in orderDetails?.status_logs}
      >
        <StepLabel
          StepIconComponent={StepIcon}
          // error={status === STATUSES.canceled && !isAssigned}
        >
          {t("jobDone")}
        </StepLabel>
      </Step>

      <Step
        active={orderDetails?.status === STATUSES.sp_done}
        completed={orderDetails?.status === STATUSES.completed}
      >
        <StepLabel StepIconComponent={StepIcon}>{t("completed")}</StepLabel>
      </Step>
    </Stepper>
  );
}

export default OrderSteps;
