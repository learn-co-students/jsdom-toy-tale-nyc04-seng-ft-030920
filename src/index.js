let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  
 
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
let addToyFrom = document.querySelector(".add-toy-form")

fetch("http://localhost:3000/toys").then(r => r.json())
  .then((response) => {
  response.forEach(element => {
    GetToys(element)
  })

})


function GetToys(toy){



  let header = document.createElement('h2');
  header.innerText = toy.name
   
  let image = document.createElement('img');
  image.src = toy.image;
  image.className = "toy-avatar"

  let p = document.createElement('p')
  p.innerText = toy.likes
 
  let button = document.createElement('button'); 
  button.innerText = "Like <3"
  button.id = toy.id
  button.className = "like-btn"
  
  button.addEventListener("click", (evt) => {
     console.log(evt.target)
     updateHelper(toy , p)

   })

  let cardDiv = document.createElement("div")
  cardDiv.className = "card"
   
  cardDiv.append(header , image , p , button)
  toyCollection.append(cardDiv)
}


function updateHelper(toy , p){

  

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify({
      "likes": toy.likes + 1 
    })
  })
    .then(r => r.json())
    .then(updatedToys => {
      toy.likes = updatedToys.likes
      p.innerText = toy.likes
    })




}







addToyFrom.addEventListener("submit" , function(evt) {
    evt.preventDefault();
  
     let toyName = evt.target["name"].value
     let image = evt.target["image"].value

     console.log(toyName)
     console.log(image)


    fetch("http://localhost:3000/toys" ,  {

      method: "POST", 
      headers: {
        "Content-type": "Application/json", 
        "Accept": "Application/json"
      },
      body: JSON.stringify({
        "name": toyName, 
        "image": image, 
        "likes": 0
  
      })
    }).then(r => r.json())
     .then((createToy) => {
        console.log(createToy)

     })
  
  })
  














});


