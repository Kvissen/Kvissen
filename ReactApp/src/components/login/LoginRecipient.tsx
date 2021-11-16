// Erlend
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";
import {useLocation} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import {store} from "../../stores/KvisStore";

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
        <div data-testid="loginrecipient-test-container">
            <CircularProgress data-testid="loginrecipient-test-progress"/>
            <h2 data-testid="loginrecipient-test-h2">Redirecting...</h2>
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
        // Load the quiz data and go
        store.startQuiz();
        return process.env.REACT_APP_BASE_URL + "/#/play-kvis"
    }
}

function getAccessScope(token: String) {
    const {scope} = jwt.decode(token.toString()) as {
        scope: string;
    };

    console.log("Logged in as " + scope)

    if (scope != null && scope.startsWith(creatorScope)) {
        return creatorScope
    }
    return playerScope
}

const LoginRecipientObserver = observer(LoginRecipient)
export default LoginRecipientObserver;






