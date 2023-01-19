console.log("Display Page");

let containerElement = document.getElementById('container')

const getData = async () => {
    let data = await fetch("http://localhost:5000/get_food_data");
    data.json().then((parsedData) => {
        console.log(parsedData); // array of objects
        // map through and put in HTML
        // push each individual one,  or push an array of HTML 
        parsedData.forEach(element => {
            let pTag = document.createElement("p"); // Making a new p tag for each element
            pTag.textContent = element.name;
            if(element.readyToEat !== true){
                pTag.style.color = "red"
            } else {
                pTag.style.color = "green"
            }

            containerElement.appendChild(pTag);
        });
    })
}

getData()
    
    
