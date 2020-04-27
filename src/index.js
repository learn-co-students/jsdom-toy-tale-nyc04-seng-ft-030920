let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollectionDiv = document.getElementById("toy-collection")
const toyForm = document.querySelector(".add-toy-form")

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then((toysArr) => {
    toysArr.forEach((singleToy) => {
      createHTMLForToy(singleToy)
      // toysArr.forEach(createHTMLForToy)
    })
  })



// deliverable helper methods

let createHTMLForToy = (toy) => {
  
  // create the outer box
  
  let toyCardDiv = document.createElement("div")
  toyCardDiv.className = "card"
  
  // fill the contents
  
  toyCardDiv.innerHTML = `<h2 name="${toy.name}"></h2> <img src="${toy.image}" class="toy-avatar"> <p> ${toy.likes} likes</p> <button class="like-btn"> Like </button>`
  
  // Append the box to the page
  toyCollectionDiv.append(toyCardDiv)

  // Find the elements from the box
  let likeButton = toyCardDiv.querySelector(".like-btn")
  let likesPTag = toyCardDiv.querySelector("p")

  // add event listeners to the elements
  likeButton.addEventListener("click", () => {
    
    fetch(`http://localhost:3000/toys/${toy.id}`, {
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
        // update the JS {} in memory
        toy.likes = updatedToy.likes
        likesPTag.innerText = `${updatedToy.likes} likes`
      })
}

toyForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let toyName = evt.target.name.value
  let toyImage = evt.target.image.value
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0,
    })
  })
    .then(r => r.json())
    .then((newlyCreatedToy) => {
      createHTMLForToy(newlyCreatedToy)
      evt.target.reset()
    })
})
    
document.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});