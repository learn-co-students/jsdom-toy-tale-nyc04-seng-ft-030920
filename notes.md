# Steps for solving the Toy Tale Lab

## Overall goals for this lab
1. Create a box.
2. Fill the contents of that box.
3. Append the box to the page.
4. Find the elements from the box.
5. Add event listeners to the elements.

## Setting up index.js
1. Make `db.json` available to both the front-end and back-end by...?
    * Turn the local file path into a `localhost:3000` path.

2. Add `defer` to script tag in `index.html` to create global scope for variables.

3. Write the fetch function and then statements.

    * .then(r => r.json())
    * .then((toysArray) => {

        toysArray.forEach((singleToy) => {
            console.log(`${index} ${singleToy.name}`)
            createHTMLForToy(singleToy)
        })
    })

## Creating a new card element to the DOM with each toy instance in it
1. Identify the container that we want to add new content to.
    * `const toyCollection = document.querySelector("#toy-collection)`
    * console.log the new variable just to make sure it's not null

2. Write an anonymous arrow function that creates an HTML object for each toy instance.
    * `let createHTMLForToy = (toy) => {}`

3. Create the outer box.
    * Create a new div element.
    * Call the `classList` method on the new div to add a new class name.

4. Fill the contents of that box.
    * Call the `innerHTML` method on the new div and add content using string interpolation.
    * Example, h2, p, button, and image tags, etc.

5. Add the box to the page.
    * Call the `appendChild` method on the parent object.

## Add a new toy to the page with user input
1. Identify the form container that includes the input fields.
    * `const toyForm = document.querySelector(".add-toy-form")`

2. Add a "submit" event listener to the form.
    * Prevent the page from refreshing on submit by inserting `event.preventDefault()`
    * toyForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        console.log(evt)

        let toyName = evt.target.name.value
        let toyImage = evt.target.image.value
    })

    * `evt.target.name.value` gives us the inputted name of the new toy
    * `evt.target["name"]["value"]` will also work
    * Send the new keys to the back-end by writing a fetch statement inside the event listener.
    * Make a POST request to the json URL.
    
    fetch(URL, {
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
        .then((newlyCreatedToy) => {
            createHTMLForToy(newlyCreatedToy)
            evt.target.reset()
    })

    * If you refresh the web page, you can now see the new toy instance!

3. Clear out the form once the inputs are submitted, by adding `evt.target.reset()` inside the 2nd then statement.

## Increase a toy's likes
1. Make a PATCH request.
    * BUT, it could be a POST request if the model was set up differently. If you're unsure of which method to use, just trust the README. Also, ask instructors for clarification during the code challenge.
    * For example: Is the user clicking on the toy's like button or is JavaScript doing that?

2. Go back to the `createHTMLForToy` function.
    * Find the button element from the div.
    * `let likeButton = toyCard.querySelector(".like-btn)`

3. Add an event listener to the like button.
    * likeButton.addEventListener("click", () => {
        console.log(toy.id)
        
        fetch(URL/${toy.id}, {
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
            likesPTag.innerText = `${updatedToy.likes} likes`
        })
    })
    * Make sure to NOT use `toy.likes ++` because if the value of `toy.likes` is 0, it can't add up.

4. In the 2nd `then` statement, make sure to update the JS object in memory AND THEN the DOM. This is called pessimistic rendering, in case there's an error with updating the back-end.
    * Updating the back-end: 
        * `toy.likes = updatedToy.likes`
    * Updating the DOM:
        * Find the <p> tag in the toy card and update the number of likes, so that it's visible to the user.
        * `let likesPTag = toyCardDiv.querySelector("p")`
        * likesPTag.innerText = `${updatedToy.likes} likes`