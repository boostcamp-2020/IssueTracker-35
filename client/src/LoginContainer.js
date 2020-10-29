import React from "react";
import axios from "axios";

function LoginContainer() {

  const githubLoginHandler = async () => {
    const {
      data: { url },
    } = await axios.get('http://127.0.0.1:3000/users/login/github');
    
    location.href = url;
  }
    
  return (
    <div>
      <button onClick={githubLoginHandler}> Github Login </button>
    </div>
  );
};

export default LoginContainer;
