const searchButton = document.querySelector("form");
const weatherForecast = document.querySelector(".output");

searchButton.addEventListener("submit", (event) => {
  event.preventDefault();
  weatherForecast.innerHTML = `
  <h1>Loading....</h1>
  `;
  const address = document.querySelector("input").value;
  const URL = `http://localhost:3000/weather?address=${address}`;
  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        console.log(data.error);
        weatherForecast.innerHTML = `
          <h1> ${data.error} </h1>
          `;
      } else {
        weatherForecast.innerHTML = `
        <h1> ${data.location} </h1>
        <h2> ${data.forecast} </h2>
        `;
      }
    });
});


