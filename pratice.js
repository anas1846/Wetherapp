const newinput = document.querySelector(".input");
const newsearch = document.querySelector(".search");
const newsummer = document.querySelector(".summer");
const newspeed = document.querySelector(".speed");
const newdegree = document.querySelector(".degree");
const newtem = document.querySelector(".temp");
const newcity = document.querySelector(".city");

newsearch.addEventListener("click", () => {
  const cityname = newinput.value.trim();

  if (cityname === "") {
    alert("Enter the city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=2c1fc834c82eb429d05d8ce073f82d58&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      // Image logic
      if (data.main.temp <= 10) {
        newsummer.src = "winter.png";
      } else if(data.main.temp <= 20){
        newsummer.src = "rain.png";
      }else if(data.main.temp <= 30){
        newsummer.src = "summer.png";
      }
      else if(data.main.temp <= 50){
        newsummer.src = "clear.png";
      }

      newtem.innerHTML = `${Math.round(data.main.temp)}°C`;
      newcity.innerHTML = data.name.toUpperCase();
      newdegree.innerHTML = `${data.main.humidity}%`;
      newspeed.innerHTML = `${data.wind.speed} km/h`;
    })
    .catch(error => {
      alert(error.message);
    });
});