const express = require('express');

const server = express();

const koders = [
  {
    name: "omar",
    generacion: 33,
  }
];

//habilita server para poder recibir peticiones en formato JSON
server.use(express.json());

server.get("/", (request, response) => {
   console.log("GET root");
    response.writeHead(200, {'Content-Type': 'text/plain',});

   response.end("hola mundo");
});

server.post("/koders", (request, response) =>{
  console.log("body: ", request.body);
  const newKoderName = request.body.name
  const newKoderGen = request.body.generacion

  const newkoder = {
    name: newKoderName,
    generacion: newKoderGen
  }

  koders.push(newkoder);

  response.json(koders);
});

server.get("/koders", (request, response) =>{
response.status(500);
   response.json(koders);
})

server.listen(8080, ()=>{
    console.log("server ready");
});