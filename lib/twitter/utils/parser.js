const { Transform } = require("stream");

const parser = new Transform({
    readableObjectMode : true,

    transform(chunk, encoding, callback) {
        let data = null;

        try {
            data = JSON.parse(chunk);
        } catch (error) {
            console.error("JSON parsing error", error);
            console.log(chunk.toString());
            this.emit("error", chunk.toString());
            /*
            data = {
                error : chunk.toString()
            }
            */
        }

        if (data !== null) {
            this.push(data);
        }

        callback();
    }
});

module.exports = parser;
