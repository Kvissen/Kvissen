// Erlend
import React from 'react';
import {useLocation} from 'react-router-dom'

// Error page for the Login components
export default function ErrorPage() {

    // Require webPack to use environment vars
    require('dotenv').config()

    // Get path search param
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    let message = handleMessage(searchParams)

    return (
        <div>
            <h1 data-testid="error-test-header">Error</h1>
            <h2 data-testid="error-test-body">{message}</h2>
        </div>
    )
}

function handleMessage(searchParams: URLSearchParams): String {
    let message: String | null = searchParams.get('token')

    // Get scope
    if (message == null) {
        return "An error occurred."
    } else {
        return message
    }
}






