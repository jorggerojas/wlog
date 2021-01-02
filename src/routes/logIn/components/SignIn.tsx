// @flow
import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import anime from "animejs";
import t from "typy";
import InputLabel from "./InputLabel";
import { setInStorage, URL } from "../../../config";
import {
  LogoSignIn,
  TextChange,
  SpanLight,
  Submit,
  LinkUserComment,
} from "../../../styles/text";

interface SignInProps {
  handle: Function;
  loading: Function;
}

const SignIn = ({ handle, loading }: SignInProps) => {
  const info = (username: string) => axios.get(`${URL}/users/${username}`);
  const data = (username: string, pass: string) => {
    axios
      .post(`${URL}/login`, {
        nickname: username,
        pass: pass,
      })
      .then(({ headers }: any) => {
        setTimeout(() => {
          info(username).then(({ data }: any) => {
            if (data.isBlocked === "0") {
              setInStorage("TOKEN", headers.authorization.split(" ")[1]);
              setInStorage("USER", data.nickname);
              setInStorage("ROLE", data.role[0]);
              loading(false);
              window.location.href = "/";
            } else {
              swal({
                title: "Hey...",
                text: "We're sorry. Your account has been blocked",
                icon: "warning",
                buttons: {
                  cancel: { visible: false },
                  ok: {
                    className: "uk-button uk-button-warning ",
                    text: "Ok",
                    visible: true,
                  },
                },
                className: "uk-card",
                dangerMode: true,
              }).then(() => {
                loading(false);
              });
            }
          });
        }, 500);
      })
      .catch(() => {
        loading(false);
        swal({
          title: "Ooops...",
          text: "We couldn't find the user",
          icon: "error",
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
      });
  };
  const animation = anime({
    targets: "input[type='text'], input[type='password']",
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
    onSubmit: function ({ username, pass }: any) {
      loading(true);
      data(username, pass);
    },
  });
  return (
    <div
      className="uk-width-1-1 uk-height-large uk-text-right uk-animation-slide-right"
      uk-height-viewport="expand: true"
    >
      <h1 className=" uk-padding-small uk-margin-remove uk-margin-bottom">
        <Link to="/" className="uk-button-text uk-link-reset">
          <LogoSignIn>WLOG</LogoSignIn>
        </Link>
        <SpanLight className="uk-text-light"> - Sign In</SpanLight>
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
          {t(formik.touched.username).isTrue &&
          !t(formik.errors.username).isNullOrUndefined ? (
            <div
              id="errorUser"
              className="uk-text-left uk-margin-small uk-text-danger uk-text-bold"
            >
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
            <div className="uk-text-left uk-margin-small uk-text-danger uk-text-bold">
              {formik.errors.pass}
              {!t(formik.errors.pass).isNullOrUndefined
                ? animation.play()
                : animation.pause()}
            </div>
          ) : null}
        </div>
        <div className="uk-margin-top uk-width-3-4@s uk-margin">
          <Submit
            className="uk-button uk-button-primary"
            type="submit"
            value="Sign In"
          />
        </div>
      </form>
      <TextChange className="uk-padding-small">
        Don't have an account?{" "}
        <span
          onClick={() => {
            handle();
          }}
        >
          <LinkUserComment href="#s">Sign up</LinkUserComment>
        </span>
      </TextChange>
    </div>
  );
};

export default SignIn;
