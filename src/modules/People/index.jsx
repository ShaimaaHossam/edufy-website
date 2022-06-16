import { Routes, Route, useParams } from "react-router-dom";
import NotFound from "../../shared/views/NotFound";
import TeamMembers from "./views/TeamMembers";
import TeamMembersForm from "./views/TeamMembersForm";

function PeopleRoot() {
  const { teamMemberID } = useParams();

  return (
    <Routes>
      <Route index element={<TeamMembers />} />
      <Route path="team/add" element={<TeamMembersForm formType="add" />} />
      <Route path="team/clone/:teamMemberID" element={<TeamMembersForm formType="clone" />} />
      <Route path="team/edit/:teamMemberID" element={<TeamMembersForm formType="edit" />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default PeopleRoot;
