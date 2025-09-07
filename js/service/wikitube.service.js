'use strict'

const FAVORITES = 'favoritesDB'
var gFavorites
const DETAILS = 'detailsDB'
var gDetails

const YT_KEY = `AIzaSyB1aNjvRywhtd84fJ4gcwq7rGlcRA_r_HQ`

function getFav(value) {
    console.log(gFavorites);
    
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`
    gFavorites = []
    
    
    return fetch(url)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        res.items.map(item => {
                var favorite = {
                    id: item.id.videoId,
                    title: item.snippet.channelTitle,
                    img: item.snippet.thumbnails.default
                }
                gFavorites.push(favorite)
                console.log(gFavorites)
                saveToStorage(FAVORITES, gFavorites)
                return gFavorites
            })
        })
}

function getDetails(value) {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${value}&format=json`
    gDetails = []

    return fetch(url)
        .then(res => res.json())
        .then(res => {
            res.query.search.map(item => {
                var video = {
                    title: item.title,
                    description: item.snippet,
                }
                gDetails.push(video)
                console.log(gDetails)
                saveToStorage(DETAILS, gDetails)
                return gDetails
            })
        })
}