/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { ExampleContext } from "./context";

// eslint-disable-next-line react/prop-types
export default function Fetch({ url }) {
  const [greeting, setGreeting] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchGreeting = async () => {
    const response = await axios.get(url);
    const data = response.data;
    const { greeting } = data;
    setGreeting(greeting);
    setButtonClicked(true);
  };

  const buttonText = buttonClicked ? "Ok" : "Load Greeting";

  return (
    <ExampleContext.Consumer>
      {({ theme }) => {
        return (
          <div>
            <button onClick={fetchGreeting} disabled={buttonClicked}>
              {buttonText}
            </button>
            {greeting ? <h1>{greeting}</h1> : null}
          </div>
        );
      }}
    </ExampleContext.Consumer>
  );
}
