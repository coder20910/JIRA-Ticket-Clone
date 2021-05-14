
// Toolbar 
let filterContainer = document.querySelectorAll(".filter-colors_container");
let addBtn = document.querySelector(".add");
let addState = false;                               // default value 

let removeBtn = document.querySelector(".remove");
let removeState = false;                          

let mainContainer = document.querySelector(".main-container");

// Modal container
let modalContainer = document.querySelector(".modal_container");
let modalFilters = document.querySelectorAll(".modal_filter")
let desBox = document.querySelector(".desc_box");

let colorsArr = ["lightpink", "lightskyblue", "lightgreen", "black"];
let cColor  = colorsArr[colorsArr.length-1];  // Default color 

// Local Storage
let taskArr = [];

// for(let i = 0; i<filterContainer.length; i++){
//     filterContainer[i].addEventListener("click", function(){
        
//         let Arr = filterContainer[i].children; // HTML collection/Arr of children 
        
//         let children = Arr[0].classList;        // Return arr of all classes 

//         let color = children[1];                // Access color by class no.

//         mainContainer.style.backgroundColor = color; // Set mainContainer color to given color
//     })
//     // All children of filterContain
// }

// Display all the previous elments on ui
if (localStorage.getItem("alltask")){
    taskArr = JSON.parse(localStorage.getItem("alltask"));
    for(let i = 0; i < taskArr.length; i++){
        let {color, id, task} = taskArr[i];
        //Creation of new ticket every time we reload
            // we are already creating tikckets so just call the fn
                // 
        createTicket(task, color, id);
    }
}


// By clicking on add display the modal container appears or disappears on screen
addBtn.addEventListener("click", function(){
    if (addState == false){
        modalContainer.style.display =  "flex";
    }
    else{
        modalContainer.style.display =  "none";
    }
    addState = !addState;
})

// Add click to colors of modal container
for(let i = 0; i<modalFilters.length; i++){
    modalFilters[i].addEventListener("click", function(){
        // Remove border 
            // remove working
                    // if there is class then it will remove 
                    // -> if not then it won't create any harm
    
        modalFilters.forEach(function(modalFilter){
            modalFilter.classList.remove("border");
        })
        // Add border on clicked color
        modalFilters[i].classList.add("border");  
        // Change color to clicked color
        cColor = modalFilters[i].classList[1];
    })
}

// Get text enter in the input box 
desBox.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        let task = desBox.value;                // It will give value entered in tne input
        createTicket(task, cColor);
        cColor = "black"                        // reset default color
        flag = false;                           // reset default flag
        desBox.value = "";                      // Empty the input box
        modalContainer.style.display = "none"
    }
})

removeBtn.addEventListener("click", function(){
    if (removeState == false){
        removeBtn.style.backgroundColor =  "rgb(104, 82, 49)";
    }
    else{
        removeBtn.style.backgroundColor =  "rgb(146, 102, 35)";
    }
    removeState = !removeState;
})

// Create ticket using and apppend it into its parent container
function createTicket(task, color, myId){
    let id = myId || uid();

    // Element div is created
    let ticketContainer = document.createElement('div');
    // Here class = "ticket-container" in previosly created div
    ticketContainer.setAttribute("class", 'ticket-container');
    // Now html is added to div element so that we get our desired element
    ticketContainer.innerHTML = `<div class="ticket-color ${color}"></div>
        <div class="ticket-id-container">
            <h3 class="ticket-id">#${id}</h3>
            <div class="ticket">${task}</div>
        </div>`
    // Append to parent i.e. mainContainer
    mainContainer.appendChild(ticketContainer);
    
    // If id is new then we will push into taskArr
    if(!myId){
        // Push all details into task arr
        taskArr.push({
            color: color,
            id: id,
            task:task
        })
        // push taskArr into alltask named dictionary
        localStorage.setItem("alltask", JSON.stringify(taskArr));
    }

    // Here we get the desired element to change color of strip
    let color_strip = ticketContainer.querySelector('.ticket-color');
    handleStripColor(color_strip);
    handleDelete(ticketContainer);
}

function handleStripColor(color_strip){

    // Whenever color strip is clicked color will be changed to the next color
    color_strip.addEventListener("click", function(){
        // Got the all class of the curr strip
        let classes = color_strip.classList;
        // Bcz our color class is at 2nd pos so we chose 1
        let initialColor = classes[1];

        // Get the index of curr color
        let initialCIndex = colorsArr.indexOf(initialColor);
        
        
        let nextColorindex = (initialCIndex + 1) % 4;
        let nextColor = colorsArr[nextColorindex];

        // Remove curr color class
        color_strip.classList.remove(initialColor);
        // add next color class
        color_strip.classList.add(nextColor);

        // To change color in LocalStorage on tap
        handleColorinStore(color_strip, nextColor);
    })
}

// Delete element permanently
function handleDelete(ticketContainer){
    ticketContainer.addEventListener("click", function(){
    if (removeState ==  true){
            // Delete the element by finding index permanently
                // index is find by id
            let containerId = ticketContainer.querySelector(".ticket-id");
            containerId = containerId.innerText;
            let toBedeletedID = containerId.substring(1);
            
            let idx = taskArr.findIndex(function(ticket){
                return ticket.id == toBedeletedID;
            });
            
            taskArr.splice(idx, 1);
            localStorage.setItem("alltask", JSON.stringify(taskArr));
            ticketContainer.remove();
        }
    })
}

// Find index of color strip using parentNode and set color on that index to newColor.
function handleColorinStore(color_strip, newColor){

    let ticketSubcontainerElem = color_strip.parentNode.children[1];        //It will give 2nd parent of color_strip

    let ticketIdElement = ticketSubcontainerElem.children[0];       

    let id = ticketIdElement.innerText.substring(1);
    let idx = taskArr.findIndex(function(ticket){
        return ticket.id == id;
    });
    taskArr[idx].color = newColor;
    localStorage.setItem("alltask", JSON.stringify(taskArr));
}