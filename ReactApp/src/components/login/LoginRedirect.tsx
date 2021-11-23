// Erlend
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";

// Redirect page for login to the Kvis Server
function LoginRedirect() {

    // Require webPack to use environment vars
    require('dotenv').config()

    // Can't be found in webapp folder
    let signInUrl = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_LOGIN_URL

    useEffect(() => {
        window.location.href = signInUrl;
    }, [signInUrl]);


    return (<div
        data-testid="loginredirect-test-container">
        <CircularProgress
            data-testid="loginredirect-test-progress"
        />
        <h2 data-testid="loginredirect-test-h2">Redirecting to login page...</h2>
    </div>)
}

const LoginRedirectObserver = observer(LoginRedirect)
export default LoginRedirectObserver;