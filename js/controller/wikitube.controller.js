'use strict'


function onInit() {
    setFavorite()
    setVideoDetails()
    playVideo()

    //when enter clicked
    onEnterClicked()
}

function setVideoDetails() {
    if (gDetails.length > 0) renderDetails()
    if (gDetails.length === 0) getDetails('dog')
        .then(renderDetails)
}

function setFavorite() {
    if (gFavorites.length > 0) renderList()
    if (gFavorites.length === 0) getFav('dog')
        .then(renderList)
}

function onEnterClicked() {
    var input = document.querySelector('.search-input')
    var val
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            console.log("Searching: ", event.target.value)
            val = event.target.value

            getFav(val)
                .then(renderList)

            getDetails(val)
                .then(renderDetails)

            gSearch = val
            console.log(gSearch);
            saveToStorage(SEARCH, gSearch)
        }
    })
}

function playVideo() {
    var videoId = gFavorites[0].id
    var elVideo = document.querySelector('.iframe-video')
    var url = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
    elVideo.src = url
}

function renderList() {
    const elFavs = document.querySelector('.list-videos')
    var strHtml = ''

    for (var i = 0; i < 5; i++) {
        strHtml += `
        <div class='fav-video grid' onclick="onVideoClicked('${gFavorites[i].id}')">
        <img src=${gFavorites[i].img.url}></img> 
        <h3 class='title-video'>${gFavorites[i].title}</h3>   
        </div>`
    }
    elFavs.innerHTML = strHtml
}

function renderDetails() {
    const elVideo = document.querySelector('.videos-details')
    var strHtml = ''
    console.log(gDetails)

    for (var i = 0; i < 5; i++) {
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

    gSearch = elInput
    console.log(gSearch)
    saveToStorage(SEARCH, gSearch)

    getDetails(elInput)
        .then(renderDetails)

    getFav(elInput)
        .then(renderList)
}

function onVideoClicked(video) {
    var elVideo = document.querySelector('.iframe-video')
    var url = `https://www.youtube.com/embed/${video}?autoplay=1&mute=1`

    if (elVideo) {
        elVideo.src = url
        saveToStorage(VIDEO_PLAY, url)
    }
}