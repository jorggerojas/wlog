import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import InputLabel from "../InputLabel";

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
        <span className="uk-text-light"> - Sign Up</span>
      </h1>
      <form
        className="uk-grid uk-form-stacked uk-padding-small "
        uk-grid=""
        onSubmit={formik.handleSubmit}
      >
        <div className="uk-width-3-4@s uk-margin-small ">
          <InputLabel
            forTag="fullName"
            type="text"
            icon="happy"
            label="Full name"
            id="fullName"
            labelDirection="right"
            placeholder="Your full name"
            props={{ ...formik.getFieldProps("fullName") }}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div>{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div className="uk-width-3-4@s uk-margin-small">
          <InputLabel
            forTag="mail"
            type="email"
            icon="mail"
            label="Email"
            id="mail"
            labelDirection="right"
            placeholder="Your full email"
            props={{ ...formik.getFieldProps("mail") }}
          />
          {formik.touched.mail && formik.errors.mail ? (
            <div>{formik.errors.mail}</div>
          ) : null}
        </div>
        <div className="uk-width-3-4@s uk-margin-small ">
          <InputLabel
            forTag="username"
            placeholder="Your username"
            id="username"
            type="text"
            label="Username"
            icon="user"
            labelDirection="right"
            props={{ ...formik.getFieldProps("username") }}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
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
            labelDirection="right"
            props={{ ...formik.getFieldProps("pass") }}
          />
          {formik.touched.pass && formik.errors.pass ? (
            <div>{formik.errors.pass}</div>
          ) : null}
        </div>
        <div className="uk-margin uk-width-3-4@s uk-margin-small">
          <InputLabel
            forTag="passConfirm"
            placeholder="Confirm your password"
            id="passConfirm"
            type="password"
            labelDirection="right"
            label="Confirm your password"
            icon="lock"
            props={{ ...formik.getFieldProps("passConfirm") }}
          />
          {formik.touched.passConfirm && formik.errors.passConfirm ? (
            <div>{formik.errors.passConfirm}</div>
          ) : null}
        </div>
        <div className="uk-margin-top uk-width-4-4@s uk-margin uk-text-right">
          <input
            className="uk-button uk-button-primary"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>
      <p className="uk-padding-small">
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
