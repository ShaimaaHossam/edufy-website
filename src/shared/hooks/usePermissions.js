import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/auth";

/**
 * return all permissions when there is no argumnts
 *
 * when pass array of strings or single string it will it will return that specific permissions
 *
 * @param  keys
 */

function usePermissions(keys) {
  const { permissions } = useSelector(authSelector);

  if (!keys) {
    return permissions;
  }

  if (typeof keys === "string") {
    return permissions[keys] || {};
  }

  if (keys instanceof Array) {
    const selectedPermissions = keys.reduce(
      (acc, key) => ({ ...acc, [key]: permissions[key] ?? {} }),
      {}
    );
    return selectedPermissions;
  }
  return {};
}

export default usePermissions;
