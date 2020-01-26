require("dotenv").config();

const { wsServer, server } = require("./lib/server");
const twitterStream = require("./lib/twitter");

twitterStream.on("error", error => {
    console.error(error);
});

let filters = null;

wsServer.on("connection", client => {
    console.log("new client connection");

    client.on("message", message => {
        console.log("message from client: ", message);

        if(message.includes("filters")) {
            message = JSON.parse(message);
            filters = JSON.stringify(message.filters);
        }
    });

    client.send("Welcome!");

    twitterStream.on("data", tweet => {
        client.send(JSON.stringify(tweet));
    })
});

module.exports = filters;

server.listen(process.env.PORT);
