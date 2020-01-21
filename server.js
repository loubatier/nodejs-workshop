const http = require("http");
const fs = require("fs");
const { pipeline } = require("stream");

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

exports.start = () => {
    server.listen(8080);
};

