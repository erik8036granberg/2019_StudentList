"use strict";

let students;
let student;
let arrayOfStudents = [];
let filteredArray;
let houseFilter = "All";

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    document.querySelector("#all").addEventListener("click", filterAll);
    document.querySelector("#hufflepuff").addEventListener("click", filterHufflepuff);
    document.querySelector("#gryffindor").addEventListener("click", filterGryffindor);
    document.querySelector("#ravenclaw").addEventListener("click", filterRavenclaw);
    document.querySelector("#slytherin").addEventListener("click", filterSlytherin);
    getJson();
}

//	get json
async function getJson() {
    let Json = await fetch("students.json");
    students = await Json.json();
    console.log(students);
    studentObject();
}

function studentObject() {
    // prototype "template"
    let studentPrototype = {
        fullName: "-student name-",
        firstName: "-student firstname-",
        middleName: "-student middlename-",
        lastName: "-student firstname-",
        house: "-student house-",

        setJSONdata(studentData) {
            const firstSpace = studentData.fullname.indexOf(" ");
            const lastSpace = studentData.fullname.lastIndexOf(" ");

            this.fullName = studentData.fullname;
            this.firstName = studentData.fullname.substring(0, firstSpace);
            this.middleName = studentData.fullname.substring(firstSpace + 1, lastSpace);
            this.lastName = studentData.fullname.substring(lastSpace + 1);
            this.house = studentData.house;
        }
    };

    students.forEach(studentData => {
        // create, clone and add studentObject
        student = Object.create(studentPrototype);
        student.setJSONdata(studentData);
        arrayOfStudents.push(student);
    });
    filterStudents(houseFilter);
}

function filterAll() {
    houseFilter = "All";
    filterStudents(houseFilter);
}

function filterHufflepuff() {
    houseFilter = "Hufflepuff";
    filterStudents(houseFilter);
}

function filterGryffindor() {
    houseFilter = "Gryffindor";
    filterStudents(houseFilter);
}

function filterRavenclaw() {
    houseFilter = "Ravenclaw";
    filterStudents(houseFilter);
}

function filterSlytherin() {
    houseFilter = "Slytherin";
    filterStudents(houseFilter);
}

function filterStudents(houseFilter) {
    if (houseFilter === "All") {
        sortStudents(arrayOfStudents);
    } else {
        filteredArray = arrayOfStudents.filter(function (student) {
            return student.house === houseFilter;
        });
        sortStudents(filteredArray);
    }
}

function sortStudents(inputArray) {
    // todo - fix buttons/functions for sort

    //	sort by firstName
    inputArray.sort(function (a, z) {
        return a.firstName.localeCompare(z.firstName);
    });

    //	sort by middleName
    inputArray.sort(function (a, z) {
        return a.middleName.localeCompare(z.middleName);
    });

    //	sort by lastName
    inputArray.sort(function (a, z) {
        return a.lastName.localeCompare(z.lastName);
    });

    //	sort by house
    inputArray.sort(function (a, z) {
        return a.house.localeCompare(z.house);
    });

    displayStudents(inputArray);
}

function displayStudents(inputArray) {
    console.log("displayList");

    let template = document.querySelector("[data-template]");
    let container = document.querySelector("[data-container]");
    let background = document.querySelector("[data-background]");

    container.innerHTML = "";

    //	loop
    inputArray.forEach(student => {
        console.log(student);
        let clone = template.content.cloneNode(true);

        //	crest to lowercase for correct names
        let house_low = student.house;
        house_low = house_low.toLowerCase();
        console.log("house_low er: " + house_low);

        //	insert data into template fields & add background color + crest picture
        clone.querySelector("[data-fullname]").textContent = student.fullName;
        clone.querySelector("[data-house]").textContent = student.house;
        clone.querySelector("[data-img]").setAttribute("alt", student.house);
        clone.querySelector("[data-img]").setAttribute("src", "img/" + house_low + ".jpg");
        clone.querySelector(".background").classList.add(house_low);

        //	add student to DOM
        container.appendChild(clone);
    });
}