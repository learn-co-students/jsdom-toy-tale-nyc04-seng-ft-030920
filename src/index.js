let addToy = false;
const toyCollection = document.getElementById("toy-collection")
const toyFormContainer = document.querySelector(".add-toy-form")
const toyUrl = "http://localhost:3000/toys"

// render all existing toys
fetch(toyUrl)
  .then(response => response.json())
  .then((toyArray) => {
    toyArray.forEach((toy) => {
      renderToys(toy)
  })
})

function renderToys(toy) {
  let newCard = document.createElement("div")
  newCard.classList.add('card')
  newCard.innerHTML =
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p>${toy.likes}</p>
    <button class="like-btn">Like <3</button>`
  toyCollection.appendChild(newCard)

  // increase a toy's likes
  const like = newCard.querySelector(".like-btn")
  const likeText = newCard.querySelector("p")
  const singleToyUrl = `http://localhost:3000/toys/${toy.id}`

  like.addEventListener("click", () => {
    fetch(singleToyUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
      .then(r => r.json())
      .then((updatedToy) => {
        toy.likes = updatedToy.likes
        likeText.innerText = `${updatedToy.likes} likes`
      })
  })
}

// add a new toy
toyFormContainer.addEventListener("submit", (evt) => {
  evt.preventDefault()

  let toyName = evt.target.name.value
  let toyImage = evt.target.image.value

  fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
    .then(r => r.json())
    .then((newToy) => {
      renderToys(newToy)
      evt.target.reset()
    })
})

// disappearing add a new toy button
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
})