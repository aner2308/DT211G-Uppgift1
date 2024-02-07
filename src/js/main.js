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

//UPPGIFT 2!

const url = ("../ramschema_ht23.json");
window.onload = init();

//Sorteringar via event handlers
const kodEl = document.getElementById("kurskod")
kodEl.addEventListener("click", sortByCode)

const namnEl = document.getElementById("kursnamn")
namnEl.addEventListener("click", sortByName)

const progressionEl = document.getElementById("progression")
progressionEl.addEventListener("click", sortByProgress)


async function init() {
    try {
        //Fetch-anrop
        const response = await fetch(url);
        let kurser = await response.json();

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

function sortByCode() {
    console.log("Du vill sortera på kod")
}

function sortByName() {
    console.log("Du vill sortera på namn")
}

function sortByProgress() {
    console.log("Du vill sortera på progression")
}