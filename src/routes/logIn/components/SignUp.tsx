// @flow
import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import InputLabel from "./InputLabel";
import { URL } from "../../../config";
import anime from "animejs";
import t from "typy";
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
  const animation = anime({
    targets: "input[type='text'], input[type='password'], input[type='mail']",
    translateX: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 0].map(
      (num: Number) => num
    ),
    duration: 100,
    loop: 2,
    autoplay: false,
    direction: "reverse",
  });
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
            placeholder="Your full name"
            props={{ ...formik.getFieldProps("fullName") }}
          />
          {t(formik.touched.fullName).isTrue &&
          !t(formik.errors.fullName).isNullOrUndefined ? (
            <div className="uk-text-danger uk-text-bold uk-text-left">
              {formik.errors.fullName}
              {!t(formik.errors.fullName).isNullOrUndefined
                ? animation.play()
                : animation.pause()}
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
            placeholder="Your full email"
            props={{ ...formik.getFieldProps("mail") }}
          />
          {t(formik.touched.mail).isTrue &&
          !t(formik.errors.mail).isNullOrUndefined ? (
            <div className="uk-text-danger uk-text-bold uk-text-left">
              {formik.errors.mail}
              {!t(formik.errors.mail).isNullOrUndefined
                ? animation.play()
                : animation.pause()}
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
            props={{ ...formik.getFieldProps("username") }}
          />
          {t(formik.touched.username).isTrue &&
          !t(formik.errors.username).isNullOrUndefined ? (
            <div className="uk-text-danger uk-text-bold uk-text-left">
              {formik.errors.username}
              {!t(formik.errors.username).isNullOrUndefined
                ? animation.play()
                : animation.pause()}
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
          {t(formik.touched.pass).isTrue &&
          !t(formik.errors.pass).isNullOrUndefined ? (
            <div className="uk-text-danger uk-text-bold uk-text-left">
              {formik.errors.pass}
              {!t(formik.errors.pass).isNullOrUndefined
                ? animation.play()
                : animation.pause()}
            </div>
          ) : null}
        </div>
        <div className="uk-margin uk-width-3-4@s uk-margin-small">
          <InputLabel
            forTag="passConfirm"
            placeholder="Confirm your password"
            id="passConfirm"
            type="password"
            label="Confirm your password"
            icon="lock"
            props={{ ...formik.getFieldProps("passConfirm") }}
          />
          {t(formik.touched.passConfirm).isTrue &&
          !t(formik.errors.passConfirm).isNullOrUndefined ? (
            <div className="uk-text-danger uk-text-bold uk-text-left">
              {formik.errors.passConfirm}
              {!t(formik.errors.passConfirm).isNullOrUndefined
                ? animation.play()
                : animation.pause()}
            </div>
          ) : null}
        </div>
        <div className="uk-margin-top uk-width-4-4@s uk-margin uk-text-left">
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
