import "./styles.css";

import "./styles.css";


async function getDate(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=HGJ4HFVFYRFL3SUXDF6ZEHXVW&contentType=json`
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error("`HTTP error! Status: ${response.status}`");
        }
        console.log(data);
    } catch(error) {
        console.error("Fetch operation failed.", error);
    }
}

getDate("baghdad");