

console.log("js file connected");


let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {
    // send a request to Express 
    // result is the response from the server
    // get element
    // let nameElement = document.getElementById('name-input')
    // // get value of element
    // let nameString = nameElement.value;

    let nameString = document.getElementById('name-input').value;
    let colorString = document.getElementById('color-input').value;
    let ageNumber = +document.getElementById('age-input').value;
    // using ternary operator here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    let readyBool = document.getElementById('ready-bool').value === "true" ? true : false;


    // packing all our data in an object
    // same as 
    // nameString: nameString
    const veggie = {
        nameString,
        colorString,
        ageNumber,
        readyBool
    }



 let response = await fetch('http://localhost:5000/create_veggie', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(veggie)

    })

    let uploadStatusTag = document.getElementById("upload-status");
    if(response.status == 200){
        console.log(response);
        console.log("Upload complete");
        uploadStatusTag.textContent = "Upload Completed!"
        uploadStatusTag.style.color = "green";
    }
    else{
        console.log(response);
        console.log("Upload failed");
        uploadStatusTag.textContent = "Upload failed!"
        uploadStatusTag.style.color = "red";
    }
    
    }) 

let deleteButton = document.getElementById("delete");

deleteButton.addEventListener("click", async () => {
    let response = await fetch("http://localhost:5000/delete_nameless_data", {
        method: "delete",
    })
    console.log(response);
})

let displayPageButton = document.getElementById("display-page-button");

displayPageButton.addEventListener("click", async () => {
    // Change HTML files (from index to display_flood.html)
    window.location.href = "./display_food"
})

let findVeggieButton = document.getElementById("Submit");

findVeggieButton.addEventListener("click", async () => {
    let findVeggieString = document.getElementById("find-veggie").value;
    let data = await fetch(`http://localhost:5000/get_single/${findVeggieString}`);
    data.json().then((parsedData) => {
        console.log(parsedData); // array of objects
        let pTag = document.createElement("p"); // Making a new p tag for each element
        pTag.textContent = parsedData.name;
        //Attach p tag to dom
        let divElement = document.getElementById("FIND");
        divElement.appendChild(pTag);
        })
    }) 
