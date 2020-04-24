let addToy = false;
const toyCollection = document.getElementById("toy-collection")
// this only works with `defer` in `index.html`
// or i can move this inside the `.addEventListener` without the `defer`

document.addEventListener("DOMContentLoaded", () => {
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

  // add my new functions
  fetchToys()
});

// fetching andy's toys
// when the page loads, fetch all the existing toys
// with the response data, create a new div for each toy and add it to the existing toy-collection div

const toyUrl = "http://localhost:3000/toys"

function fetchToys() {
  fetch(toyUrl)
  // returns a promise
    .then(response => response.json())
    // this is a promise
    .then((toyArray) => {
      toyArray.forEach((toy) => {
        renderToys(toy)
        
        // this line has access to EVERYTHING inside `fetchToys()` because it's an inner code block, but the higher sections of code DO NOT...

        // if the arrow function only has one argument, then u DON'T need the paranthesis
        // look up VSCode package for ES6 syntax!!!
        // `anfn` will automatically create an arrow function

        // this `.then` statement is getting info from the previous `.then` statement
        // anonymous function cannot be hoisted
        // read more about callbacks and arrow functions
    })
})
}

function renderToys(toy) {
  let newCard = document.createElement("div")
  newCard.className = "card"
  newCard.innerHTML =
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p>${toy.likes}</p>
    <button class="like-btn">Like <3</button>`
  toyCollection.appendChild(newCard)
}

// h2 tag with the toy's name
// img tag with the src of the toy's image attribute and the class name "toy-avatar"
// p tag with how many likes that toy has
// button tag with a class "like-btn"