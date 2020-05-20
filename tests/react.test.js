// import dependencies
import React from "react";

// import react-testing methods
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
// the component to test
import Fetch from "./fetch";

// https://jestjs.io/docs/en/mock-functions#mocking-modules
jest.mock("axios");

test("loads and displays greeting", async () => {
  // Arrange
  const url = "/greeting";
  const { asFragment } = render(<Fetch url={url} />);

  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: "hello there" },
  });

  // Act
  fireEvent.click(screen.getByText("Load Greeting"));
  // Wait until the mocked `get` request promise resolves and
  // the component calls setState and re-renders.
  // `waitFor` waits until the callback doesn't throw an error
  await waitFor(() => screen.getByRole("heading"));

  // Assert
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toHaveAttribute("disabled");

  expect(asFragment()).toMatchSnapshot();
});
