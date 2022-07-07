import AccessDenied from "../views/AccessDenied";

function PermissionValidator({ hasAccess, children }) {
  return hasAccess ? children : <AccessDenied />;
}

export default PermissionValidator;
