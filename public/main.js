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
        let tweet;

        try {
            tweet = JSON.parse(event.data);
            console.log(tweet)
        } catch (error) {
            console.error("error :", error);
            console.log(tweet);
        }

        const text = document.getElementById('tweetText');
        const image = document.getElementById('tweetImage');
        const color = document.getElementById('tweetColor');

        text.innerText = tweet.text;
        image.setAttribute("src", tweet.user.profile_image_url);
        image.style.borderColor = `#${tweet.user.profile_link_color}`;
        color.style.borderColor = `#${tweet.user.profile_link_color}`;
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

function updateCountBar(bar) {

}


