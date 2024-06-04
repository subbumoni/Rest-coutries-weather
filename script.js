const itemsPerPage = 9;
let currentPage = 1;

async function fetchCountryData() {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const countryData = await response.json();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = countryData.slice(startIndex, endIndex);

    console.log(paginatedData);
    displayCountries(paginatedData);
    displayPagination();
  } catch (error) {
    console.error("An error occurred while fetching countries:", error);
  }
}

function displayCountries(countryData) {
  const appendDetails = document.getElementById("appendDetails");
  appendDetails.innerHTML = "";

  for (let i = 0; i < countryData.length; i++) {
    let country = countryData[i].name.common;
    appendDetails.innerHTML += `
            <div class="card mt-3" style="width:20rem">
                 <div class="card-body">
                 <div class="card-header text-center">
                 <h5 class="card-title text-center" ><b>${countryData[
                   i
                 ].name.common.toUpperCase()}</b></h6>
                 <img class="title-image mt-2" style="width:10rem" src="${
                   countryData[i].flags.png
                 }" alt="Flag of ${countryData[i].name.common}">
                 </div>
                 <div class="card-body text-center">
                 <p class="body-text" mt-2><b>Capital : ${
                   countryData[i].capital
                 }</b></p>
                 <p class="body-text"><b>Region : ${
                   countryData[i].region
                 }</b></p>
                 <p class="body-text"><b>Country Code : ${
                   countryData[i].altSpellings[0]
                 }</b></p>
                 <p class="body-text" id="weatherApp_${i}"><b></b></p>
                 </div>
                 <div class="card-footer text-center mt-3">
                 <button type="button" class="card-btn rounded mt-2 align-center " onclick="weatherUpdate('${country}', ${i})">Click For Weather </button>
                 </div></div></div></div>
            `;
  }
}

function displayPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";
  paginationContainer.innerHTML += `
        <div class="pagination mt-3">
            <button onclick="previousPage()">Previous</button>
            <span>Page ${currentPage}</span>
            <button onclick="nextPage()">Next</button>
        </div>`;
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchCountryData();
  }
}

function nextPage() {
  currentPage++;
  fetchCountryData();
}

fetchCountryData();

async function weatherUpdate(country, index) {
  try {
    const a = country.split(",");
    const response =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a[0]}&appid=73dcf49d1b9bfd3a5546d1196ad82cec
        `);
    const data = await response.json();
    let weatherInfo = `Weather is ${data.weather[0].main} and temperature is ${data.main.temp}`;
    return (document.getElementById(
      `weatherApp_${index}`
    ).innerHTML = `<b>${weatherInfo}</b>`);
  } catch (error) {
    console.error("An error occurred while getting weather update:", error);
  }
}

fetchCountryData();
