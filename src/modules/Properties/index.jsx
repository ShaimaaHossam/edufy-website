import { Routes, Route, useParams } from "react-router-dom";

import NotFound from "../../shared/views/NotFound";

import Properties from "./views/Properties";
import PropertyDetails from "./views/PropertyDetails";
import PropertyForm from "./views/PropertyForm";

import { isUUIDValid } from "../../helpers/routing";

const PropertyIDValidator = ({ children }) => {
  const { propertyID } = useParams();

  return isUUIDValid(propertyID) ? children : <NotFound />;
};

function PropertiesRoot() {
  return (
    <Routes>
      <Route index element={<Properties />} />

      <Route
        path=":propertyID"
        element={
          <PropertyIDValidator>
            <PropertyDetails />
          </PropertyIDValidator>
        }
      />

      <Route path="add" element={<PropertyForm formType="add" />} />
      <Route
        path="clone/:propertyID"
        element={
          <PropertyIDValidator>
            <PropertyForm formType="clone" />
          </PropertyIDValidator>
        }
      />
      <Route
        path="edit/:propertyID"
        element={
          <PropertyIDValidator>
            <PropertyForm formType="edit" />
          </PropertyIDValidator>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PropertiesRoot;
