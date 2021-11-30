// Erlend
import React from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";
import {useHistory, useLocation} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import {defaultJwtHeaders} from "../../data/headers/urlHeaders";
import store from "../../stores/KvisStore";

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
            // Save the external user id for UI
            storeUserExternalId(searchParams)
            // Make sure token is saved
            confirmWriteToLocalStorage()
            // Go to edit page
            history.push("/landing")
            // Reload to ensure token storage
            window.location.reload()
        })
    } else if (scope === playerScope) {
        // Store player token
        storeToken(searchParams).then(() => {
            // Make sure token is saved
            confirmWriteToLocalStorage()
            // Fetch the Kvis
            store.startQuiz().then(() => {
                if (store.currentKvis.uuid === "0") {
                    // Go back
                    alert('Could not find Kvis "' + store.kvisCode + '"')
                    history.replace("/")
                } else {
                    // Go to play kvis page
                    history.replace("/play-kvis")
                }
            })
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
    await localStorage.setItem('access_token', searchParams.get('token') ?? "null");
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


function storeUserExternalId(searchParams: URLSearchParams) {
    let token: String | null = searchParams.get('token')

    // Get id and store in MobX
    if (token !== null && token.length > 16) {
        const {external_id} = jwt.decode(token.toString()) as {
            external_id: string;
        };
        store.currentUser = external_id
    }
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

function confirmWriteToLocalStorage() {
    // Fix for concurrency issues with token read and write to localstorage
    let i = 1
    while ((defaultJwtHeaders().get("Authorization") === null
        || defaultJwtHeaders().get("Authorization") === "null")
    && i < 101) {
        i++
    }
}

const LoginRecipientObserver = observer(LoginRecipient)
export default LoginRecipientObserver;






