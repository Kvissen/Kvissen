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
    }, [afterSignInURI]);

    return (
        <div>
            <CircularProgress/>
            <h2>Redirecting to dashboard...</h2>
        </div>
    )

}

const creatorScope = "creator"
const playerScope = "player"

function handleToken(searchParams: URLSearchParams) {
    let token: String | null = searchParams.get('token')
    var scope: String = "";

    // Get scope
    if (token == null) {
        // go to error page with arg: token failed
    } else {
        scope = getAccessScope(token)
    }

    if (scope == creatorScope) {
        // Store creator token
        localStorage.setItem('access_token', searchParams.get('token') ?? "null");
        return process.env.REACT_APP_BASE_URL + "/#/landing"

    } else {
        // Store player token
        localStorage.setItem('player_access_token', searchParams.get('token') ?? "null");
        return process.env.REACT_APP_BASE_URL + "/#/kvis"
    }
}

function getAccessScope(token: String) {
    const jwt = require("jsonwebtoken");
    let decoded = jwt.decode(token)
    console.log("Got token from server")
    console.log(token)
    if (decoded.includes(creatorScope)) {
        return creatorScope
    }
    return playerScope
}

const LoginRecipientObserver = observer(LoginRecipient)
export default LoginRecipientObserver;






