const { Transform } = require("stream");

const parser = new Transform({
    readableObjectMode : true,

    transform(chunk, encoding, callback) {
        let data = null;
        try {
            data = JSON.parse(chunk);
        } catch (error) {
            console.error("JSON parsing error", error)
        }

        if (data !== null) {
            this.push(data);
        }

        callback();
    }
});

module.exports = parser;
