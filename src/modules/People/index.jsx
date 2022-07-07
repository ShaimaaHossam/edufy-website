import { Routes, Route, Navigate, useParams } from "react-router-dom";

import usePermissions from "../../shared/hooks/usePermissions";

import TeamMembers from "./views/TeamMembers";
import Customers from "./views/Customers";

import TeamMembersForm from "./views/TeamMembersForm";
import CustomersForm from "./views/CustomersForm";

import NotFound from "../../shared/views/NotFound";

import PermissionValidator from "../../shared/components/PermissionValidator";
import { isUUIDValid } from "../../helpers/routing";

const TeamMembersIDValidator = ({ children }) => {
  const { teamMemberID } = useParams();

  return isUUIDValid(teamMemberID) ? children : <NotFound />;
};

const CustomersIDValidator = ({ children }) => {
  const { customerID } = useParams();

  return isUUIDValid(customerID) ? children : <NotFound />;
};

function PeopleRoot() {
  const peoplePerms = usePermissions("people");

  return (
    <Routes>
      <Route path="/team" element={<TeamMembers />} />
      <Route path="/customers" element={<Customers />} />

      <Route
        path="team/add"
        element={
          <PermissionValidator hasAccess={peoplePerms.create}>
            <TeamMembersForm formType="add" />
          </PermissionValidator>
        }
      />
      <Route
        path="team/clone/:teamMemberID"
        element={
          <PermissionValidator hasAccess={peoplePerms.create}>
            <TeamMembersIDValidator>
              <TeamMembersForm formType="clone" />
            </TeamMembersIDValidator>
          </PermissionValidator>
        }
      />
      <Route
        path="team/edit/:teamMemberID"
        element={
          <PermissionValidator hasAccess={peoplePerms.update}>
            <TeamMembersIDValidator>
              <TeamMembersForm formType="edit" />
            </TeamMembersIDValidator>
          </PermissionValidator>
        }
      />

      <Route
        path="customers/add"
        element={
          <PermissionValidator hasAccess={peoplePerms.create}>
            <CustomersForm formType="add" />
          </PermissionValidator>
        }
      />
      <Route
        path="customers/clone/:customerID"
        element={
          <PermissionValidator hasAccess={peoplePerms.create}>
            <CustomersIDValidator>
              <CustomersForm formType="clone" />
            </CustomersIDValidator>
          </PermissionValidator>
        }
      />
      <Route
        path="customers/edit/:customerID"
        element={
          <PermissionValidator hasAccess={peoplePerms.update}>
            <CustomersIDValidator>
              <CustomersForm formType="edit" />
            </CustomersIDValidator>
          </PermissionValidator>
        }
      />

      <Route path="/" element={<Navigate to="/people/team" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PeopleRoot;
