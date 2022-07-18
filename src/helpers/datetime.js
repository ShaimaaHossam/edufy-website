import enLocale from "date-fns/locale/en-US";
import arLocale from "date-fns/locale/ar-SA";

import { format } from "date-fns";

const datetimeLocalesMap = { en: enLocale, ar: arLocale };

export const formats = {
  be: "yyyy-MM-dd",
  dateShort: "dd/MM/yyyy",
  dateShortSpaceSeparated: "dd MMM yyyy",
  dateTimeShort: "dd/MM/yyyy hh:mm aaa",
  timeShort: "hh:mmaaa",
};

export const formatDate = (date, formatStr = formats.be, locale, defaultFormat = true) => {

  if (!defaultFormat) date = date.split("-").reverse().join("-");

  if (!date) return null;

  return locale
    ? format(new Date(date), formatStr, { locale: datetimeLocalesMap[locale] })
    : format(new Date(date), formatStr);
};

export const toTimeZone = (date, tz = "UTC") => {
  if (!date) return null;

  return `${date} ${tz}`;
};
