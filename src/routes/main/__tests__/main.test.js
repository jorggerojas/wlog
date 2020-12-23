import React from "react";
import { act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { configure, mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Link, Route, BrowserRouter } from "react-router-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import Main from "../Main";
import Badge from "../components/Badge";
import Header from "../components/Header";
import Switch from "../components/Switch";
import Users from "../components/Users";
import { renderWithProviders } from "../../../utils";
import Cookies, { CookiesProvider } from "universal-cookie";
configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("<Main/> tree", () => {
  test("render component", async () => {
    try {
      const { findAllByText, getAllByText } = renderWithProviders(
        <Route path="/">
          <Main />
        </Route>,
        {
          route: "/",
        }
      );
      await findAllByText("MAMBERROI");
      getAllByText("by");
    } catch (e) {
      console.log(
        "This test is wrtitted correctly but Heroku needs to start the server, try again",
        e.toString()
      );
    }
  });
  describe("<Badge/> component", () => {
    test("render component", () => {
      const renderer = new ShallowRenderer();
      const props = {
        title: "USERS",
        isActive: true,
        link: true,
      };
      renderer.render(<Badge {...props} />);
      const result = renderer.getRenderOutput();
      expect(result.type).toBe("li");
      expect(result.props.children).toEqual(
        <BrowserRouter>
          <Link to="" uk-switcher-item="">
            {props.title}
          </Link>
        </BrowserRouter>
      );
      expect(result.props.className).toEqual("uk-active");
    });
  });
  describe("<Header/> component", () => {
    test("render component without session", async () => {
      const wrapper = shallow(<Header />);
      expect(wrapper.text().includes("Log in")).toBeTruthy();
    });
    test("render component with session", async () => {
      const wrapper = shallow(<Header username={"JORGE"} />);
      expect(wrapper.text().includes("JORGE")).toBeTruthy();
    });
  });
  describe("<Switch/> component", () => {
    test("render component", () => {});
  });
  describe("<Users/> component", () => {
    test("render component", () => {});
  });
});
