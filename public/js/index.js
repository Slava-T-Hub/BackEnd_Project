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
