// @flow

let URL = "https://blog-aos.herokuapp.com";

const loadStorage = (key: string) => localStorage.getItem(key) ?? "";

const setInStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const clearStorage = (key: string = "all") => {
  key === "all" ? localStorage.clear() : localStorage.removeItem(key);
};

const parseDate = (date: string, symbol?: string) => {
  const month = () => {
    switch (date.split(symbol ?? "-")[1]) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
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
export { URL, loadStorage, setInStorage, clearStorage, parseDate };
