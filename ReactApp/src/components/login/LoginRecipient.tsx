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

    let afterSignInURI = handleToken(searchParams)

    // Go to dashboard after retrieving token
    useEffect(() => {
        window.location.href = afterSignInURI;
    }, []);

    return (
        <div>
            <CircularProgress/>
            <h2>Redirecting to dashboard...</h2>
        </div>
    )

}

function handleToken(searchParams: URLSearchParams) {
    let token: String | null = searchParams.get('token')
    var scope: String = "";
    if (token == null) {
        // go to error page with arg: token failed
    } else {
        scope = getAccessScope(token)
    }


    // Store player token
    localStorage.setItem('player_access_token', searchParams.get('token') ?? "null");
    return process.env.REACT_APP_BASE_URL + "/#/kvis"

    // Store token
    localStorage.setItem('access_token', searchParams.get('token') ?? "null");
    return process.env.REACT_APP_BASE_URL + "/#/landing"
}

function getAccessScope(token: String) {
    const jwt = require("jsonwebtoken");
    let decoded = jwt.decode(token)
    console.log(token)
    //if (decoded.)
    return "player"
}

const LoginRecipientObserver = observer(LoginRecipient)
export default LoginRecipientObserver;






