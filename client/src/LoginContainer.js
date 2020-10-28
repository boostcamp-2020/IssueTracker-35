import React from "react";
import axios from "axios";

function LoginContainer() {

  const githubLoginHandler = () => {
    axios.get('http://127.0.0.1:3000/login/gihub');
  }

  return (
    <div>
      <button onClick={githubLoginHandler}> Github Login </button>
    </div>
  );
};

export default LoginContainer;
