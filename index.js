require("dotenv").config();

const { wsServer, server } = require("./lib/server");
const twitterStream = require("./lib/twitter");

// We retrieve filters in order to use them later
const getFilters = (filters) => {
    return filters;
};

let filters;

twitterStream.on("error", error => {
    console.error(error);
});

wsServer.on("connection", client => {
    console.log("new client connection");

    client.on("message", message => {

        // If the message is the object containing filters we catch them
        if(message.includes("filters")) {
            message = JSON.parse(message);
            filters = getFilters(message.filters.toString());
            console.log(filters);
        }
    });

    // We send the tweet data to the client that he'll then display only if filters are not null
    if (filters != null) {
        console.log("there are filters");

        twitterStream.on("data", tweet => {
            client.send(JSON.stringify(tweet));
        })
    }
});

module.exports = getFilters;

server.listen(process.env.PORT);
