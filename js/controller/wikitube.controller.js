'use strict'


function onInit() {
    gFavorites = loadFromStorage(FAVORITES) || []
    console.log(gFavorites)
    if (gFavorites.length === 0) getFav('dog')
        .then(renderList)

    gDetails = loadFromStorage(DETAILS) || []
    if (!gDetails) getDetails()
    renderDetails()

}

function renderList() {
    const elFavs = document.querySelector('.list-videos')
    var strHtml = ''

    for (var i = 0; i < 5; i++) {        
        strHtml += `
        <div class='fav-list grid'>
            <img src=${gFavorites[i].img.url}></img> 
            <h3 class='title-video'>${gFavorites[i].title}</h3>   
        </div>`        
    }
    elFavs.innerHTML = strHtml
}

function renderDetails() {
    const elSongDetails = document.querySelector('.video-details')
    var strHtml = ''

    for (var i = 0; i < 2; i++) {
        strHtml += `
        <div class='song-details'>
            <h3 class='title'>${gDetails.title}</h3> 
            <div class='description'>${gDetails.description}</div>  
        </div>`
        console.log(gDetails)
    }
    
    elSongDetails.innerHTML = strHtml
}
