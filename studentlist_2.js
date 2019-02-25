"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    document.querySelector("button_sortByFirst").addEventListener("click", sortByFirst);
    getJson();
}

//	get json
async function getJson() {
    console.log("getJson");

    //	get jsonData content
    let jsonData = await fetch("students.json");

    students = await jsonData.json();

    //	test json-import
    console.log(students);
}