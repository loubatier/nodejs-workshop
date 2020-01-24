require("dotenv").config();

const { wsServer, server } = require("./lib/server");
const twitterStream = require("./lib/twitter");

twitterStream.on("error", error => {
    console.error(error);
});

wsServer.on("connection", client => {
    console.log("new client connection");

    client.on("message", message => {
        console.log("message from client: ", message);
    });

    client.send("Welcome!");

    twitterStream.on("data", tweet => {
        client.send(JSON.stringify(tweet));
    })
});

server.listen(process.env.PORT);
