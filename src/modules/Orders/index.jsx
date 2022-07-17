import { Routes, Route, Navigate, useParams } from "react-router-dom";

import NotFound from "../../shared/views/NotFound";
import PermissionValidator from "../../shared/components/PermissionValidator";

import Orders from "./views/Orders";
import OrderDetails from "./views/OrderDetails";
import OrderForm from "./views/OrderForm";

import { isUUIDValid } from "../../helpers/routing";
import { ORDER_TYPES } from "../../constants/system";
import usePermissions from "../../shared/hooks/usePermissions";

const OrderTypeValidator = ({ children }) => {
  const { orderType } = useParams();
  const types = Object.values(ORDER_TYPES);

  return types.indexOf(orderType) > -1 ? children : <NotFound />;
};

const OrderIDValidator = ({ children }) => {
  const { orderID } = useParams();

  return isUUIDValid(orderID) ? children : <NotFound />;
};

function OrdersRoot() {
  const ordersPerms = usePermissions("order_transaction");

  return (
    <Routes>
      <Route
        path="/:orderType"
        element={
          <OrderTypeValidator>
            <PermissionValidator hasAccess={ordersPerms.access}>
              <Orders />
            </PermissionValidator>
          </OrderTypeValidator>
        }
      />
      <Route
        path="/:orderType/:orderID"
        element={
          <OrderTypeValidator>
            <OrderIDValidator>
              <PermissionValidator hasAccess={ordersPerms.access_details}>
                <OrderDetails />
              </PermissionValidator>
            </OrderIDValidator>
          </OrderTypeValidator>
        }
      />
      <Route
        path="/:orderType/add"
        element={
          <OrderTypeValidator>
            <PermissionValidator hasAccess={ordersPerms.create}>
              <OrderForm formType="add" />
            </PermissionValidator>
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
