const request = require("request");

const splitter = require("./utils/splitter");
const parser = require("./utils/parser");
const getFilters = require("../../index");

// Getting filters from index.js
let filters = getFilters;
console.log(filters);

// Request to Twitter API only if there are filters
if (filters != null) {
    const httpStream = request.get(`${process.env.TWITTER_API_STREAM_TRACKED_URL + filters}`, {
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
        .pipe(parser);

    module.exports = tweetStream;
}
