import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Route, MemoryRouter, Switch, Router } from "react-router-dom";
import User from "../routes/user/User";
import { renderWithProviders } from "../utils";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NoMatch from "../routes/NoMatch";
import { number } from "yup/lib/locale";
import { createMemoryHistory } from "history";

configure({ adapter: new Adapter() });

let container;
describe("<NoMatch/> component", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  describe("Render <User/> component", () => {
    test("With no existant user", async () => {
      const { findByText } = renderWithProviders(
        <Route path="/user/:username">
          <User />
        </Route>,
        {
          route: "/user/Jorge",
        }
      );
      await findByText("No match for");
    });
    describe("Render <NoMatch/> component", () => {
      const path = "/no/valid/path";

      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <NoMatch path={path} />
        </Router>
      );
      expect(screen.getByText(path)).toBeInTheDocument();
    });
  });
});
