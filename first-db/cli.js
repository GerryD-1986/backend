
require("dotenv").config();
const mongoose = require('mongoose');

const {
    DB_USER, DB_PASSWORD,DB_HOST,DB_NAME
} = process.env;
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
 
//modelo
const koder = mongoose.model("koder", new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength : 2,
        maxLength : 100,
    },
    lastName:{
        type: String,
        required: false,
        maxLength: 100,
    },
    email:{
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    birthDate:{
        type: Date,
        required: false,
    },
    generation: {
        type: Number,
        min: 1,
        max: 100,
    },
}));

//protocolo://usuario:password@host7dbNAme
mongoose.connect(MONGO_URI).then(()=>{
    console.log("Conexión exitosa");
    //insertar
    koder.create({
        firstName: "Gerardo",
        lastName: "Diaz",
        email: "algo@hotmail.com",
        birthDate: new Date("1986-03-01"),
        generation: 33,
    }).then(() => console.log("Koder created"))
    .catch((error)=>console.error("Error al crear koder", error));
}).catch((error)=>{
  console.error("Error al conectar con la base de datos", error);
});



