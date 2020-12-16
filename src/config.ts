import cookie from "react-cookies";

let URL = "https://blog-aos.herokuapp.com";
const removeCookie = (key: string) => {
  cookie.remove(key);
};

const parseDate = (date: string, symbol?: string) => {
  const month = () => {
    switch (date.split(symbol ?? "-")[1]) {
      case "01":
        return "january";
      case "02":
        return "february";
      case "03":
        return "march";
      case "04":
        return "april";
      case "05":
        return "may";
      case "06":
        return "june";
      case "07":
        return "july";
      case "08":
        return "august";
      case "09":
        return "september";
      case "10":
        return "october";
      case "11":
        return "november";
      case "12":
        return "december";
    }
  };
  const day = () => {
    if (parseInt(date.split(symbol ?? "-")[2]) === 1)
      return `${date.split(symbol ?? "-")[2]}st`;
    else if (parseInt(date.split(symbol ?? "-")[2]) === 2)
      return `${date.split(symbol ?? "-")[2]}nd`;
    else if (parseInt(date.split(symbol ?? "-")[2]) === 3)
      return `${date.split(symbol ?? "-")[2]}rd`;
    else return `${date.split(symbol ?? "-")[2]}th`;
  };
  return `${month()} ${
    parseInt(day()) < 10 ? day().substr(1, day().length - 1) : day()
  } of ${date.split(symbol ?? "-")[0]}`;
};
export { URL, removeCookie, parseDate };
