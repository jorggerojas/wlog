import cookie from "react-cookies";

let URL = "https://blog-aos.herokuapp.com";
const removeCookie = (key: string) => {
  cookie.remove(key);
};
export { URL, removeCookie };
