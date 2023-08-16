import { isDate } from "date-fns";

export const isDateF = (value, { req, location, path }) => {
  if (!value) {
    return false;
  }

  const fecha = isDate(value);
  return fecha;
};
