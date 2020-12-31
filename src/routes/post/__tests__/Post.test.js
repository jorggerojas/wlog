import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import axiosMock from "axios";
import { Route } from "react-router-dom";
import Post from "../Post";
import Comment from "../components/Comment";
import CommentBox from "../components/CommentBox";
import PostMinified from "../components/PostMinified";
import { renderWithRouter, renderWithProviders } from "../../../utils";

afterEach(() => {
  cleanup();
  localStorage.clear();
});
jest.mock("axios");

describe("<Post/> tree", () => {
  test("render component", async () => {
    const post = {
      title: "My super real post",
      date: "2020-12-12",
      user: "RealUser1",
      summary: "The summary of the post",
      content: "The content of the post",
      badge: ["WAR", "TEST"],
      id: "1",
    };
    axiosMock.get.mockImplementation(() =>
      Promise.resolve({
        data: post,
      })
    );
    localStorage.setItem("ROLE", "ADMIN");
    localStorage.setItem("USER", post.user);
    localStorage.setItem("content", JSON.stringify(post));
    const { container } = renderWithProviders(
      <Route path="/user/:user/post/:id">
        <Post handle={() => {}} theme={true} />
      </Route>,
      {
        route: "/user/real/post/1",
      }
    );
    await expect(container).toHaveTextContent(post.user.toUpperCase());
    await expect(container).toMatchSnapshot();
  });
  describe("children components", () => {
    test("<CommentBox/> component render", async () => {
      const { container, getByTestId } = render(
        <CommentBox getComments={() => {}} setComments={() => {}} post={1} />
      );
      const box = getByTestId("comment");
      fireEvent.change(box, { target: { value: "My comment" } });
      await expect(container.innerHTML).toMatch(
        "Remember be kind with the author and all the community"
      );
      await expect(box.innerHTML).toMatch("My comment");
      await expect(container).toMatchSnapshot();
    });
    describe("<Comment/> component", () => {
      test("Without close icon", async () => {
        const props = {
          comment: "A real comment made by MamberroiArcos",
          user: "MamberroiArcos",
          date: "2020-12-30",
          id: "myId",
          post: "aRealPost",
        };
        const { container } = render(<Comment {...props} />);
        await expect(container.innerHTML).toMatch(
          `${props.comment
            .toUpperCase()
            .substr(0, 1)}${props.comment
            .toLowerCase()
            .substr(1, props.comment.length - 1)}`
        );
        await expect(container.innerHTML).not.toMatch("close");
        await expect(container).toMatchSnapshot();
      });
      test("With close icon", async () => {
        localStorage.setItem("USER", "RealUser1");
        localStorage.setItem("ROLE", "ADMIN");
        const props = {
          comment: "A real comment made by MamberroiArcos",
          user: "MamberroiArcos",
          date: "2020-12-30",
          id: "myId",
          post: "aRealPost",
        };
        const { container } = render(<Comment {...props} />);
        await expect(container.innerHTML).toMatch(
          `${props.comment
            .toUpperCase()
            .substr(0, 1)}${props.comment
            .toLowerCase()
            .substr(1, props.comment.length - 1)}`
        );
        await expect(
          container.innerHTML.includes(`uk-icon="icon:close"`)
        ).toBeTruthy();
        await expect(container).toMatchSnapshot();
      });
    });
  });
});

describe("<PostMinified/> component", () => {
  test("render component", async () => {
    const post = {
      title: "My super real post",
      date: "2020-12-12",
      user: "RealUser1",
      summary: "The summary of the post",
      content: "The content of the post",
      badge: "WAR",
      id: "1",
      large: true,
    };
    const { container } = renderWithRouter(<PostMinified {...post} />);
    await expect(container.innerHTML).toMatch(
      `${post.title.toUpperCase().substr(0, 14)}...`
    );
    await expect(container.innerHTML).toMatch(`${post.badge}`);
    await expect(container).toMatchSnapshot();
  });
});
