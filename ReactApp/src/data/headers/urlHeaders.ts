// Custom headers include JWT

export const defaultJwtHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("access_token")
});