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
    let jsonData = await fetch("students1991.json");

    students = await jsonData.json();

    //	test json-import
    console.log(students);

    sortList();
}

function sortList() {
    console.log("sortList");
    filterList();
};

function filterList() {
    console.log("filterList");
    displayList();
};

function displayList() {
    console.log("filterList");
};

function sortByFirst() {
    console.log("sortByFirst");
    students.sort(function (a, b) {
        return a.fullname.localeCompare(b.fullname);
    });
};

function sortByLast() {
    console.log("sortByLast");
};

function sortByHouse() {
    console.log("sortByHouse");
};

function filterByGryffindor() {
    console.log("filterByGryffindor");
};

function filterByHufflepuff() {
    console.log("filterByHufflepuff");
};

function filterByRavenclaw() {
    console.log("filterByRavenclaw");
};

function filterBySlytherin() {
    console.log("filterBySlytherin");
};

function openDetails() {
    console.log("openDetails");
};

function closeDetails() {
    console.log("closeDetails");
};