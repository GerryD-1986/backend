const express = require('express');

const router = express.Router();

//GET/Mentors
router.get("/", (request, response) =>{
    response.json({
        message: "mentors",
    });
});

module.exports = router;