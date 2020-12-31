import React from "react";
import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import axiosMock from "axios";
import Sign from "../Sign";
import InputLabel from "../components/InputLabel";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { renderWithRouter } from "../../../utils";

afterEach(cleanup);
jest.mock("axios");

describe("<Sign/> tree", () => {
  test("render with <SignIn/> component", async () => {
    const { container } = renderWithRouter(<Sign />, "/sign");
    await expect(container).toHaveTextContent("Sign In");
    await expect(container).toMatchSnapshot();
  });
  test("render with <SignUp/> component", async () => {
    const { container, findByText } = renderWithRouter(<Sign />, "/sign");
    const change = await findByText("Sign up");
    await expect(container).toHaveTextContent("Sign In");
    await fireEvent.click(change);
    await expect(container).toHaveTextContent("Sign Up");
    await expect(container).toHaveTextContent("Full name");
    await expect(container).toMatchSnapshot();
  });
  test("render <InputLabel/> component", () => {
    const props = {
      label: "RealInput",
      forTag: "realInput",
      props: {},
      type: "text",
      icon: "user",
      placeholder: "My Input",
      id: "realInput",
      labelDirection: "",
    };
    const { container, getByPlaceholderText } = renderWithRouter(
      <InputLabel {...props} />
    );
    const input = getByPlaceholderText(props.placeholder);
    expect(container).toHaveTextContent(props.label);
    expect(container).toBeInTheDocument(input);
    expect(container).toMatchSnapshot();
  });
});
