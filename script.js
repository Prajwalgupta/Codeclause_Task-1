





class todoList {

    constructor(){
            
            this.tasksContainer = document.querySelector("#tasksContainer");
            this.editContainer = document.querySelector("#editContainer");
            this.sendButton =  document.querySelector("#sendButton");
            this.overlay = document.querySelector("#overlay")
            this.getTask = [];
            
    }

/* Função para puxar o array de tasks do localStorage e convertelo para json, ou contrario */
  setTaskList(type){

        if (type == 'get'){

            this.getTask = JSON.parse(localStorage.getItem("tasks"));
            if (!this.getTask) this.getTask = [];
   
        } else {
            localStorage.setItem("tasks", JSON.stringify(this.getTask));
        }

    }

/* Função para renderizar as tasks no container principal */
    renderTasks(){

        this.setTaskList('get');
        this.tasksContainer.innerHTML = "";
     
        this.getTask.forEach((x,i) => {
            var newTask = document.createElement("div")
            newTask.classList = "task"
            newTask.innerHTML = `
                <span  id="${x.id}" class="material-symbols-outlined checkbox">${!x.completed ? 'check_box_outline_blank' : 'check_box' }</span>
                <p>${x.text}</p>
                <span id="${x.id}" class="material-symbols-outlined edit" >edit</span>
                <span id="${x.id}" class="material-symbols-outlined delete" >delete</span>
                `

        this.tasksContainer.appendChild(newTask);
         
        
    
        })

        this.checkboxButtons = document.querySelectorAll(".task .checkbox");
        this.deleteButtons = document.querySelectorAll(".task .delete");
        this.editButtons = document.querySelectorAll(".task .edit");




        this.deleteButtons?.forEach(x => {
            x.addEventListener("click",(x) =>  this.editTask(x.target.id, 'delete'))
         })

        this.checkboxButtons?.forEach(x => {
            x.addEventListener("click",(x) => this.editTask(x.target.id, 'completed'))
        })

        this.editButtons?.forEach((x, i) => {
            x.addEventListener("click",(x) => {
              

                this.manageEditBox(x.target.id);
    
            })
         }) 
    


    }

/* Função para modificar dados das tasks */
    editTask(id, type, value){

        switch (type) {
            case 'text':
                this.getTask[id].text = value;
            break;
            case 'completed':
                this.getTask[id].completed = !this.getTask[id].completed;
            break;
            case 'delete':
                this.getTask = this.getTask.filter(x => x.id != id); 
            break;
            case 'add':
                this.getTask.push(value)
            break;
        }
        
        this.getTask.forEach((x, i) => this.getTask[i].id = i);
        this.setTaskList('set');
        this.renderTasks();
        
    }

/* Função para gerenciar o container de edição de tasks */
    manageEditBox(id){

    this.overlay.style.display = 'block'
    this.editContainer.style.display = 'flex'
    

    document.querySelector("#cancelButton").addEventListener("click", x => {
        this.overlay.style.display = 'none';
        this.editContainer.style.display = 'none'
        return;
    })
    
    document.querySelector("#editButton").addEventListener("click", x => { 
        var input = document.querySelector("#editInput");
        if (!input.value) return input.style.border = "0.5px solid red";
        this.editTask(id, 'text', input.value)
        this.overlay.style.display = 'none';
        this.editContainer.style.display = 'none'
    })

    }



}       



var manage = new todoList();
document.body.onload = manage.renderTasks();


var sendButton = document.querySelector(".sendTask #sendButton");
sendButton.addEventListener("click", () => {

var sendInput = document.querySelector("#sendInput");
if (!sendInput.value) return sendInput.style.border = "0.5px solid red";



manage.editTask(0,  'add', {
    text:`${sendInput.value}`,
    completed: false, 
    id:0
})


sendInput.value = "";
sendInput.style.border = "";

})

