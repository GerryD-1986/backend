const prompt = require("prompt-sync")();
console.log('Ingresa nombres, para dejar de ingresar presiona c: ');
let nombres = [];
let nombre;
let longitud;

do{
    nombre = prompt("Ingresa tu nombre: ");
    if(nombre != 'c'){
        nombres.push(nombre);
    }

}while(nombre != 'c');
let repetido = 0;
for (let i=0; i < nombres.length; i++){
    for(let j = 0; j < nombres.length; j++){
        if(nombres[i] == nombres[j] && i != j){
            repetido++;
        }
    }
}
longitud = nombres.sort((a,b) => b.length - a.length);

console.log('Cantidad de nombres ingresados: ', nombres.length)
console.log('Cantidad de nombres repetidos: ', repetido/2)
console.log('Nombre mas largo ', longitud[0])
console.log('Nombre mas corto: ', longitud[longitud.length-1])


    
