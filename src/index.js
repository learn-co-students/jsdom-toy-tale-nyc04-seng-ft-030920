let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

// reading the index
fetch('http://localhost:3000/toys')
.then(r => r.json())
.then((toys) => {
  // debugger
  toys.forEach((toy) => {
    addToyInfoCard(toy);
  })
})

let toyCollection = document.querySelector("#toy-collection")

function addToyInfoCard(toyObj) {
  let toyCard = document.createElement("div")
  toyCard.className = "card"
  let toyName = document.createElement("h2")
  toyName.innerText = `${toyObj.name}`
  let toyImage = document.createElement("img")
  toyImage.src = `${toyObj.image}`
  toyImage.className = "toy-avatar"
  let toyLikes = document.createElement("p")
  toyLikes.innerText = `${toyObj.likes} Likes`
  let likeButton = document.createElement("button")
  
  likeButton.addEventListener("click", (evt) => {
    evt.preventDefault()
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: parseInt(toyObj.likes) + 1
        // likes: 0
      })
    })
    .then(r => r.json())
    .then(obj => {
      // toyObj.likes = obj
      console.log(obj)
    })
  })

  likeButton.innerText = "Like"
  likeButton.className = "like-btn"
  toyCard.append(toyName, toyImage, toyLikes, likeButton)
  toyCollection.append(toyCard)
}

let newToyForm = document.querySelector('.add-toy-form')

newToyForm.addEventListener("submit", (evt) => {
  // debugger
  evt.preventDefault()
  let output = evt.target
  let newName = output.name.value
  let newImage = output.image.value

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "Application/json"
    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    })
    
  })
  
  .then(r => r.json())
  .then(obj => {
    addToyInfoCard(obj)
  })

})

