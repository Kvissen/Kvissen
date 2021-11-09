// Erlend
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";
import {useLocation} from 'react-router-dom'
import jwt from 'jsonwebtoken'

// Redirect page for login to the Kvis Server
function LoginRecipient() {

    // Require webPack to use environment vars
    require('dotenv').config()

    // Get path search param
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    let afterSignInURI = getUriWithToken(searchParams)

    // Go to dashboard after retrieving token
    useEffect(() => {
        window.location.href = afterSignInURI;
    }, [afterSignInURI]);

    return (
        <div>
            <CircularProgress/>
            <h2>Redirecting...</h2>
        </div>
    )
}

const creatorScope = "creator"
const playerScope = "player"

function getUriWithToken(searchParams: URLSearchParams) {
    let token: String | null = searchParams.get('token')
    var scope: String = "";

    // Get scope
    if (token == null) {
        let errormessage = "Internal error: Got a null token"
        return process.env.REACT_APP_BASE_URL + "/#/error-page?message=" + errormessage
    } else {
        scope = getAccessScope(token)
    }

    if (scope === creatorScope) {
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

    let decoded = jwt.decode(token.toString())?.toString()
    console.log("Got token from server")
    console.log(token)
    if (decoded != null && decoded.includes(creatorScope)) {
        return creatorScope
    }
    return playerScope
}

const LoginRecipientObserver = observer(LoginRecipient)
export default LoginRecipientObserver;






