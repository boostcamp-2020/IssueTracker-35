import React from "react";
import ReactDom from "react-dom";
import LoginContainer from "./LoginContainer";

const App = () => {
  return (
    <div>
      <p>React here!</p>
      <LoginContainer></LoginContainer>
    </div>
  );
};

export default App;

ReactDom.render(<App />, document.querySelector("#root"));
