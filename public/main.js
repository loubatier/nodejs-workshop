function testState() {
    const isInteractive = document.readyState === "interactive";
    return isInteractive;
}

if ( testState() ) {
    init();
} else {
    document.onreadystatechange = function () {
        if( testState() ) {
            init();
        }
    }
}

function init() {
    const socket = new WebSocket(`ws://${window.location.hostname}:${window.location.port}`);

    socket.addEventListener('open', event => {
        console.log("connected", event);
    });

    socket.addEventListener('message', event => {
        //console.log(event.data);
        const tweet = JSON.parse(event.data);

        try {
            tweet;
        } catch (error) {
            console.error("error :", error);
            console.log(event.data);
        }

        const container = document.getElementById('tweet');
        container.innerText = tweet.text;
        socket.send("message received!");
    });

    const start = document.getElementById('start');

    start.addEventListener('click', function () {
        console.log("aloha");
    });
}

function buttonClickedHandler(socket) {
    console.log()
}


