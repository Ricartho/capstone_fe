import React from "react";

import LoginForm from "../components/loginForm";

function Login({onLogIn}){

    return(<LoginForm onLogIn={onLogIn} />);

}
export default Login;