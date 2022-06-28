import { Routes, Route, useParams } from "react-router-dom";

import usePermissions from "../../shared/hooks/usePermissions";

import NotFound from "../../shared/views/NotFound";

import Properties from "./views/Properties";
import PropertyDetails from "./views/PropertyDetails";
import PropertyForm from "./views/PropertyForm";

import UnitForm from "./views/UnitForm";

import PermissionValidator from "../../shared/components/PermissionValidator";
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
  const { property: propertiesPerms, unit: unitsPerms } = usePermissions(["property", "unit"]);


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

      <Route
        path="add"
        element={
          <PermissionValidator hasAccess={propertiesPerms.create}>
            <PropertyForm formType="add" />
          </PermissionValidator>
        }
      />
      <Route
        path="clone/:propertyID"
        element={
          <PermissionValidator hasAccess={propertiesPerms.create}>
            <PropertyIDValidator>
              <PropertyForm formType="clone" />
            </PropertyIDValidator>
          </PermissionValidator>
        }
      />
      <Route
        path="edit/:propertyID"
        element={
          <PermissionValidator hasAccess={propertiesPerms.update}>
            <PropertyIDValidator>
              <PropertyForm formType="edit" />
            </PropertyIDValidator>
          </PermissionValidator>
        }
      />

      <Route
        path="units/add"
        element={
          <PermissionValidator hasAccess={unitsPerms.create}>
            <UnitForm formType="add" />
          </PermissionValidator>
        }
      />
      <Route
        path="units/clone/:unitID"
        element={
          <PermissionValidator hasAccess={unitsPerms.create}>
            <UnitIDValidator>
              <UnitForm formType="clone" />
            </UnitIDValidator>
          </PermissionValidator>
        }
      />
      <Route
        path="units/edit/:unitID"
        element={
          <PermissionValidator hasAccess={unitsPerms.update}>
            <UnitIDValidator>
              <UnitForm formType="edit" />
            </UnitIDValidator>
          </PermissionValidator>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PropertiesRoot;
