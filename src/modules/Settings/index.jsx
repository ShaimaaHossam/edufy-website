import { Routes, Route, Navigate, useParams } from "react-router-dom";

import PersonalInformationForm from "./views/PersonalInformationForm";
import Notifications from "./views/Notifications";
import Roles from "./views/Roles";
import Permissions from "./views/Permissions";
import ServicesSettings from "./views/ServicesSettings";
import NotFound from "../../shared/views/NotFound";

import PermissionValidator from "../../shared/components/PermissionValidator";
import { isUUIDValid } from "../../helpers/routing";

import usePermissions from "../../shared/hooks/usePermissions";

const RoleIDValidator = ({ children }) => {
  const { roleID } = useParams();

  return isUUIDValid(roleID) ? children : <NotFound />;
};

function Settings() {
  const settingPerms = usePermissions("setting");

  return (
    <Routes>
      <Route
        path="personal"
        element={
          <PermissionValidator hasAccess={settingPerms.access}>
            <PersonalInformationForm />
          </PermissionValidator>
        }
      />
      <Route
        path="notifications"
        element={
          <PermissionValidator hasAccess={settingPerms.access}>
            <Notifications />
          </PermissionValidator>
        }
      />
      <Route
        path="roles"
        element={
          <PermissionValidator hasAccess={settingPerms.access}>
            <Roles />
          </PermissionValidator>
        }
      />
      <Route
        path="services-settings"
        element={
          <PermissionValidator hasAccess={settingPerms.access}>
            <ServicesSettings />
          </PermissionValidator>
        }
      />

      <Route
        path="roles/edit/:roleID"
        element={
          <PermissionValidator hasAccess={settingPerms.access_details}>
            <RoleIDValidator>
              <Permissions />
            </RoleIDValidator>
          </PermissionValidator>
        }
      />

      <Route path="/" element={<Navigate to="/settings/personal" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Settings;
