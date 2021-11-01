import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const SERVICE_LABEL = "/?service="

function LoginRedirect() {

    let signInUrl = LOGIN_URL +
        SERVICE_LABEL + REDIRECT_URL

    useEffect(() => {
        window.location.href = signInUrl;
    }, []);

    // At the redirect URL, useParams grabs response from DTU redirect (ticket)
    // const handle = useParams()
    // console.log(handle)

    return (<div>
        <CircularProgress/>
        <h2>Redirecting to login page...</h2>
    </div>)
}

const RedirectObserver = observer(LoginRedirect)
export default RedirectObserver;






