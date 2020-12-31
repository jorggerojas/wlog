import React from "react";
import { cleanup } from "@testing-library/react";
import axiosMock from "axios";
import Badge from "../routes/main/components/Badge";
import Header from "../routes/main/components/Header";
import Switch from "../routes/main/components/Switch";
import Users from "../routes/main/components/Users";
import { renderWithRouter } from "../utils";

afterEach(() => {
  cleanup();
  localStorage.clear();
});
jest.mock("axios");

describe("<App/> tree", () => {
  describe("<Header/> component", () => {
    test("render component without session", async () => {
      localStorage.clear();
      const { container } = renderWithRouter(
        <Header theme={false} handle={() => {}} />
      );
      await expect(container.innerHTML.includes("Log in")).toBeTruthy();
      await expect(container).toMatchSnapshot();
    });
    test("render component with session", async () => {
      localStorage.setItem("USER", "RealUser1");
      const { container } = renderWithRouter(
        <Header theme={false} handle={() => {}} />
      );
      await expect(container.innerHTML).not.toMatch("Log in");
      await expect(container.innerHTML).toMatch("REALUSER1");
      await expect(container).toMatchSnapshot();
    });
  });
  describe("<Badge/> component", () => {
    test("render component", async () => {
      const props = {
        title: "USERS",
        isActive: true,
        link: true,
      };
      const { container } = renderWithRouter(<Badge {...props} />);
      await expect(container.firstChild).toHaveClass("uk-active");
      await expect(container.innerHTML).toMatch(props.title);
      await expect(container).toMatchSnapshot();
    });
  });
  describe("<Users/> component", () => {
    test("render component", async () => {
      const fakeUsers = [
        {
          key: "JorgeRojas",
          role: "ADMIN",
          name: "Jorge Rojas",
          username: "JorgeRojas",
          datelog: "2020-12-12",
        },
        {
          key: "mamberroi",
          role: "LECTOR",
          name: "Mamberroi One",
          username: "mamberroi",
          datelog: "2019-10-12",
        },
      ];
      axiosMock.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: { content: fakeUsers },
        })
      );
      const { container } = renderWithRouter(<Users theme={false} />);
      await expect(axiosMock.get).toHaveBeenCalledTimes(1);
      await expect(container.innerHTML).toMatch("LECTOR");
      await expect(container.innerHTML).toMatch("ADMIN");
      await expect(container.innerHTML).toMatch("Role");
      await expect(container).toMatchSnapshot();
    });
  });
  describe("<Switch/> component", () => {
    test("render component and change the input value", async () => {
      const { container } = renderWithRouter(
        <Switch check={false} checked={() => {}} />
      );
      await expect(container.firstChild.firstChild.firstChild.checked).toBe(
        false
      );
      const check = (container.firstChild.firstChild.firstChild.checked = true);
      await expect(check).toBe(true);
    });
  });
});
