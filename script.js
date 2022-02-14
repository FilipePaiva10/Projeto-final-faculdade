const server = "https://api.thingspeak.com"
const lightControl = window.document.getElementById("light");
const url = `${server}/channels/1603270/feeds.json?results=2`;

const getResults = async () => {
    try {

        let res = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        updateLight(await res.json());
    } catch (e) {
        console.log(e);
    }
}


function updateLight(arr) {

    if (arr.feeds[0].field2 <= 10) {
        lightControl.style.boxShadow = `0px 0px 0px yellow`;
        lightControl.style.backgroundColor = 'transparent';
        lightControl.style.opacity = '0';
    } else {
        lightControl.style.boxShadow = `0px 0px ${Math.floor(arr.feeds[0].field2 / 5)}px yellow`;
        lightControl.style.backgroundColor = 'rgb(243, 243, 168)';
        lightControl.style.opacity = '1';
    }
}



setInterval(() => {
    getResults();
}, 1500);

