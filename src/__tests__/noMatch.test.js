import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithRouter } from "../utils";
import NoMatch from "../routes/NoMatch";
import User from "../routes/user/User";

afterEach(cleanup);

describe("<NoMatch/> Component", () => {
  test("render component without route provided", async () => {
    const { container } = renderWithRouter(<NoMatch />, { route: "/" });
    await expect(container).toHaveTextContent(
      "We're looking for / but we don't have any results"
    );
    await expect(container).toMatchSnapshot();
  });
  test("render component trying to reach <User/> component with no username", async () => {
    const { container, finishLoading } = renderWithRouter(<User />, {
      route: "/user/",
    });
    await finishLoading();
    await expect(container).toHaveTextContent(
      "We're looking for /user/ but we don't have any results"
    );
    await expect(container).toMatchSnapshot();
  });
});
