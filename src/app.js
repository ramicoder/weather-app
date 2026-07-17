import "./styles.css";

import "./styles.css";


async function getData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=HGJ4HFVFYRFL3SUXDF6ZEHXVW&contentType=json`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.error("Fetch operation failed: ", error);
    }
}

getData("Erbil").then(data => {
    console.log(processData(data));
});

function processData(data) {
        const datetime = data.currentConditions.datetime;
        const humidity = data.currentConditions.humidity;
        const temp = data.currentConditions.temp;

        return { datetime, humidity, temp };
}

