//todo add "limpiar mi cuarto"
// todo done 10
// todo ls
// todo alv 

// necesitamos:
// un artivo para guardar los todos (.json)
// funcion para cada comando
// usar process.argv para leer los comandos
// usar fs para leer y escribir el archivo

const fs = require('fs'); //importar fs


const dbFile = 'db.jason';
 
function add (task) {
 // leer el archivo
 // agregar al archivo
 const todos = getTodos();
 todos.push(task)
 updateTodos(todos)
}

function done (taskIndex) {
  // leer el archivo
 // actualizar al archivo
 const todos = getTodos()
 todos.splice(taskIndex, 1)
 updateTodos(todos)
}

function ls () {
  // leer el archivo
  const todos = getTodos()
  todos.forEach((task, idx) => {
    console.log(idx, "-", task);
  });
}

function alv () {
  // actualizar el archivo
  updateTodos([]);
}


function init (){
    // crear el archivo de base de datos
    
    const fileExists = fs.existsSync(dbFile);

    if(!fileExists){
        fs.writeFileSync(dbFile, JSON.stringify({ todos: []}));
    }
}

function getTodos(){
    // leer el archivo 
    const content = fs.readFileSync(dbFile, "utf8");
    return JSON.parse(content).todos;
}


function updateTodos(todos){
    // actualizar el archivo
    const newTodos = { todos: todos}
    const newTodosAsString = JSON.stringify(newTodos)
    fs.writeFileSync(dbFile, newTodosAsString);
}

function main(){
    const command = process.argv[2];
    const arg = process.argv[3];

  init()

  if(command == 'ls'){
    ls()
  }else if(command == 'add'){
    if(!arg){
        console.error("missing task")
        process.exit(1)
    }

    add(arg);
    ls();
    console.log("task added")

  }else if (command == "done"){
    if (!arg){
        console.error('missing task index')
        process.exit(1)
    }

    const idx = parseInt(arg);
    if(isNaN(idx)){
        console.error("Invalid index");
        process.exit(1);
    }

    const todos = getTodos();

    if(idx < 0 || idx >= todos.length){
        console.error("Invalid index");
        process.exit(1);
    }

    done(idx);
    ls();
    console.log("task completed!");

  }else if(command == "alv"){
    alv();
    console.log("Algo lindo vendra");
  }else{
    console.error("Invalid command:", command);
    process.exit(1);
  }

}

main();