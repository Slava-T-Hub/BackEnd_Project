// *************************************burger active*******
document.querySelector(".burger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector("#navMenu").classList.toggle("open");
});
var menuItems = document.querySelectorAll("#navMenu a");
menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      document.querySelector(".burger").classList.remove("active");
      document.querySelector("#navMenu").classList.remove("open");
    }
  });
});
// *****************************progressBarContainer********
window.onscroll = function () {
  updateProgressBar();
};

function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}
// *******************************************filterNavigate********

function navigate() {
  let select = document.getElementById("continent");
  let selectedOption = select.options[select.selectedIndex].value;

  if (selectedOption) {
    window.location.href = selectedOption;
  }
}
// *******************************************sort********

allCountriesArr.sort((a, b) => {
  if (a.name.common < b.name.common) {
    return -1;
  }
  if (a.name.common > b.name.common) {
    return 1;
  }
  return 0;
});
// *******************************************countryInput********

function regionChoise() {
  let select = document.getElementById("region");
  let selectedOption = select.options[select.selectedIndex].value;

  let nameStr = `<option value="" disabled selected hidden>Country</option>`;
  for (const nameOfCountry of allCountriesArr) {
    if (selectedOption === nameOfCountry.region) {
      nameStr += `<option style="color: black;"> ${nameOfCountry.name.common} </option>`;
    }
  }
  document.querySelector("#searchCountry").innerHTML = nameStr;
}
// *******************************************get********
fetch("/getAllTravelInfo")
  .then((response) => response.json())
  .then((data) => {
    const travelInfoContainer = document.getElementById("chat");

    data.forEach((travel) => {
      const travelElement = document.createElement("div");

      travelElement.innerHTML = `<div class="userPost">
    <p><strong>Name: </strong>${travel.Name}</p>
    <p><strong>Region: </strong> ${travel.Region}</p>
    <p><strong>Country: </strong> ${travel.Country}</p>
    <p><strong>Type of Travel: </strong> ${travel.TypeOfTravel}</p>
    <p><strong>Season: </strong> ${travel.Season}</p><hr>
    <p><strong>Description: </strong><br> ${travel.DescriptionOfTravel}</p><hr>
    <p><strong>How to get: </strong><br> ${travel.HowToGet}</p><hr>
    <p><strong>Where to stay: </strong><br> ${travel.WhereToStay}</p><hr>                   
    </div>
    `;
      travelInfoContainer.appendChild(travelElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching travel data:", error);
  });

// *******************************************getAdmin********

async function fetchTravelData() {
  try {
    const response = await fetch("/GetUpTravelDataById");
    if (!response.ok) {
      throw new Error("Failed to fetch travel data");
    }
    const travels = await response.json();

    const allTravelsDiv = document.getElementById("allTravels");
    allTravelsDiv.innerHTML = "";

    travels.forEach((travel) => {
      const travelHTML = `<div id="cardBox">

              <a class="button" href="#">
              <img src="${travel.photoUrl}" alt="${travel.nameOfPlaceUp}" />
              <h5>${travel.nameOfPlaceUp}</h5>
              </a>
              </div>`;
      allTravelsDiv.innerHTML += travelHTML;
    });
  } catch (error) {
    console.error("Error fetching travel data:", error);
  }
}

fetchTravelData();

/*<div class="travel-item">
            <h2>${travel.nameOfPlaceUp}</h2>
            <p><strong>Region:</strong> ${travel.regionUp}</p>
            <p><strong>Country:</strong> ${travel.countryUp}</p>
            <p><strong>Type of Travel:</strong> ${travel.typeOfTravelUp}</p>
            <p><strong>Season:</strong> ${travel.seasonUp}</p>
            <p><strong>Description:</strong> ${travel.descriptionUp}</p>
            <p><strong>How to Get There:</strong> ${travel.howToGetThereUp}</p>
            <p><strong>Where to Stay:</strong> ${travel.whereToStayForTheNightUp}</p>
            <p><strong>Travel Date:</strong> ${travel.UpTravelDate}</p>
            <img src="${travel.photoUrl}" alt="${travel.nameOfPlaceUp}" />
          </div>*/
