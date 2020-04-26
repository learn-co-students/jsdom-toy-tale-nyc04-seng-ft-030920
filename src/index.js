let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
   })

  let toyCollection = document.querySelector("div#toy-collection")

  fetch("http://localhost:3000/toys").then((res) => res.json()).then((toyArray) => {
    toyArray.forEach((singleToy) => {
      makeToyToCard(singleToy)
    })
  })

  function makeToyToCard(singleToy){
     let newDiv = document.createElement("div")
     newDiv.className = "card"
     newDiv.innerHTML = `<h2>${singleToy.name}</h2>
     <img src="${singleToy.image}" class="toy-avatar">
     <p>${singleToy.likes} Likes</p>
     <button class="like-btn">Like <3</button>
     <button class="delete">Delete <3</button>`
     toyCollection.append(newDiv)

     let likeBtn = newDiv.querySelector(".like-btn")
     likeBtn.addEventListener("click", (evt) => {
       fetch(`http://localhost:3000/toys/${singleToy.id}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json", Accept: "application/json"},
         body: JSON.stringify({
           likes: singleToy.likes + 1
         })
       }).then(r => r.json()).then((updatedObj) => {
         singleToy.likes = updatedObj.likes
         let pTag = newDiv.querySelector("p")
         pTag.innerText = `${updatedObj.likes} Likes`
       })
     })

     let deleteBtn = newDiv.querySelector(".delete")
     deleteBtn.addEventListener("click", (evt) => {
       fetch(`http://localhost:3000/toys/${singleToy.id}`, {
         method: "DELETE"
       }).then(r => r.json()).then((emptyObj) => {
         newDiv.remove()
       })
     })


  }

  let addToyForm = document.querySelector(".add-toy-form")

  addToyForm.addEventListener("submit",(evt) => {
    evt.preventDefault()
    let formName = evt.target.name.value
    let formImage = evt.target.image.value
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify({
        name: formName,
        image: formImage,
        likes: 0
      })
    }).then(r => r.json()).then((newObj) => {
      makeToyToCard(newObj)
    })
  })
  

  
});

