function testState() {
    let isInteractive;
    isInteractive = document.readyState === "interactive";

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
        } catch (error) {
            console.error("error :", error);
        }

        const text = document.getElementById('tweetText');
        const image = document.getElementById('tweetImage');
        const color = document.getElementById('tweetColor');

        text.innerText = tweet.text;
        image.setAttribute("src", tweet.user.profile_image_url);
        image.style.borderColor = `#${tweet.user.profile_link_color}`;
        color.style.borderColor = `#${tweet.user.profile_link_color}`;
    });


    const start = document.getElementById('start');

    start.addEventListener('click', function () {
        getFilters(socket);
    });

    const stop = document.getElementById('stop');

    stop.addEventListener('click', function () {
        getFilters(socket);
    });

}

function getFilters(socket) {
    const selectors = document.getElementsByClassName('selector');
    let track     = {
        "filters" : []
    };

    for (let i = 0; i < selectors.length; i++) {
        const el        = selectors[i];
        const filter    = el.value;

        track.filters.push(filter);
    }

    if (track.filters[0] === "" || track.filters[1] === "") {
        alert("Veuillez sélectionner deux mots clés");
    } else {
        socket.send(JSON.stringify(track));
    }
}

function updateCountBar(bar) {
    bar.style.height = `${bar.getBoundingClientRect().height + 20}px`
}
