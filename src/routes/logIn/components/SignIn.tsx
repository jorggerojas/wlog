import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import InputLabel from "./InputLabel";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";
interface SignInProps {
  handle: Function;
  loading: Function;
}

const SignIn = ({ handle, loading }: SignInProps) => {
  const info = (username: string) =>
    axios.get(`https://blog-aos.herokuapp.com/users/${username}`);
  const formik = useFormik({
    initialValues: {
      username: "",
      pass: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required("Username is required")
        .max(15, "Username must be at most 15 characters")
        .min(4, "Username must be at least 5 characters"),
      pass: yup
        .string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters"),
    }),
    onSubmit: function ({ username, pass }) {
      loading(true);
      axios
        .post("https://blog-aos.herokuapp.com/login", {
          nickname: username,
          pass: pass,
        })
        .then(({ headers }) => {
          setTimeout(() => {
            info(username).then(({ data }) => {
              console.log(data);
              if (data.isBlocked === "0") {
                localStorage.setItem(
                  "5e78863ed1ffb9fc66b1d61634b126bf8eb20267e7996297eeeb9b19c8c0f732",
                  headers.authorization.split(" ")[1]
                );
                localStorage.setItem(
                  "16f78a7d6317f102bbd95fc9a4f3ff2e3249287690b8bdad6b7810f82b34ace3",
                  data.nickname
                );
                loading(false);
                swal("bien", "good").then(() => {
                  window.location.href = "/";
                });
              }
            });
          }, 500);
        });
    },
  });
  return (
    <div
      className="uk-width-1-1 uk-height-large uk-text-right uk-animation-slide-right"
      uk-height-viewport="expand: true"
    >
      <h1 className=" uk-padding-small uk-margin-remove uk-margin-bottom">
        <Link
          to="/"
          className="uk-button-text"
          style={{
            color: "#fd7777",
            fontWeight: 500,
            letterSpacing: 3,
            textDecoration: "none",
          }}
        >
          WLOG{" "}
        </Link>
        <span className="uk-text-light"> - Sign In</span>
      </h1>
      <form
        method="POST"
        className="uk-grid-small uk-form-stacked uk-padding-small "
        uk-grid=""
        onSubmit={formik.handleSubmit}
      >
        <div className="uk-margin uk-width-3-4@s uk-margin-small ">
          <InputLabel
            forTag="username"
            placeholder="Your username"
            id="username"
            type="text"
            label="Username"
            icon="user"
            props={{ ...formik.getFieldProps("username") }}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="uk-text-danger uk-text-bold">
              {formik.errors.username}
            </div>
          ) : null}
        </div>
        <div className="uk-margin uk-width-3-4@s uk-margin-small">
          <InputLabel
            forTag="pass"
            placeholder="Your password"
            id="pass"
            type="password"
            label="Password"
            icon="lock"
            props={{ ...formik.getFieldProps("pass") }}
          />
          {formik.touched.pass && formik.errors.pass ? (
            <div className="uk-text-danger uk-text-bold">
              {formik.errors.pass}
            </div>
          ) : null}
        </div>
        <div className="uk-margin-top uk-width-3-4@s uk-margin">
          <input
            className="uk-button uk-button-primary"
            type="submit"
            value="Sign In"
          />
        </div>
      </form>
      <p className="uk-padding-small">
        Don't have an account?{" "}
        <span
          onClick={() => {
            handle();
          }}
        >
          <Link to="#">Sign up</Link>
        </span>
      </p>
    </div>
  );
};

export default SignIn;
