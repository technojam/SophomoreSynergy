document.addEventListener("DOMContentLoaded", () => {
  const cardAdder = document.querySelector(".card-container");
  const droptoshow = document.querySelector(".drop");
  const dropelem = document.querySelector(".dropdown");
  const region = document.querySelectorAll(".region");
  const search = document.querySelector(".searcharea");
  const mode = document.querySelector(".mode");
  const searchbar = document.querySelector(".search-bar");
  const searcharea = document.querySelector(".searcharea");
 

  async function getcountry() {
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    console.log(res);
    const countriesToShow = res.slice(0,);
    countriesToShow.forEach((element) => {
      showcountry(element);
    });
  }

  function showcountry(data) {
    const country = document.createElement("div");
    country.classList.add("country");
    country.innerHTML = `
      <div class="flag-container">
        <img src="${data.flags.png}" alt="">
      </div>
      <div class="country-container">
        <h4 class="countryname">${data.name.common}</h4>
        <span><strong>Population:</strong>${data.population}</span>
        <span class="regionname"><strong>Region:</strong>${data.region}</span>
        <span><strong>Capital:</strong>${data.capital}</span>
      </div>`;
    cardAdder.appendChild(country); // Append the country element inside the showcountry function
    country.addEventListener("click",()=>{
      showcountrydetails(data)
    })
  
  
  }

  getcountry();

  dropelem.addEventListener("click", () => {
    droptoshow.classList.toggle("showdropdown");
  });
  const regionname = document.getElementsByClassName("regionname");
  region.forEach((element) => {
    element.addEventListener("click", () => {
      Array.from(regionname).forEach(elem =>{
        if(elem.innerText.includes(element.innerText) || element.innerText == "All")
        {
          elem.parentElement.parentElement.style.display="grid"
        }
        else
        {
          elem.parentElement.parentElement.style.display="none"
        }
      })
    });
  });
  const countryname = document.getElementsByClassName("countryname");
  search.addEventListener("input",()=>{
    Array.from(countryname).forEach(elem =>{
      if(elem.innerText.toLowerCase().includes(search.value.toLowerCase()))
      {
        elem.parentElement.parentElement.style.display="grid"
      }
      else
      {
        elem.parentElement.parentElement.style.display="none"
      }
    })
  })

  mode.addEventListener("click",()=>{
    document.body.classList.toggle("light");
    
  })
});

const countrymodle=document.querySelector(".countrymodle")

function showcountrydetails(data){
  if (!data || !data.name || !data.name.common) {
    console.error("Invalid data format:", data);
    return;
  }


  countrymodle.classList.toggle("show")
  countrymodle.innerHTML=`
  <div class="container-2">
  <button class="back">Back</button>
</div>
<div class="data-container">
  <div class="flag-container-details">
      <img src="${data.flags.png}" alt="">
  </div>
  <div class="country-data">
      <h4>${data.name.common}</h4>
      <div class="data">
          <span><strong>Native Name :</strong>${data.name}</span>
          <span><strong>Population :</strong>${data.population}</span>
          <span><strong>Region :</strong>${data.name}</span>
          <span><strong>Sub-region :</strong>${data.subregion}</span>
          <span><strong>Capital :</strong>${data.capital}</span>
          <span><strong>Currencies :</strong>${data.currencies.XPF.name}</span>
          <span><strong>Languages :</strong>${data.languages.fra}</span>
      </div>
      <div class="footer">
          <strong>Border Countries: </strong>
          ${Array.isArray(data.borders) && data.borders.length > 0
            ? data.borders.map((border) => `<span>${border}</span>`).join("")
            : "N/A"}
      </div>
  </div>
</div>
  `
  const back=countrymodle.querySelector(".back")
  back.addEventListener("click",()=>{
    countrymodle.classList.toggle("show")
  })
}
