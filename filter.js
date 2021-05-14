let pFilterColor = null;
let allFilterElments = document.querySelectorAll(".filter-colors_container");

for(let i = 0; i<allFilterElments.length; i++){
    allFilterElments[i].addEventListener("click", function(){
        let filterColorElem = allFilterElments[i].children[0];
        let toFilterColor = filterColorElem.classList[1];

        
        let ticketElementsArr = document.querySelectorAll(".ticket-container");
        let length = ticketElementsArr.length;

        // add class = hidden to all the tokens except chosen
        // for(let j = 0; j < length; j++){
        //     ticketElementsArr[j].classList.remove("hidden");
        // }
        // for(let j = 0; j < length; j++){
        //     let color_elem = ticketElementsArr[j].children[0];
        //     let color = color_elem.classList[1];

        //     if(color != toFilterElem){
        //         ticketElementsArr[j].classList.add("hidden");
        //     }            
        // };
        
        // Remove from UI 
        for(let j = 0; j < length; j++){
            ticketElementsArr[j].remove();
        }

        // Render on UI
        let reqArr;
        if(pFilterColor != null && pFilterColor == toFilterColor){
            reqArr = taskArr;

            pFilterColor = null;
        }
        else{
            reqArr = taskArr.filter(function(elementObj){
                return elementObj.color == toFilterColor;
            });
            pFilterColor = toFilterColor;
        }
        // reqArr -> render
        reqArr.forEach(function(taskobj){
            let {color, id, task} = taskobj;
            createTicket(task, color, id);
        })
    })
}