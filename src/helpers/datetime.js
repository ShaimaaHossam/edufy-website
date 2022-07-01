import enLocale from "date-fns/locale/en-US";
import arLocale from "date-fns/locale/ar-SA";

import { format } from "date-fns";

const datetimeLocalesMap = { en: enLocale, ar: arLocale };

export const formats = {
  be: "yyyy-MM-dd",
  dateShort: "dd/MM/yyyy",

  dateTimeShort: "dd/MM/yyyy hh:mmaaa",
};

export const formatDate = (date, formatStr = formats.be, locale) => {
  if (!date) return null;

  return locale
    ? format(new Date(date), formatStr, { locale: datetimeLocalesMap[locale] })
    : format(new Date(date), formatStr);
};

export const toTimeZone = (date, tz = "UTC") => {
  if (!date) return null;

  return `${date} ${tz}`;
};
