const limit = parseFloat(process.argv[2]);

if(isNaN(limit)){
    console.error("Argumento invalido");
    process.exit();
}

console.log("Esto no debe verse si el argumento no es valido");

for (let i = 1; i < limit; i++){
    if(i % 3 == 0 && i % 5 == 0){
        console.log(i, "fizzBuzz");
    }else if(i % 3 ==0){
        console.log(i, "Fizz");
    }else if(i % 5 == 0){
        console.log(i, "Buzz");
    }else{
        console.log(i);
    }
    
}