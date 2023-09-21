const accessKey = 'gIcQwGme-Q5U2geXYknjYJGpFCW-C1YNpH9zdVrj5r4'

const formElement = document.querySelector('form')
const inputElement = document.getElementById('searchInput');
const searchResults = document.querySelector('.results')
const showMore = document.getElementById('showMore')

let inputData = ''

async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results
    if (page === 1) {
        searchResults.innerHTML = ''
    }
    results.map((result) => {
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add('searchResult')
        const image = document.createElement('img')
        image.src = result.urls.small
        const author = document.createElement('h5')
        author.innerHTML = result.user.first_name
        const description = document.createElement('p')
        description.innerHTML = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.textContent = result.links.html
        imageLink.target = '_blank'

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(author)
        imageWrapper.appendChild(description)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    })
    page++
    if (page > 1) {
        showMore.style.display = 'block'
    }
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    page = 1;
    searchImages()
})
showMore.addEventListener('click', () => {
    searchImages()
})