// @flow
import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import InputLabel from "./InputLabel";
import { URL } from "../../../config";
import {
  LogoSignIn,
  TextChange,
  SpanLight,
  LinkUserComment,
  Submit,
} from "../../../styles/text";

interface SignUpProps {
  handle: Function;
  loading: Function;
}

const SignUp = ({ handle, loading }: SignUpProps) => {
  const sign = ({ fullName, mail, username, passConfirm, pass }: any) => {
    axios
      .post(`${URL}/users`, {
        name: fullName,
        dateLog: null,
        mail: mail,
        pass: pass,
        role: ["LECTOR"],
        isBlocked: 0,
        colorTheme: null,
        suscriptionUser: [],
        suscriptionTheme: [],
        nickname: username,
      })
      .then(({ data }: any) => {
        swal({
          title: "Success",
          text: "Just log in and enjoy!",
          icon: "success",
          buttons: {
            cancel: { visible: false },
            ok: {
              className: "uk-button uk-button-success ",
              text: "Let's do it",
              visible: true,
            },
          },
          className: "uk-card",
          dangerMode: false,
        }).then(() => {
          loading(false);
          handle();
        });
      })
      .catch((error) => {
        loading(false);
        if (error.response.status === 409) {
          swal({
            title: "Ooops...",
            text: "The username is already used",
            icon: "warning",
            buttons: {
              ok: { visible: false },
              cancel: {
                className: "uk-button uk-button-danger ",
                text: "Ok",
                visible: true,
              },
            },
            className: "uk-card",
            dangerMode: true,
          });
        }
      });
  };
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
      mail: yup
        .string()
        .required("Email is required")
        .email("Email must be a valid email"),
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
      loading(true);
      sign(values);
    },
  });

  return (
    <div className="uk-overflow-auto uk-height-large uk-width-1-1 uk-text-right uk-animation-slide-bottom">
      <h1 className=" uk-padding-small uk-margin-remove uk-margin-bottom">
        <Link to="/" className="uk-button-text uk-link-reset">
          <LogoSignIn>WLOG</LogoSignIn>
        </Link>
        <SpanLight className="uk-text-light"> - Sign Up</SpanLight>
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
            <div className="uk-text-danger uk-text-bold">
              {formik.errors.fullName}
            </div>
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
            <div className="uk-text-danger uk-text-bold">
              {formik.errors.mail}
            </div>
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
            labelDirection="right"
            props={{ ...formik.getFieldProps("pass") }}
          />
          {formik.touched.pass && formik.errors.pass ? (
            <div className="uk-text-danger uk-text-bold">
              {formik.errors.pass}
            </div>
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
            <div className="uk-text-danger uk-text-bold">
              {formik.errors.passConfirm}
            </div>
          ) : null}
        </div>
        <div className="uk-margin-top uk-width-4-4@s uk-margin uk-text-right">
          <Submit
            className="uk-button uk-button-primary"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>
      <TextChange className="uk-padding-small">
        Already a Wlog user?{" "}
        <span
          onClick={() => {
            handle();
          }}
        >
          <LinkUserComment href="#s">Sign in</LinkUserComment>
        </span>
      </TextChange>
    </div>
  );
};

export default SignUp;
