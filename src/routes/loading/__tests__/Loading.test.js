import React from "react";
import { cleanup } from "@testing-library/react";
import Loading from "../Loading";
import { renderWithRouter } from "../../../utils";

afterEach(cleanup);

describe("<Loading/> component", () => {
  test('render with "true" props (visible)', async () => {
    const { container } = renderWithRouter(<Loading load={true} />);
    await expect(container.innerHTML.includes("uk-visible")).toBeTruthy();
    await expect(container).toHaveTextContent("Loading, please wait...");
    await expect(container).toMatchSnapshot();
  });
  test('render with "false" props (hidden)', async () => {
    const { container } = renderWithRouter(<Loading load={false} />);
    await expect(container.innerHTML.includes("uk-hidden")).toBeTruthy();
    await expect(container).toMatchSnapshot();
  });
});
