import React from "react";
import { cleanup } from "@testing-library/react";
import axiosMock from "axios";
import Main from "../Main";
import { renderWithRouter } from "../../../utils";

afterEach(cleanup);
jest.mock("axios");

describe("<Main/> component", () => {
  test("render component", async () => {
    const posts = {
      content: [
        {
          title: "Fake post",
          content: "Fake content",
          user: "JorggeRojas",
          summary: "My fake summary",
          dateLog: "2020-12-16",
          keywords: ["Fake", "Test"],
          index: 1,
        },
        {
          title: "My second post",
          content: "This is the content of my second fake post",
          user: "FakeUser1",
          summary: "This is a really short summary",
          dateLog: "2020-12-16",
          keywords: ["Summary", "Short"],
          index: 2,
        },
      ],
    };
    axiosMock.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: posts,
      })
    );
    const { container, finishLoading } = renderWithRouter(<Main />);
    await expect(container.innerHTML).toMatch("Loading, please wait...");
    await finishLoading();
    await expect(container.innerHTML).toMatch("FAKE POST");
    await expect(container.innerHTML).toMatch("December 16th of 2020");
    await expect(container.innerHTML).toMatch("This is a really short summary");
    await expect(container).toMatchSnapshot();
  });
});
