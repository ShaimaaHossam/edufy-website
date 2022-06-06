import { format } from "date-fns";

export const formatDate = (date, formatStr = "yyyy-MM-dd") => {
  return format(date, formatStr);
};
