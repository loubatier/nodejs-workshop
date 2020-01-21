const https = require("https");
const { pipeline } = require("stream");
const request = require("request");
const splitter = require("./splitter");
const parser = require("./parser");
const logger = require("./logger");

const httpStream = request.get("https://stream.twitter.com/1.1/statuses/sample.json", {
    oauth: {
        consumer_key: "cMKc8BCFmLvK0vyeCVjngLug2",
        consumer_secret: "mSAMeegMTL3biHAILKUXt3rnx1iQ0klTKNTdA4xOTv5Wiowq37",
        token: "1283927196-CQRbKBDDAPuU9TpRQKxWHhiwV1tgNV5lQKCoCWx",
        token_secret: "KszLjkW9dQuIRYEuy2QaBBDINufjnD5NpqYYBLBzUFnrN"
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

