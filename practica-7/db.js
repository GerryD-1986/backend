const { json } = require("express");
const fs = require("node:fs");
const fileName = `db.jason`;

const defaultData ={
    koders:[],
};

function init(){
    if(!fs.existsSync(fileName)){
        fs.writeFileSync(fileName, JSON.stringify(defaultData));
    }
}

function read(){
    const dbAsString = fs.readFileSync(fileName, "utf-8");
    return JSON.parse(dbAsString);
}

function write(dataToWrite){
    fs.writeFileSync(fileName,JSON.stringify(dataToWrite));
}

module.exports = {
    init,
    read,
    write,
};
