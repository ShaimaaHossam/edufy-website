import { Routes, Route, Navigate, useParams } from "react-router-dom";

import NotFound from "../../shared/views/NotFound";

import Orders from "./views/Orders";
import OrderDetails from "./views/OrderDetails";
import OrderForm from "./views/OrderForm";

import { isUUIDValid } from "../../helpers/routing";
import { ORDER_TYPES } from "../../constants/system";

const OrderTypeValidator = ({ children }) => {
  const { orderType } = useParams();
  const types = Object.values(ORDER_TYPES);

  return types.indexOf(orderType) > -1 ? children : <NotFound />;
};

const OrderIDValidator = ({ children }) => {
  const { orderID } = useParams();

  return children;

  return isUUIDValid(orderID) ? children : <NotFound />;
};

function OrdersRoot() {
  return (
    <Routes>
      <Route
        path="/:orderType"
        element={
          <OrderTypeValidator>
            <Orders />
          </OrderTypeValidator>
        }
      />
      <Route
        path="/:orderType/:orderID"
        element={
          <OrderTypeValidator>
            <OrderIDValidator>
              <OrderDetails />
            </OrderIDValidator>
          </OrderTypeValidator>
        }
      />
      <Route
        path="/:orderType/add"
        element={
          <OrderTypeValidator>
            <OrderForm formType="add" />
          </OrderTypeValidator>
        }
      />

      <Route
        path="/"
        element={<Navigate replace to={`/orders/${ORDER_TYPES.maintenance}`} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default OrdersRoot;
