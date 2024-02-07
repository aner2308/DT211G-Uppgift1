"use strict";

//Häntar knapparna för mobilmenyn
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

let languageOpenBtn = document.getElementById("language-menu");
let languageCloseBtn = document.getElementById("language-close");

// Ger knapparna sina funktioner att öppna och stänga.
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    let mySidenavEl = document.getElementById("mySidenav");
    let style = window.getComputedStyle(mySidenavEl);

    if (style.display === "none") {
        mySidenavEl.style.display = "block";
    } else {
        mySidenavEl.style.display = "none";
    }

}

// Länkar knappen till nytt element
let myButtonEl = document.getElementById("myBtn");
myButtonEl.addEventListener('click', topFunction)

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButtonEl.style.display = "block";
  } else {
    myButtonEl.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//UPPGIFT 2!

const url = ('https://webbutveckling.miun.se/files/ramschema_ht23.json');
window.onload = init();

let kurser = [];
const kurserEl = document.getElementById("kurserTabell");

//Kopplar sökrutan till event listener
//Event listenern jämför texten i sökrutan mot texterna i tabellen, och visar dom som matchar.
const searchbarEl = document.getElementById("searchbar");
searchbarEl.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredSearch = kurser.filter(kurs => {
        return kurs.code.toLowerCase().includes(searchString) || kurs.coursename.toLowerCase().includes(searchString)
    });
    kurserEl.innerHTML = "";
    displayCourses(filteredSearch);
});



async function init() {
    try {
        //Fetch-anrop
        const response = await fetch(url);
        kurser = await response.json();

        //Hämtar in den tomma tabellen
        const kurserEl = document.getElementById("kurserTabell");

        //Sorteringar via event handlers
        const kodEl = document.getElementById("kurskod")
        kodEl.addEventListener("click", sortByCode)

        const namnEl = document.getElementById("kursnamn")
        namnEl.addEventListener("click", sortByName)

        const progressionEl = document.getElementById("progression")
        progressionEl.addEventListener("click", sortByProgress)

        //Funktion för att sortera på kurskod
        function sortByCode() {
            kurser.sort((a, b) => (a.code > b.code) ? 1 : -1);
            kurserEl.innerHTML = "";
            displayCourses(kurser);
        }

        //Funktion för att sortera på kursnamn
        function sortByName() {
            kurser.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);
            kurserEl.innerHTML = "";
            displayCourses(kurser);
        }

        //Funktion för att sortera på progression
        function sortByProgress() {
            kurser.sort((a, b) => (a.progression > b.progression) ? 1 : -1);
            kurserEl.innerHTML = "";
            displayCourses(kurser);
        }

        //Loggar för kontroll
        console.table(kurser);

        displayCourses(kurser);
    } catch {
        //Felmeddelande om något inte stämmer
        document.getElementById("error").innerHTML = "<p>Något gick fel...</p>"
    }
}

function displayCourses(kurser) {

    //Hämtar in den tomma tabellen
    const kurserEl = document.getElementById("kurserTabell");

    //Lägger in alla kurser i den tomma tabellen genom en forEach loop
    kurser.forEach((kurs) => {
        kurserEl.innerHTML += `
        <tr>
            <td>${kurs.code}</td>
            <td>${kurs.coursename}</td>
            <td>${kurs.progression}</td>
        </tr>`;
    });
}


