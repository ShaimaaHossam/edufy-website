import { Routes, Route, useParams } from "react-router-dom";
import NotFound from "../../shared/views/NotFound";

import TeamMembersForm from "./views/TeamMembersForm";

import CustomersForm from "./views/CustomersForm";

import People from "./views/People";

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
  return (
    <Routes>
      <Route index element={<People />} />

      <Route path="team/add" element={<TeamMembersForm formType="add" />} />
      <Route
        path="team/clone/:teamMemberID"
        element={
          <TeamMembersIDValidator>
            <TeamMembersForm formType="clone" />
          </TeamMembersIDValidator>
        }
      />
      <Route
        path="team/edit/:teamMemberID"
        element={
          <TeamMembersIDValidator>
            <TeamMembersForm formType="edit" />
          </TeamMembersIDValidator>
        }
      />

      <Route path="customers/add" element={<CustomersForm formType="add" />} />
      <Route
        path="customers/clone/:customerID"
        element={
          <CustomersIDValidator>
            <CustomersForm formType="clone" />
          </CustomersIDValidator>
        }
      />
      <Route
        path="customers/edit/:customerID"
        element={
          <CustomersIDValidator>
            <CustomersForm formType="edit" />
          </CustomersIDValidator>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PeopleRoot;
