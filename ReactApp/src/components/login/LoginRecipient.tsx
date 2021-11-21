// Erlend
import React from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";
import {useHistory, useLocation} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import {defaultJwtHeaders} from "../../data/headers/urlHeaders";

// Redirect page for login to the Kvis Server
function LoginRecipient() {
    let history = useHistory()

    // Require webPack to use environment vars
    require('dotenv').config()

    // Get path search param
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    let scope = getScopeFromSearchParams(searchParams)

    if (scope === creatorScope) {
        // Store creator token
        storeToken(searchParams).then(() => {
            history.push("/landing")
        })
    } else if (scope === playerScope) {
        // Store player token
        storeToken(searchParams).then(() => {

            // Try up to a hundred times to read the updated headers,
            // to avoid concurrency issues with writing to LocalStorage
            let i = 1
            while ((defaultJwtHeaders().get("Authorization") === null
                || defaultJwtHeaders().get("Authorization") === "null")
            && i < 101) {
                i++
            }
            // Redirect based on result
            if (defaultJwtHeaders().get("Authorization") === null
                || defaultJwtHeaders().get("Authorization") === "null") {
                history.replace("/error-page")
            } else {
                history.replace("/play-kvis")
            }
        })
    } else {
        // Go to error page
        console.log("Failed to detect scope in token. Found: " + scope)
        if (history !== undefined) history.push("/error-page")
    }

    return (
        <div data-testid="loginrecipient-test-container">
            <CircularProgress data-testid="loginrecipient-test-progress"/>
            <h2 data-testid="loginrecipient-test-h2">Redirecting...</h2>
        </div>
    )
}

async function storeToken(searchParams: URLSearchParams) {
    await localStorage.setItem('access_token', searchParams.get('token') ?? "NO_TOKEN");
}

const creatorScope = "creator"
const playerScope = "player"

function getScopeFromSearchParams(searchParams: URLSearchParams) {
    let token: String | null = searchParams.get('token')
    let scope: String = "No scope";

    // Get scope
    if (token !== null && token.length > 16) {
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






