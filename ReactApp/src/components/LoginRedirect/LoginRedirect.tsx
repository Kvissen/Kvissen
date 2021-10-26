import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";
import {useParams} from "react-router-dom";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL!
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL!

function LoginRedirect() {
    let signInUrl = LOGIN_URL + "/?service=" + REDIRECT_URL
    useEffect(() => {
        window.location.href = signInUrl;
    }, []);

    // useParams grabs response from DTU redirect, AKA the ticket
    const handle = useParams()
    console.log(handle)

    return (<div>
        <CircularProgress/>
        <h2>Redirecting to login page...</h2>
    </div>)
}

const RedirectObserver = observer(LoginRedirect)
export default RedirectObserver;






