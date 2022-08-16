export function getClientID(){
    return "357c3bd6acae401e8fc36b2a1c0d7521"
}

export function fetchTopArtists(accessToken, timeRange) {
    return fetch("https://api.spotify.com/v1/me/top/artists?time_range="+timeRange+"&limit=50", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+accessToken,
        },
    })
    .then(res => res.json()
        .then(data => {
            return data
        })
    )
}

export function fetchTopTracks(accessToken, timeRange) {
    return fetch("https://api.spotify.com/v1/me/top/tracks?time_range="+timeRange+"&limit=50", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': "Bearer "+accessToken,
        },
    })
    .then(res => res.json()
        .then((data) => {
            return data
        })
    )
}