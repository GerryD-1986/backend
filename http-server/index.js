const http = require("node:http");

// Create a local server to receive data from
const server = http.createServer((req, res) => {
    console.log("req:", req);
    const method = req.method
    const url = req.url;
        res.end(`${method}: ${url}`);
});

server.listen(8080, () =>{
    console.log("server is listening on port 8080");
});


