const { Transform } = require("stream");

const customizer = new Transform({
    readableObjectMode : true,

    transform(chunk, encoding, callback) {
        let data = null;

        try {
            data = chunk;
        } catch (error) {
            console.error("JSON parsing error", error);
            console.log(chunk.toString());
        }

        if (data !== null) {
            this.push(data);
        }

        callback();
    }
});

module.exports = customizer;
