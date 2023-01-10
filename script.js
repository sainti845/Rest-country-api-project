const search = document.querySelector('input[type="text"]');
const filter = document.querySelector(".filter");
const dark = document.querySelector(".dark-mode");
const options = document.querySelector(".options");
const countriesCollection = document.querySelector(".countries-collection");
const region = document.querySelectorAll(".region");
const main = document.querySelector(".main");
const innerPage = document.querySelector(".inner-page");
const contaiiner = document.querySelector(".contaiiner");
const cardBody = document.querySelector(".card-body");
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
const countrySpecific = document.querySelector(".country-specific");

let a = 0;

///////back function /////////

const back = document.querySelector(".back");
back.addEventListener("click", () => {
  console.log("heello");
  main.classList.toggle("hidden");
  countriesCollection.classList.toggle("hidden");
  innerPage.classList.toggle("hidden");
});

/////////fetching data using api//////////////////
async function getCountry() {
  const url = await fetch("https://restcountries.com/v3.1/all");
  const res = await url.json();
  console.log(res);
  res.forEach((element) => {
    createCountry(element);
    // console.log(element);
  });
}
getCountry();
//////////creating country using card//////
function createCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = ` <div class="card border-0" >
    <img src="${data.flags.png}" class="card-img-top img-fluid" alt="...">
    <div class="card-body " id="cardbody">
      <h2 class="card-title countryName fs-4 " >${data.name.official}</h2>
      <p class="card-text my-1 fs-6"><strong> Population : </strong>${data.population}</p>
      <p class="card-text my-1 fs-6 regionName"><strong>Region : </strong>${data.region}</p>
      <p class="card-text my-1 fs-6"><strong>Capital : </strong>${data.capital}</p>
     
    </div>
  </div>`;
  countriesCollection.appendChild(country);
  country.addEventListener("click", () => {
    countriesCollection.classList.add("hidden");
    main.classList.add("hidden");
    showCountryDetails(data);
  });
}

///////////filter by region option/////////////
filter.addEventListener("click", () => {
  options.classList.toggle("hidden");
});

region.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element);

    Array.from(regionName).forEach((elem) => {
      console.log(elem.innerText);
      if (elem.innerText.includes(element.innerText)) {
        elem.parentElement.parentElement.parentElement.style.display = "grid";
      } else {
        elem.parentElement.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

/////////dark mode///////////////
dark.addEventListener("click", () => {
  if (a === 0) {
    a = 1;
  // cardBody.classList.add("ayush");
    countriesCollection.style.backgroundColor = " hsl(207, 26%, 17%)";
    innerPage.style.backgroundColor = "hsl(207, 26%, 17%)";
    // cardBody.style.backgroundColor= "hsl(209, 23%, 22%) !important";
    main.style.backgroundColor = " hsl(207, 26%, 17%)";
    contaiiner.style.backgroundColor = " hsl(209, 23%, 22%)";
    filter.style.backgroundColor = " hsl(209, 23%, 22%)";
    search.style.backgroundColor = " hsl(209, 23%, 22%)";
    options.style.color = " hsl(0, 0%, 98%)";
    contaiiner.style.color = " hsl(0, 0%, 98%)";
    filter.style.color = " hsl(0, 0%, 98%)";
    innerPage.style.color = " hsl(0, 0%, 98%)";
  } else {
    a = 0;

    countriesCollection.style.backgroundColor = " hsl(0, 0%, 98%)";
    contaiiner.style.boxShadow = " 0 0 5px grey ";
    innerPage.style.backgroundColor = " hsl(0, 0%, 98%)";
    contaiiner.style.backgroundColor = " unset";

    search.style.backgroundColor = " hsl(0, 0%, 98%)";
    filter.style.backgroundColor = " hsl(0, 0%, 98%)";
    contaiiner.style.color = "unset";
    filter.style.color = "unset";
    options.style.color = "unset";
    innerPage.style.color = "unset";

    main.style.backgroundColor = " hsl(0, 0%, 98%)";
   
  }
});

/////////////////search option/////////////////
search.addEventListener("input", (e) => {
  e.preventDefault();
  console.log(search.value);

  Array.from(countryName).forEach((elem) => {
    console.log(elem.innerText);
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.parentElement.style.display = "grid";
    } else {
      elem.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});

////////show country function////////////
function showCountryDetails(data) {
  console.log(data);
  const cur = Object.values(data.currencies);
  const lang = Object.values(data.languages);
  console.log(cur, "jd");
  console.log(lang.join(","));

  innerPage.classList.toggle("hidden");

  countrySpecific.innerHTML='';
  countrySpecific.innerHTML = `
 
    <div class="left">
      <img src="${data.flags.svg}" class="" alt="" />
    </div>
    <div class="right">
      <h1 class="fs-3">${data.name.official}</h1>
      <section class="right-inner">
        <div class="right-left">
          <p class="card-text my-1 fs-6">
            <strong>Native Name: </strong>${data.name.common}
          </p>
          <p class="card-text my-1 fs-6 regionName">
            <strong>Population: </strong>${data.population}
          </p>
          <p class="card-text my-1 fs-6">
            <strong>Region: </strong>${data.region}
          </p>
          <p class="card-text my-1 fs-6">
            <strong>Sub Region: </strong>${data.subregion}
          </p>
          <p class="card-text my-1 fs-6">
            <strong>Capital: </strong>${data.capital}
          </p>
        </div>
        <div class="right-right">
          <p class="card-text my-1 fs-6">
            <strong>Top Level Domain: </strong>${data.tld}
          </p>
         
          <p class="card-text my-1 fs-6">
        
            <strong>Currencies: </strong>${cur
              .map((item) => item.name)
              .join(",")}
          </p>
          <p class="card-text my-1 fs-6">
            <strong>Languages: </strong>${lang.join(",")}
          </p>
        </div>
      </section>
      <p class="card-text my-1 mx-1 fs-6">
            <strong>Borders: </strong>${data.borders?data.borders.join(","):'NO BORDER SHARING'}
          </p>
    </div>
 `;
}
