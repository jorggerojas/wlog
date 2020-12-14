import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

interface SignUpProps {
  view: boolean;
  handle: Function;
}

const SignUp = ({ view, handle }: SignUpProps) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mail: "",
      username: "",
      pass: "",
      passConfirm: "",
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .required("Full name is required")
        .min(5, "Full name must be at least 5 characters")
        .max(50, "Full name must be at most 50 characters"),
      mail: yup.string().required("Email is required").email(),
      username: yup
        .string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters")
        .max(15, "Username must be at most 15 characters"),
      pass: yup
        .string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters"),
      passConfirm: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("pass")], "Passwords must be the same"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div
      className="uk-width-1-1 uk-text-right uk-animation-slide-bottom"
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
        <span> - Sign Up</span>
      </h1>
      <form
        className="uk-grid uk-form-stacked uk-padding-small "
        uk-grid=""
        onSubmit={formik.handleSubmit}
      >
        <div className="uk-width-3-4@s uk-margin-small ">
          <label
            className="uk-form-label uk-text-right"
            style={{ color: "#fd7777", fontWeight: 500 }}
            htmlFor="fullName"
          >
            Full name
          </label>
          <div className="uk-inline">
            <div className="uk-form-controls">
              <span
                className="uk-form-icon uk-text-bolder"
                style={{ color: "#fd7777" }}
                uk-icon="icon: happy"
              />
              <input
                className="uk-text-large uk-input uk-form-width-large"
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
                  height: 50,
                  maxWidth: "450px%",
                  color: "#fd7777",
                }}
                id="fullName"
                type="text"
                placeholder="Your full name"
                {...formik.getFieldProps("fullName")}
              />
            </div>
          </div>
          {formik.touched.fullName && formik.errors.fullName ? (
            <div>{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div className="uk-width-3-4@s uk-margin-small">
          <label
            className="uk-form-label uk-text-right"
            style={{ color: "#fd7777", fontWeight: 500 }}
            htmlFor="mail"
          >
            Email
          </label>
          <div className="uk-inline">
            <div className="uk-form-controls">
              <span
                className="uk-form-icon uk-text-bolder"
                style={{ color: "#fd7777" }}
                uk-icon="icon: user"
              />
              <input
                className="uk-text-large uk-input uk-form-width-large"
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
                  height: 50,
                  maxWidth: "450px%",
                  color: "#fd7777",
                }}
                id="mail"
                type={"email"}
                placeholder="Your mail"
                {...formik.getFieldProps("mail")}
              />
            </div>
          </div>
          {formik.touched.mail && formik.errors.mail ? (
            <div>{formik.errors.mail}</div>
          ) : null}
        </div>
        <div className="uk-width-3-4@s uk-margin-small ">
          <label
            className="uk-form-label uk-text-right"
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
                className="uk-text-large uk-input uk-form-width-large"
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
                  height: 50,
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
            <div>{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="uk-margin uk-width-3-4@s uk-margin-small">
          <label
            className="uk-form-label uk-text-right"
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
                className="uk-text-large uk-input uk-form-width-large"
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
                  height: 50,
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
            <div>{formik.errors.pass}</div>
          ) : null}
        </div>
        <div className="uk-margin uk-width-3-4@s uk-margin-small">
          <label
            className="uk-form-label uk-text-right"
            style={{ color: "#fd7777", fontWeight: 500 }}
            htmlFor="passConfirm"
          >
            Confirm your password
          </label>
          <div className="uk-inline">
            <div className="uk-form-controls">
              <span
                className="uk-form-icon uk-text-bolder"
                style={{ color: "#fd7777" }}
                uk-icon="icon: lock"
              />
              <input
                className="uk-text-large uk-input uk-form-width-large"
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
                  height: 50,
                  maxWidth: "450px%",
                  color: "#fd7777",
                }}
                id="passConfirm"
                type="password"
                placeholder="Confirm your password"
                {...formik.getFieldProps("passConfirm")}
              />
            </div>
          </div>
          {formik.touched.passConfirm && formik.errors.passConfirm ? (
            <div>{formik.errors.passConfirm}</div>
          ) : null}
        </div>
        <div className="uk-margin-top uk-width-3-4@s uk-margin">
          <input
            className="uk-button uk-button-primary uk-border-pill"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>
      <p>
        Already a Wlog user?{" "}
        <span
          onClick={() => {
            handle(view);
          }}
        >
          <Link to="#">Sign in</Link>
        </span>
      </p>
    </div>
  );
};

export default SignUp;
