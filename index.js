require("dotenv").config();

const https = require("https");
const { pipeline } = require("stream");
const request = require("request");
const splitter = require("./splitter");
const parser = require("./parser");
const logger = require("./logger");
const server = require("./server");

const httpStream = request.get("https://stream.twitter.com/1.1/statuses/sample.json", {
    oauth: {
        consumer_key: process.env.TWITTER_API_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET,
        token: process.env.TWITTER_API_TOKEN,
        token_secret: process.env.TWITTER_API_TOKEN_SECRET
    }
});

pipeline(
    httpStream,
    splitter,
    parser,
    logger,
    error => {
        console.error("error:", error)
    }
);

server.listen(process.env.PORT);

