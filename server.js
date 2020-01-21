const http = require("http");
const fs = require("fs");
const { pipeline } = require("stream");
const WebSocket = require("ws");

const server = http.createServer((request, response) => {
    console.log(request.url);
    if(request.url === "/") {
        const fileStream = fs.createReadStream("./public/index.html");
        pipeline(
            fileStream,
            response,
            error => {
                console.error(error);
                response.writeHead(500);
                response.end("an error occurred ")
            }
        )
    }
});

const wsServer = new WebSocket.Server({
    server
});

wsServer.on("connection", (ws) => {
    console.log("new connection:", ws);
    ws.send('du texte');
    ws.on("message", (message) => {
        console.log("message du client:", message);
    })
});

module.exports = server;

