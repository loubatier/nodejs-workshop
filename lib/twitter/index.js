const request = require("request");
const splitter = require("./splitter");
const customizer = require("./customizer");
const parser = require("./parser");
const logger = require("./logger");

const httpStream = request.get(`${process.env.TWITTER_API_STREAM_SAMPLE_URL}`, {
    oauth: {
        consumer_key: process.env.TWITTER_API_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET,
        token: process.env.TWITTER_API_TOKEN,
        token_secret: process.env.TWITTER_API_TOKEN_SECRET
    }
});

// Regarder la doc de request pour fermer

const tweetStream = httpStream
    .pipe(splitter)
    .pipe(customizer)
    .pipe(parser);

module.exports = tweetStream;
