// Erlend
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";

const LOGIN_URL = process.env.LOGIN_URL
const SERVER_URL = process.env.SERVER_BASE_URL

// Redirect page for login to the Kvis Server
function LoginRedirect() {

    // Can't be found in webapp folder
    //let signInUrl = SERVER_URL! + LOGIN_URL!

    let signInUrl = "http://localhost:8080/api/auth/login"

    useEffect(() => {
        window.location.href = signInUrl;
    }, []);


    return (<div>
        <CircularProgress/>
        <h2>Redirecting to login page...</h2>
    </div>)
}

const LoginRedirectObserver = observer(LoginRedirect)
export default LoginRedirectObserver;






