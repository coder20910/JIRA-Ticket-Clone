let lockBtn = document.querySelector(".lock");
let lockStatus = true;

lockBtn.addEventListener("click", function(){
    let taskElementsArr = document.querySelectorAll(".ticket");
    if(lockStatus == false){
        lockBtn.classList.remove("fa-lock");
        lockBtn.classList.add("fa-unlock-alt");
        
        taskElementsArr.forEach(function(taskEachEle){
            // Set area to content editable to true
            taskEachEle.setAttribute("contenteditable", "true");
            
            taskEachEle.addEventListener("focus", function(){
                // If element loses focus get the text and save into local
                taskEachEle.addEventListener("blur", function(e){
                    let newTask = e.target.innerText;
                    handleEditedDataintoStorage(taskEachEle, newTask);
                })
            })
        })
    }
    else{
        lockBtn.classList.remove("fa-unlock-alt");
        lockBtn.classList.add("fa-lock");
        taskElementsArr.forEach(function(taskEachEle){
            taskEachEle.setAttribute("contenteditable", "false");
        })
    }
    lockStatus = !lockStatus;
})
// find idx of curr element in local storage 
    // set newTask at task key of that index
        // update local storage
function handleEditedDataintoStorage(currTaskEle, newTask){
    let idElement = currTaskEle.parentNode.children[0];
    let id = idElement.innerText.substring(1);
    
    let idx = taskArr.findIndex(function(ticket){
        return ticket.id == id;
    })
    
    taskArr[idx].task = newTask;
    localStorage.setItem("alltask", JSON.stringify(taskArr));
}