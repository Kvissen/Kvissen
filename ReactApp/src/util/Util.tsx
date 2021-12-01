import jwt from "jsonwebtoken";
import {SnackbarOptions} from "../components/snackbar/GlobalSnackbar";

export function isLoggedInAs(role: string) {

    // Check null
    const token = localStorage.getItem("access_token")
    if (token === null || token === undefined || token === "null") return false

    // Check faulty or expired
    const decodedToken = jwt.decode(token, {complete: true})
    if (decodedToken === undefined || decodedToken === null) return false

    // if (decodedToken.payload.exp!! < new Date().getTime()) return false

    // Check wrong scope
    const {scope} = jwt.decode(token) as { scope: string; };
    return scope === role;
}


export function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function showSuccessSnackbar(snackbar : (options: SnackbarOptions) => Promise<void>, successMessage: string){
    snackbar({
        severity: "success",
        message: successMessage
    });
}

export function showErrorSnackbar(snackbar : (options: SnackbarOptions) => Promise<void>, errorMessage: string){
    snackbar({
        severity: "error",
        message: errorMessage
    });
}