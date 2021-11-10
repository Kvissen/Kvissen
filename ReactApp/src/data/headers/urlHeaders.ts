// Custom headers include JWT


export const defaultCreatorHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("access_token")
});

export const defaultPlayerHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("player_access_token")
});