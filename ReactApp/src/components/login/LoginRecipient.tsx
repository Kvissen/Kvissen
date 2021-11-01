// Erlend
import React from 'react';
import {observer} from 'mobx-react';
import {CircularProgress} from "@mui/material";
import {useLocation} from 'react-router-dom'

const LOGIN_URL = process.env.LOGIN_URL
const SERVER_URL = process.env.SERVER_BASE_URL

// Redirect page for login to the Kvis Server
function LoginRecipient() {

    // TODO: DTU replies with %2F instead of ? handle encoding

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    let signInUrl = "http://localhost:8080/api/auth/login"

    // useEffect(() => {
    //     window.location.href = signInUrl;
    // }, []);

    return (
        <div>
            <CircularProgress/>
            <h2>Received: </h2>
            <p>{searchParams.get('token') ?? 'No token'}</p>
        </div>
    )

}

const LoginRecipientObserver = observer(LoginRecipient)
export default LoginRecipientObserver;






