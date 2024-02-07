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

async function init(){
    try {
        const response = await fetch(url);
        let kurser = await response.json();

        console.table(kurser);
    } catch {
        document.getElementById("error").innerHTML = "<p>Något gick fel...</p>"
    }
}