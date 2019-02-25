"use strict";

let students;
let student;
// output array
let arrayOfStudents = [];
let displayFilter = "all";

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

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    getJson();
    // document.querySelector("Hufflepuff").addEventListener("click", filterButton);
}

//	get json
async function getJson() {
    let Json = await fetch("students.json");
    students = await Json.json();
    console.log(students);
    studentObject();
}

function studentObject() {
    students.forEach(studentData => {
        // create new object via prototype
        student = Object.create(studentPrototype);
        // "clone" data from each object
        student.setJSONdata(studentData);
        // add object to output array
        arrayOfStudents.push(student);
    });

    filterStudents();
}

function filterStudents() {
    console.log("init");

    if (displayFilter === "all") {
        displayStudents(arrayOfStudents);
    }

    // let Hufflepuffs = arrayOfStudents.filter(function (student) {
    //     return student.house === "Hufflepuff";
    // });
    // console.log(Hufflepuffs);
    // displayStudents(Hufflepuffs);
}

function displayStudents(inputArray) {
    console.log("displayList");

    let template = document.querySelector("[data-template]");
    let container = document.querySelector("[data-container]");
    let background = document.querySelector("[data-background]");

    //	loop
    inputArray.forEach(student => {
        console.log(student);

        //	Klon? please do
        let klon = template.cloneNode(true).content;

        //	crest to lowercase for correct names
        let house_low = student.house;
        house_low = house_low.toLowerCase();
        console.log("house_low er: " + house_low);

        //	insert data into template fields & add background color + crest picture
        klon.querySelector("[data-fullname]").textContent = student.fullName;
        klon.querySelector("[data-house]").textContent = student.house;
        klon.querySelector("[data-img]").setAttribute("alt", student.house);
        klon.querySelector("[data-img]").setAttribute("src", "img/" + house_low + ".jpg");
        klon.querySelector(".background").classList.add(house_low);

        //	add student to DOM
        container.appendChild(klon);
        console.log("Student added");
    });
}