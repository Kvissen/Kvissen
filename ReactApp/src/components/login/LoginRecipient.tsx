// Erlend
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";
import {useLocation} from 'react-router-dom'

// Redirect page for login to the Kvis Server
function LoginRecipient() {

    // Require webPack to use environment vars
    require('dotenv').config()

    // Get path search param
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    // Store token
    localStorage.setItem('access_token', searchParams.get('token') ?? "null");

    let afterSignInURI = process.env.REACT_APP_BASE_URL + "/#/landing"

    // Go to dashboard after retrieving token
    useEffect(() => {

        window.location.href = afterSignInURI;
    }, [afterSignInURI]);

    return (
        <div data-testid="loginrecipient-test-container">
            <CircularProgress data-testid="loginrecipient-test-progress"/>
            <h2 data-testid="loginrecipient-test-h2">Redirecting to dashboard...</h2>
        </div>
    )

}

const LoginRecipientObserver = observer(LoginRecipient)
export default LoginRecipientObserver;






