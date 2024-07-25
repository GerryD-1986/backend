const express = require('express');
const kodersUseCase = require("./koders.usecase");

const router = express.Router();

router.use((request,response,next) =>{
    console.log("middeware a nivel de router (koders)");
    next();
})


router.get("/", (request, response)=>{
    try{
      const koders = kodersUseCase.getAll()
      response.json({
          message: "all koders",
          data:{
              koders:koders,
          },
      });
    }catch(error){
       response.status(error.status || 500)
       response.json({
          error: error.message,
       })
    }
  });
  
  router.post("/", (request, response)=>{
      try{
          const newkoder = request.body;
          const koders = kodersUseCase.add(newkoder);
         response.json({
          message: "koder added",
          data: {koders},
         });
      }catch(error){
          response.status(error.status || 500);
          response.json({
              error:error.message,
          });
      }
  });
  
  router.delete("/", (request,response)=>{
      try{
          const koders = kodersUseCase.deleteAll();
          response.json({
              message: "All koders deleted",
              data: { koders },
          });
      }catch(error){
          response.status(error.status || 500);
          response.json({
              error:error.message,
          });
      }
  });
  
  router.delete("/:name", (request, response)=>{
      try{
        const name = request.params.name;
        const koders = kodersUseCase.deleteByName(name);
  
        response.json({
          message:"koder deleted",
          data: { koders},
        });
      }catch(error){
          response.status(error.status || 500);
  
          response.json({
              error: error.message,
          });
      }
  });

module.exports = router;

