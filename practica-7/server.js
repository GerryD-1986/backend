// la definicion de nuestro servidor
const express = require("express");
const kodersRouter = require("./koders.router");
const mentorRouter = require("./mentors.router");

const server = express();

server.use(express.json());

server.use((request, response, next) =>{
    console.log("middleware de aplicacion");
    const authorization = request.headers.authorization;
    if(authorization == 'alohomora'){
        next();
    }else{
        response.status(403);
        response.json({
            message: "no tienes acceso",
        });
    };
    
    
})
// montar el router en el server
server.use("/koders", kodersRouter);
server.use("/mentors", mentorRouter);

server.get("/", (request, response) =>{
    response.json({
        message: "kodemia APIv1",
    });
});


module.exports = server;