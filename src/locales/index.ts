import { enUS, sv } from "date-fns/esm/locale";

export const getLocale = (locale: string) => {
  switch (locale) {
    case "en":
      return {
        dateFns: enUS,
        momentFormat: "MM-DD-YYYY",
        rdpFormat: "MM/dd/yyyy"
      };
    case "sv":
      return {
        dateFns: sv,
        momentFormat: "DD-MM-YYYY",
        rdpFormat: "dd/MM/yyyy"
      };
    default:
      return { dateFns: enUS };
  }
};
