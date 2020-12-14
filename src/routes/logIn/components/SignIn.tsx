import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

interface SignInProps {
  view: boolean;
  handle: Function;
}

const SignIn = ({ view, handle }: SignInProps) => {
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        <span> - Sign In</span>
      </h1>
      <form
        className="uk-grid-small uk-form-stacked uk-padding-small "
        uk-grid=""
        onSubmit={formik.handleSubmit}
      >
        <div className="uk-margin uk-width-3-4@s uk-margin-small ">
          <label
            className="uk-form-label uk-text-left"
            style={{ color: "#fd7777", fontWeight: 500 }}
            htmlFor="username"
          >
            Username
          </label>
          <div className="uk-inline">
            <div className="uk-form-controls">
              <span
                className="uk-form-icon uk-text-bolder"
                style={{ color: "#fd7777" }}
                uk-icon="icon: user"
              />
              <input
                className={`uk-text-large uk-input uk-form-width-large`}
                style={{
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "2px solid",
                  borderBottom: "2px solid",
                  borderRadius: 1,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 35,
                  height: 55,
                  maxWidth: "450px%",
                  color: "#fd7777",
                }}
                id="username"
                type="text"
                placeholder="Your username"
                {...formik.getFieldProps("username")}
              />
            </div>
          </div>
          {formik.touched.username && formik.errors.username ? (
            <div className="uk-text-danger uk-text-bold">
              {formik.errors.username}
            </div>
          ) : null}
        </div>
        <div className="uk-margin uk-width-3-4@s uk-margin-small">
          <label
            className="uk-form-label uk-text-left"
            style={{ color: "#fd7777", fontWeight: 500 }}
            htmlFor="pass"
          >
            Password
          </label>
          <div className="uk-inline">
            <div className="uk-form-controls">
              <span
                className="uk-form-icon uk-text-bolder"
                style={{ color: "#fd7777" }}
                uk-icon="icon: lock"
              />
              <input
                className={`uk-text-large uk-input uk-form-width-large`}
                style={{
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "2px solid",
                  borderBottom: "2px solid",
                  borderRadius: 1,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 35,
                  height: 55,
                  maxWidth: "450px%",
                  color: "#fd7777",
                }}
                id="pass"
                type="password"
                placeholder="Your password"
                {...formik.getFieldProps("pass")}
              />
            </div>
          </div>
          {formik.touched.pass && formik.errors.pass ? (
            <div className="uk-text-danger uk-text-bold">
              {formik.errors.pass}
            </div>
          ) : null}
        </div>
        <div className="uk-margin-top uk-width-3-4@s uk-margin">
          <input
            className="uk-button uk-button-primary uk-border-pill"
            type="submit"
            value="Sign In"
          />
        </div>
      </form>
      <p>
        Don't have an account?{" "}
        <span
          onClick={() => {
            handle(view);
          }}
        >
          <Link to="#">Sign up</Link>
        </span>
      </p>
    </div>
  );
};

export default SignIn;
