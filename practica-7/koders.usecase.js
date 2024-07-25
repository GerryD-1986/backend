const db = require("./db");

function add(newkoder){
   if(!newkoder.name) throw new Error("name is required");
   if(!newkoder.generation) throw new Error("generation is required");
   newkoder.generation = parseInt(newkoder.generation);
   if(isNaN(newkoder.generation)) throw new Error("generation must be a number");
   if(newkoder.generation <=0 )throw new Error("generation must be greater than 0");

        

    if(!["f","m","nb"].includes(newkoder.gender.toLowerCase())){
        throw new Error("only m and f are accepted");
    }

    if(!newkoder.age) throw new Error("age is required");
    newkoder.age = parseInt(newkoder.age);
    if(isNaN(newkoder.age)) throw new Error("age must be a number");
    if(newkoder.age <= 0) throw new Error("age must be greater than 0");

    if(typeof newkoder.isActive != "boolean"){
        throw new Error("is Active must be a boolean");
    }
    const dbData = db.read();
    dbData.koders.push(newkoder);

    db.write(dbData);

    return dbData.koders;
}


function deleteAll(){
    const dbData = db.read();
    dbData.koders=[];
    db.write(dbData);
    return dbData.koders;
}

function deleteByName(name){
  if(!name) throw new Error("name is required");
  const dbData = db.read();
  dbData.koders = dbData.koders.filter((koder) => koder.name != name);
  db.write(dbData);
  return dbData.koders;
}

function getAll(){
    return db.read().koders;
}

module.exports ={
    add,
    deleteAll,
    deleteByName,
    getAll,
}