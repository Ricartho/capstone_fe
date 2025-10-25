import React from "react";

import SignupForm from "../components/signupForm";

function Signup({onSignUp}){

    return(<SignupForm onSignUp={onSignUp} />);
}
export default Signup;