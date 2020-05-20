import React from "react";
import { render } from "@testing-library/react";
import { ExampleContext } from "./context";
// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  return (
    <ExampleContext.Provider value={{ theme: "light" }}>
      {children}
    </ExampleContext.Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
