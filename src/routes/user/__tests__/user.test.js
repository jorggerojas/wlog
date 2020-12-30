import React from "react";
import { cleanup } from "@testing-library/react";
import axiosMock from "axios";
import { renderWithRouter } from "../../../utils";
import User from "../User";
import Data from "../components/Data";
import Comment from "../components/Comment";

afterEach(() => {
  cleanup();
});
jest.mock("axios");

describe("<User/> tree component", () => {
  describe("render <User/> component", () => {
    test("with invalid username", async () => {
      const fakeUser = {
          role: ["ADMIN"],
          name: "Faker User López",
          dateLog: "2020-12-12",
          mail: "fakeUser1@viaducto.com",
          isBlocked: "0",
          nickname: "FakeUser1",
          id: "1",
        },
        route = "/user/realUser";
      axiosMock.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: fakeUser,
        })
      );
      const { container, finishLoading } = renderWithRouter(<User />, {
        route: route,
      });
      await finishLoading();
      await expect(container.innerHTML).toMatch(
        `No match for <code>${route}</code>`
      );
      await expect(container).toMatchSnapshot();
    });
  });
  describe("<Data/> component", () => {
    test("render component with props", async () => {
      const props = {
        role: "ADMIN",
        name: "Real User López",
        dateLog: "2020-12-12",
        mail: "realUser1@viaducto.com",
        isBlocked: "0",
        username: "realUser",
        id: "1",
      };
      const { container } = renderWithRouter(<Data {...props} />);
      await expect(container.firstChild.firstChild).toHaveTextContent(
        props.username.toUpperCase()
      );
      await expect(container).toMatchSnapshot();
    });
  });
  describe("<Comment/> component", () => {
    test("render component with props", async () => {
      const commentProps = {
        comment: "This is a comment",
        user: "mamberroi",
        date: "2020-12-12",
        id: "1",
        post: "2",
      };
      const { container } = renderWithRouter(<Comment {...commentProps} />);
      await expect(container.firstChild.firstChild).toHaveTextContent(
        `${commentProps.date}"${commentProps.comment}"`
      );
      await expect(container).toMatchSnapshot();
    });
  });
});
