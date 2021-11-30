import jwt from "jsonwebtoken";

export function isAuthenticated() : boolean {
    let token = localStorage.getItem("access_token")
    if (token !== null){
        let scope = jwt.decode(token) as { scope: string; };
        if (scope.scope == "creator") {
            return true
        }
    }
    return false;
}

export function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};