'use strict'


function onInit() {
    gFavorites = loadFromStorage(FAVORITES) || []
    // console.log(gFavorites.length === 0)
    if (gFavorites.length > 0) renderList()
    if (gFavorites.length === 0) getFav('dog')
        .then(renderList)

    gDetails = loadFromStorage(DETAILS) || []
    if (gDetails.length === 0) getDetails()
        .then(renderDetails)
    // console.log(gDetails);
    renderDetails()

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
        <div class='fav-video grid'>
            <img src=${gFavorites[i].img.url}></img> 
            <h3 class='title-video'>${gFavorites[i].title}</h3>   
        </div>`

    }
    elFavs.innerHTML = strHtml
}

function renderDetails() {
    const elSongDetails = document.querySelector('.video-details')
    var strHtml = ''
    // console.log(gDetails)

    for (var i = 0; i < 2; i++) {
        strHtml += `
        <div class='song-details'>
            <h3 class='title'>${gDetails[i].title}</h3> 
            <div class='description'>${gDetails[i].description}</div>  
        </div>`
    }
    elSongDetails.innerHTML = strHtml
}

function inputValue() {
    var elInput = document.querySelector('.search-input').value
    console.log("Searching: ", elInput)

    getFav(elInput)
        .then(renderList)

}
