'use strict'


function onInit() {
    gFavorites = loadFromStorage(FAVORITES) || []
    if (gFavorites.length > 0) renderList()
    if (gFavorites.length === 0) getFav('dog')
        .then(renderList)

    gDetails = loadFromStorage(DETAILS) || []
    if (gDetails.length > 0) renderDetails()
    if (gDetails.length === 0) getDetails('dog')
        .then(renderDetails)

    //send search with enter
    var input = document.querySelector('.search-input')
    var val
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            console.log("Searching: ", event.target.value)
            val = event.target.value
        }
        getFav(val)
            .then(renderList)
    })
}

function renderList() {
    const elFavs = document.querySelector('.list-videos')
    var strHtml = ''

    for (var i = 0; i < 5; i++) {
        strHtml += `
        <div class='fav-video grid' onclick="onVideoClicked(this)">
        <img src=${gFavorites[i].img.url}></img> 
        <h3 class='title-video'>${gFavorites[i].title}</h3>   
        </div>`
    }
    elFavs.innerHTML = strHtml
}

function renderDetails() {
    const elVideo = document.querySelector('.videos-details')
    var strHtml = ''
    // console.log(gDetails)

    for (var i = 0; i < 2; i++) {
        strHtml += `
        <div class='video-details'>
            <h3 class='title'>${gDetails[i].title}</h3> 
            <div class='description'>${gDetails[i].description}</div>  
        </div>`
    }
    elVideo.innerHTML = strHtml
}

function inputValue() {
    var elInput = document.querySelector('.search-input').value
    console.log("Searching: ", elInput)

    getFav(elInput)
        .then(renderList)

    // getDetails(elInput)
    //     .then(renderDetails)

}

function onVideoClicked(videoId) {
    console.log(videoId)
    var elIframe = document.querySelector('.iframe-video')
    console.log(elIframe)

    if (elIframe) {
        elIframe.src = `https://www.youtube.com/embed/${videoId}`
    }
}