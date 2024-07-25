//registrar un nuevo koders -add
//listar todos los koders - ls
//eliminar koders por nombre - rm
//eliminar todos los koders - reset
// usar un archivo .json como base de datos
// recibir los datos por el argv de node

const fs = require('fs'); //importar fs
const prompt = require("prompt-sync")();
const dbFile = 'db.lista';
 

function init(){
  const Existencia = fs.existsSync(dbFile);
  if(!Existencia){
    fs.writeFileSync(dbFile, JSON.stringify({koders: []}));
  }
}

function obtKoders(){
  const cont = fs.readFileSync(dbFile, "utf8");
  return JSON.parse(cont).koders;
}

function actKoders(koders){
  const nuevoKoders = {koders: koders};
  const nuevoKodersAsString = JSON.stringify(nuevoKoders);
  fs.writeFileSync(dbFile, nuevoKodersAsString);
}

function agregar(nom){
     const koders = obtKoders();
     if(koders.find((koder) => koder.nom === nom)){
      const opt = prompt("Koder duplicado, quieres agregarlo de nuevo?");
      if(opt.toLocaleLowerCase() === "no"){
        console.log("koder no agregado");
        ls();
        process.exit();
      }else{
        koders.push({nom: nom});
        console.log("koder agregado");
      }
      actKoders(koders);
     }
     koders.push({nom: nom});
     actKoders(koders);
}

function rm(nom){
  const koders = getkoders();
  const newKoders = koders.filter((koder) => koder.nom !== nom);
  actKoders(newKoders);
}

function ls(){
  const koders = getKoders();

  if (!koders.length) {
    console.log("Lista Vacia");
    process.exit();
  }
  koders.forEach((koder, index) => {
    console.log(index, " _ ", koder);
  });
}

function reset(){
  actKoders([]);
}

function main(){
  const [command, ...args]= process.argv.slice(2);

  init();
  switch(command){
    case "add":
      add(args[0]);
      ls();
      console.log("Agregado");
      break;
      case "rm":
        if(!args[0]){
          console.error("falta información");
          process.exit(1);
        }
        if(!obtKoders().find((koder)=>koder.nom === args[0])){
          console.error("koder no encontrado");
          process.exit(1);
        }else{
          const opt = prompt("estas seguro de bborrar el archivo?");
          if(opt.toLocaleLowerCase() === "no"){
            console.log("koder no removido");
            ls();
            process.exit();
          }else{
            rm(args[0]);
            console.log("koder borrado");
            ls();
          }
        }
        break;
        case "ls":
          ls();
          break;
          case "reset":
            reset();
            console.log("Lista reset");
            break;

      default:
        console.log("comando invalido");
  }

}


