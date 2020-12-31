import React from "react";
import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import "@testing-library/jest-dom";

const renderWithRouter = (ui, { route = "/", ...renderOptions } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions);
  const finishLoading = () =>
    waitFor(() =>
      expect(utils.queryByText("Loading, please wait...")).toBeNull()
    );
  return {
    ...utils,
    finishLoading,
    history,
  };
};

export {
  Simulate,
  wait,
  render,
  cleanup,
  renderIntoDocument,
  fireEvent,
} from "@testing-library/react";
export { renderWithRouter };

export function renderWithProviders(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
  apolloMocks
) {
  console.log("I am route inside renderWithProviders Wrapper:", route);
  return {
    ...render(
      <Router history={history}>
        <Route path={route}>{ui}</Route>
      </Router>
    ),
    history,
  };
}
