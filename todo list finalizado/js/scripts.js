//seleção de elementos da tela do html com queryselector
const todoform = document.querySelector('#todo-form')
const todoinput = document.querySelector('#todo-input')
const todolist = document.querySelector('#todo-list')
const editform = document.querySelector('#edit-form')
const editinput = document.querySelector('#edit-input')
const canceleditbtn = document.querySelector('#cancelar-edit-btn')
const pesquisarinput = document.querySelector('#pesquisar-input')
const apagarbt = document.querySelector('#apagarbt')
const filtersel = document.querySelector('#filtrar-sel')
let inputantigo;

//mostrar elementos na tela criando divs por função
const savetodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")
    
    //criar um h3
    const todotitle = document.createElement("h3")
    todotitle.innerText = text
    todo.appendChild(todotitle)
    
    //criar um botao de terminar
    const donebtn = document.createElement("button")
    donebtn.classList.add("terminar-todo")
    donebtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(donebtn)


    //criar botao de editar
    const editbtn = document.createElement("button")
    editbtn.classList.add("editar-todo")
    editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editbtn)


    //criar botao de remover
    const deletebtn = document.createElement("button")
    deletebtn.classList.add("remover-todo")
    deletebtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deletebtn)

    //utilizar dados da localstorage
    if(done){
        todo.classList.add("done")
    }
    if(save){
        savetodolocalstorage({text, done})
    }


    //colocar a nova tarefa na lista geral
    todolist.appendChild(todo)
    todoinput.value = ""
    todoinput.focus()
}

//esconde os formulários pra mostrar somente o form de edição
const toggleforms = () =>{
    editform.classList.toggle("esconder")
    todoform.classList.toggle("esconder")
    todolist.classList.toggle("esconder")
}

const updatetodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todotitle = todo.querySelector("h3");
        if (todotitle.innerText === inputantigo) {
            todotitle.innerText = text;

            updateTodosLocalStorage(inputantigo,text)
        }
    });
}

const getsearchtodos = (pesquisar) => {
    const todos = document.querySelectorAll(".todo")
    todos.forEach((todo) =>{
        const todotitle = todo.querySelector("h3").innerText.toLowerCase()
        
        const pesquisanormal = pesquisar.toLowerCase()

        todo.style.display = "flex"
        
        if(!todotitle.includes(pesquisanormal)){
            todo.style.display = "none"
        }
    })
}


const filtrartodos = (filtervalue) =>{
    const todos = document.querySelectorAll(".todo")

    switch(filtervalue){
        case "todos":
            todos.forEach((todo) => (todo.style.display = "flex"))
            break;

        case "feitos":
            todos.forEach((todo) => {
                if (todo.classList.contains("done")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            });
            break;

        case "fazer":
            todos.forEach((todo) => {
                if (!todo.classList.contains("done")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            });
            break;

        default:
            break;
    }
}


//eventos
todoform.addEventListener("submit", (e) =>{
    e.preventDefault()

    const inputvalue = todoinput.value

    if(inputvalue){
        savetodo(inputvalue)
        //salvar o que foi digitado
    }
})






document.addEventListener("click", (e) =>{

    const targetel = e.target
    //procura a div mais perto
    const parentel = targetel.closest("div")
    let todotitle;

    if(parentel && parentel.querySelector("h3")){
        todotitle = parentel.querySelector("h3").innerText;
    }

    if(targetel.classList.contains("terminar-todo")){
    //adicionando a classe done 
    parentel.classList.toggle("done")

    updateTodosStatusLocalStorage(todotitle)
    }
    //remove tarefa
    if(targetel.classList.contains("remover-todo")){
    parentel.remove()

    removetodolocalstorage(todotitle)
    }
    //edita tarefa
    if(targetel.classList.contains("editar-todo")){
    toggleforms()

    editinput.value = todotitle
    inputantigo = todotitle
    }
})

canceleditbtn.addEventListener("click" ,(e) =>{
    e.preventDefault()
    toggleforms()

})
//listener pra enviar a tarefa atualizada
editform.addEventListener("submit", (e)=>{
    e.preventDefault()
        const editinputvalue = editinput.value
        
        if(editinputvalue){
            //atualizar
            updatetodo(editinputvalue)
        }
        toggleforms()
    
})

pesquisarinput.addEventListener("keyup", (e) =>{
    const pesquisar = e.target.value
    getsearchtodos(pesquisar)
})

apagarbt.addEventListener("click" ,(e) =>{
    e.preventDefault()

    pesquisarinput.value = ""
    pesquisarinput.dispatchEvent(new Event("keyup"))
})


filtersel.addEventListener("change", (e) =>{
    const filtervalue = e.target.value
    filtrartodos(filtervalue)
})

//localstorage
const gettodoslocalstorage = () =>{
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    return todos
}

const loadtodos = () =>{
    const todos = gettodoslocalstorage()

    todos.forEach((todo) =>{
        savetodo(todo.text, todo.done, 0)
    })
}

const savetodolocalstorage = (todo) =>{
    const todos = gettodoslocalstorage()

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const removetodolocalstorage = (todotext) =>{
    const todos = gettodoslocalstorage()
    const filteredtodos = todos.filter((todo) => todo.text !== todotext)
    localStorage.setItem("todos", JSON.stringify(filteredtodos))
}

const updateTodosStatusLocalStorage = (todotext) =>{
    const todos = gettodoslocalstorage()

    todos.map((todo) => 
    todo.text === todotext 
    ? todo.done = !todo.done 
    : null)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const updateTodosLocalStorage = (todooldtext, todoNewText) =>{
    const todos = gettodoslocalstorage()

    todos.map((todo) => 
    todo.text === todooldtext ?(todo.text = todoNewText): null)
    localStorage.setItem("todos", JSON.stringify(todos))
}

loadtodos()