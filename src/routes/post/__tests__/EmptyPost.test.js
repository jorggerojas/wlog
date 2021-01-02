import React from "react";
import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import axiosMock from "axios";
import EmptyPost from "../components/EmptyPost";
import { renderWithRouter } from "../../../utils";
import * as helper from "../../post/helpers/postHelpers";

afterEach(() => {
  cleanup();
  localStorage.clear();
});
jest.mock("axios");
jest.mock("../../post/helpers/postHelpers");

describe("<EmptyPost/> component", () => {
  test("render component without session", async () => {
    const { container } = renderWithRouter(<EmptyPost />, { route: "/create" });
    await expect(container).not.toHaveTextContent(
      "Create here your post, fill all the fields and share!"
    );
    await expect(container).toHaveTextContent(
      `We're looking for /create but we don't have any results`
    );
    await expect(container).toMatchSnapshot();
  });
  test("render component with session", async () => {
    localStorage.setItem("ROLE", "ADMIN");
    localStorage.setItem("USER", "RealUser1");
    const { container } = renderWithRouter(<EmptyPost />, { route: "/create" });
    await expect(container).toHaveTextContent(
      "Create here your post, fill all the fields and share!"
    );
    await expect(container).not.toHaveTextContent("No match for /create");
    await expect(container).toMatchSnapshot();
  });
  test("filling inputs right", async () => {
    localStorage.setItem("ROLE", "ADMIN");
    localStorage.setItem("USER", "RealUser1");
    helper.submitForm = jest.fn();
    axiosMock.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
        status: 201,
      })
    );
    const { container, getByTestId } = renderWithRouter(<EmptyPost />, {
      route: "/create",
    });
    var title = getByTestId("title");
    var summary = getByTestId("summary");
    var content = getByTestId("content");
    var keywords = getByTestId("keywords");
    var save = getByTestId("save");
    fireEvent.change(title, {
      target: {
        value: "My post title",
      },
    });
    fireEvent.change(summary, {
      target: {
        value: "My summary",
      },
    });
    fireEvent.change(content, {
      target: {
        value: "The content",
      },
    });
    fireEvent.change(keywords, {
      target: {
        value: "war",
      },
    });
    fireEvent.keyPress(keywords, { key: "Space", code: 32, charCode: 32 });
    fireEvent.submit(save);
    await expect(container.firstChild.lastChild).toMatchSnapshot();
    await waitFor(() => {
      expect(helper.submitForm).toHaveBeenCalledTimes(1);
    });
    await expect(container).toMatchSnapshot();
  });
});
