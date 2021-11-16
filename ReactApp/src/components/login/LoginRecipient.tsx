// Erlend
import React from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";
import {useHistory, useLocation} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import {store} from "../../stores/KvisStore";

// Redirect page for login to the Kvis Server
function LoginRecipient() {
    let history = useHistory()

    // Require webPack to use environment vars
    require('dotenv').config()

    // Get path search param
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    let scope = getSCopeFromSearchParams(searchParams)

    if (scope === creatorScope) {
        // Store creator token
        localStorage.setItem('access_token', searchParams.get('token') ?? "NOT_FOUND");
        history.push("/landing")
    } else if (scope === playerScope) {
        // Store player token
        store.startQuiz()
        localStorage.setItem('player_access_token', searchParams.get('token') ?? "NOT_FOUND");
        history.push("/play-kvis")
    } else {
        // Go to error page
        console.log("Failed to detect scope in token. Found: " + scope)
        history.push("/error-page")
    }

    return (
        <div data-testid="loginrecipient-test-container">
            <CircularProgress data-testid="loginrecipient-test-progress"/>
            <h2 data-testid="loginrecipient-test-h2">Redirecting...</h2>
        </div>
    )
}

const creatorScope = "creator"
const playerScope = "player"

function getSCopeFromSearchParams(searchParams: URLSearchParams) {
    let token: String | null = searchParams.get('token')
    let scope: String = "";

    // Get scope
    if (token === null || token.length < 10) {
        let errormessage = "Internal error: Got a null token"
    } else {
        scope = getAccessScope(token)
    }
    return scope
}

function getAccessScope(token: String) {
    const {scope} = jwt.decode(token.toString()) as {
        scope: string;
    };

    console.log("LoginRecipient received a token with scope " + scope)

    if (scope != null && scope.startsWith(creatorScope)) {
        return creatorScope
    } else if (scope != null && scope.startsWith(playerScope)) {
        return playerScope
    } else {
        return "0"
    }
}

const LoginRecipientObserver = observer(LoginRecipient)
export default LoginRecipientObserver;






