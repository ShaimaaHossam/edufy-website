import { Routes, Route, useParams } from "react-router-dom";

import NotFound from "../../shared/views/NotFound";

import Properties from "./views/Properties";
import PropertyDetails from "./views/PropertyDetails";
import PropertyForm from "./views/PropertyForm";

import UnitForm from "./views/UnitForm";

import { isUUIDValid } from "../../helpers/routing";

const PropertyIDValidator = ({ children }) => {
  const { propertyID } = useParams();

  return isUUIDValid(propertyID) ? children : <NotFound />;
};

const UnitIDValidator = ({ children }) => {
  const { unitID } = useParams();

  return isUUIDValid(unitID) ? children : <NotFound />;
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

      <Route path="units/add" element={<UnitForm formType="add" />} />
      <Route
        path="units/clone/:unitID"
        element={
          <UnitIDValidator>
            <UnitForm formType="clone" />
          </UnitIDValidator>
        }
      />
      <Route
        path="units/edit/:unitID"
        element={
          <UnitIDValidator>
            <UnitForm formType="edit" />
          </UnitIDValidator>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PropertiesRoot;
