import "./styles.css";

const content = document.querySelector(".content");
const card = document.querySelector(".card");
const form = document.querySelector("form");
const input = document.querySelector("input");
const error = document.querySelector(".error");
const button = document.querySelector("button");
const regex = /^[a-zA-Z ]+$/;
let tempUnit = "C°";

input.addEventListener("input", () => {
  if (!regex.test(input.value)) {
    showError();
    button.disabled = true;
  } else {
    button.disabled = false;
    error.textContent = "";
    error.style.display = "none";
    input.classList.remove("invalid");
  }
});

form.addEventListener("submit", (e) => {
  console.log("submitting...");
  e.preventDefault();
  getData(input.value)
    .then((data) => {
      renderUI(
        processData(data).datetime,
        processData(data).temp,
        processData(data).humidity,
      );
    })

    .catch((err) => {
      alert(err.message);
    });
});

async function getData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=HGJ4HFVFYRFL3SUXDF6ZEHXVW&contentType=json`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch operation failed: ", error);
    throw new Error("No such location... Enter a valid location.");
  }
}

function processData(data) {
  const datetime = data.currentConditions.datetime;
  const temp = data.currentConditions.temp;
  const humidity = data.currentConditions.humidity;

  return { datetime, temp, humidity };
}

function renderUI(time, temp, humidity) {
  card.innerHTML = "";
  let timeText = document.createElement("p");
  timeText.textContent = `Time: ${time}`;
  let tempText = document.createElement("p");
  tempText.textContent = `Temperature: ${temp}${tempUnit}`;
  let humidityText = document.createElement("p");
  humidityText.textContent = `Humidity: ${humidity}%`;

  card.appendChild(timeText);
  card.appendChild(tempText);
  card.appendChild(humidityText);

  content.appendChild(card);

  let tempSwitch = document.createElement("button");
  tempSwitch.textContent = "Fehrenheit?";
  tempSwitch.classList.add("tempButton");
  tempSwitch.addEventListener("click", () => {
    if (tempUnit === "C°") {
      tempUnit = "F°";
      tempText.textContent = `Temperature: ${((temp * 9) / 5 + 32).toFixed(1)}${tempUnit}`;
      tempSwitch.textContent = "Celcius?";
    } else {
      tempUnit = "C°";
      tempText.textContent = `Temperature: ${temp}${tempUnit}`;
      tempSwitch.textContent = "Fehrenheit?";
    }
  });
  content.append(tempSwitch);
  content.style.visibility = "visible";
}

function showError() {
  input.classList.add("invalid");
  error.style.display = "block";
  error.textContent = "Anything other than letters is not allowed :(";
}
