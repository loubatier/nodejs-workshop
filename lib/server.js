const http = require("http");
const fs = require("fs");
const { pipeline } = require("stream");
const ws = require("ws");

const server = http.createServer((request, response) => {
    let file = "./public";
    let contentType = "";

    if (request.url === "/") {
        file += "/index.html";
    } else {
        if (request.url.endsWith(".js")) {
            contentType = "text/javascript";
        } else if (request.url.endsWith(".css")) {
            contentType = "text/css";
        }
        file += request.url;
    }

    response.setHeader("Content-Type", contentType);
    const fileStream = fs.createReadStream(file);

    pipeline(
        fileStream,
        response,
        error => {
            if (error) {
                console.error(error);
                response.writeHead(500);
                response.end("an error occured");
            }

            console.log("end of response");
        }
    )
});

const wsServer = new ws.Server({
    server
});

module.exports = {
    server,
    wsServer
};
