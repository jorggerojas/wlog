import React, { useState } from "react";
import { useFormik } from "formik";
import t from "typy";
import * as yup from "yup";
import { Link } from "react-router-dom";
import anime from "animejs";
import Header from "../../main/components/Header";
import { deleteKey, setKey, submitForm } from "../helpers/postHelpers";
import Loading from "../../loading/Loading";
import { loadStorage } from "../../../config";
import {
  AccordionTitle,
  InputPost,
  Submit,
  TextAreaPost,
  Title2,
} from "../../../styles/text";
import { Container, ContainerPost } from "../../../styles/containers";
import NoMatch from "../../NoMatch";

interface EmptyPostProps {
  theme: boolean;
  handle: Function;
}

const EmptyPost = ({ theme, handle }: EmptyPostProps) => {
  const USER = loadStorage("USER");
  const ROLE = loadStorage("ROLE");
  const [load, setLoad] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [keywordList, setKeywordList] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      content: "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .required("Title is required")
        .min(2, "Title must has 2 characters or more"),
      summary: yup
        .string()
        .required("Summary is required")
        .min(2, "Summary must has 2 characters or more"),
      content: yup
        .string()
        .required("Content is required")
        .min(2, "Content must has 2 characters or more"),
    }),
    onSubmit: (values: any) => {
      submitForm(values, keywordList, setEmpty, setLoad);
    },
  });
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
  if (ROLE !== "ADMIN" && ROLE !== "REDACTOR" && USER === "") {
    return <NoMatch theme={theme} handle={handle} />;
  }
  return (
    <Container className="uk-animation-fade">
      <Header theme={theme} handle={handle} />
      {t(load).isTrue ? (
        <Loading load={load} />
      ) : (
        <ContainerPost className="uk-padding">
          <div>
            <Title2 className="uk-text-left">
              Create here your post, fill all the fields and share!
            </Title2>
            <form
              className="post uk-align-center"
              onSubmit={formik.handleSubmit}
            >
              <ul uk-accordion="multiple: true">
                <li className="uk-open">
                  <Link className="uk-accordion-title" to="#">
                    <AccordionTitle>Title</AccordionTitle>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      <InputPost
                        className="uk-input"
                        type="text"
                        placeholder="Something cool..."
                        data-testid={"title"}
                        {...formik.getFieldProps("title")}
                      />
                      {t(formik.touched.title).isTrue &&
                      !t(formik.errors.title).isNullOrUndefined ? (
                        <div className="uk-text-danger uk-text-bold">
                          {formik.errors.title}
                          {!t(formik.errors.title).isNullOrUndefined
                            ? animation.play()
                            : animation.pause()}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="uk-accordion-title" to="#">
                    <AccordionTitle>Summary</AccordionTitle>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      <TextAreaPost
                        className="uk-textarea"
                        rows={3}
                        placeholder="Something short and cool"
                        data-testid={"summary"}
                        {...formik.getFieldProps("summary")}
                      />
                      {t(formik.touched.summary).isTrue &&
                      !t(formik.errors.summary).isNullOrUndefined ? (
                        <div className="uk-text-danger uk-text-bold">
                          {formik.errors.summary}
                          {!t(formik.errors.summary).isNullOrUndefined
                            ? animation.play()
                            : animation.pause()}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="uk-accordion-title" to="#">
                    <AccordionTitle>Content</AccordionTitle>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      <TextAreaPost
                        className="uk-textarea"
                        rows={10}
                        placeholder="All you need is type"
                        data-testid={"content"}
                        {...formik.getFieldProps("content")}
                      />
                      {t(formik.touched.content).isTrue &&
                      !t(formik.errors.content).isNullOrUndefined ? (
                        <div className="uk-text-danger uk-text-bold">
                          {formik.errors.content}
                          {!t(formik.errors.content).isNullOrUndefined
                            ? animation.play()
                            : animation.pause()}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="uk-accordion-title" to="#">
                    <AccordionTitle>Keywords</AccordionTitle>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      <div>
                        <p className="uk-text-meta uk-text-small">
                          Press the key{" "}
                          <span className="uk-text-italic">"Space"</span> or
                          <span className="uk-text-italic">"," (comma)</span> or
                          <span className="uk-text-italic">
                            "." (period)
                          </span>{" "}
                          to add the word to the list.
                        </p>
                        <InputPost
                          className="uk-input"
                          type="text"
                          placeholder="Few and cool words"
                          defaultValue={""}
                          data-testid={"keywords"}
                          onKeyUp={(e) =>
                            setKey(keywordList, setKeywordList, e)
                          }
                        />
                        {t(empty).isTrue ? (
                          <div className="uk-text-danger uk-text-bold">
                            Remember set least one keyword
                            {t(empty).isTrue
                              ? animation.play()
                              : animation.pause()}
                          </div>
                        ) : null}
                        <div className="uk-placeholder uk-text-center">
                          {keywordList.map((keyword: string) => {
                            return (
                              <span
                                key={keyword}
                                onClick={(e) =>
                                  deleteKey(keywordList, setKeywordList, e)
                                }
                                className="key uk-margin-small-right uk-badge uk-padding-small"
                              >
                                {keyword.toUpperCase()}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="uk-margin uk-padding-small uk-text-right">
                <Submit
                  className="uk-button uk-button-primary"
                  type="submit"
                  value="Save"
                  data-testid={"save"}
                />
              </div>
            </form>
          </div>
        </ContainerPost>
      )}
    </Container>
  );
};

export default EmptyPost;
