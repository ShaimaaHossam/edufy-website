import { Routes, Route, useParams } from "react-router-dom";
import NotFound from "../../shared/views/NotFound";
import TeamMembers from "./views/TeamMembers";
import TeamMembersForm from "./views/TeamMembersForm";

function PeopleRoot() {
  return (
    <Routes>
      <Route index element={<TeamMembers />} />
      <Route path="add" element={<TeamMembersForm formType="add" />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default PeopleRoot;
