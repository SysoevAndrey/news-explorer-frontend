import { months } from "../constants/constants";

const dateFormatter = (date) => {
  const [year, month, day] = date.slice(0, 10).split("-");

  return `${day} ${months[month]}, ${year}`;
};

export default dateFormatter;
