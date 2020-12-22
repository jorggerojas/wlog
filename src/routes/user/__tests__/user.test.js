import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Route } from "react-router-dom";
import User from "../User";
import Data from "../components/Data";
import Comment from "../components/Comment";
import { renderWithProviders } from "../../../utils";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

let container;
describe("<User/> tree component", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  describe("Render <User/> component", () => {
    test("With user mamberroi", async () => {
      const { findByText } = renderWithProviders(
        <Route path="/user/:username">
          <User />
        </Route>,
        {
          route: "/user/mamberroi",
        }
      );
      await findByText("MAMBERROI");
    });
  });
  describe("Verify <Data/> component", () => {
    test("In <User/>", async () => {
      const dataProps = {
        username: "mamberroi",
      };
      const { findByText } = renderWithProviders(
        <Route path="/user/:username">
          <User>
            <Data {...dataProps}></Data>
          </User>
        </Route>,
        {
          route: `/user/${dataProps.username}`,
        }
      );
      await findByText(dataProps.username.toUpperCase());
    });
  });
  test("Verify <Comment/> render the props", async () => {
    const commentProps = {
      comment: "This is a comment",
      user: "mamberroi",
      date: "2020-12-12",
      id: "1",
      post: "2",
    };
    const wrapper = shallow(<Comment {...commentProps}></Comment>);
    await wrapper.containsMatchingElement(commentProps.comment);
  });
});
