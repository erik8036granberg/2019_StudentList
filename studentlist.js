"use strict";

// vars
let template = document.querySelector("[data-template]");
let container = document.querySelector("[data-container]");
let background = document.querySelector("[data-background]");
let img = document.querySelector("[data-img]");
let students;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
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

  filterStudents();
}

function filterStudents() {
  students.sort(function (a, b) {
    return a.fullname.localeCompare(b.fullname);
  });
  listStudents();
}

//	List students
function listStudents() {

  //	choose template
  let temp = template;

  //	loop
  students.forEach(student => {

    console.log(student);

    //	Klon? please do
    let klon = template.cloneNode(true).content;

    //	insert data into template fields
    klon.querySelector("[data-fullname]").textContent = student.fullname;
    klon.querySelector("[data-house]").textContent = student.house;
    klon.querySelector("[data-img]").setAttribute("alt", student.house + " House Crest");

    //	check for house name and add background color + crest picture
    console.log("house is: " + student.house);

    if (student.house == "Hufflepuff") {
      klon.querySelector(".background").classList.add("hufflepuff");
      klon.querySelector("[data-img]").setAttribute("src", "img/hufflepuff.jpg");
    }

    if (student.house == "Gryffindor") {
      klon.querySelector(".background").classList.add("gryffindor");
      klon.querySelector("[data-img]").setAttribute("src", "img/gryffindor.jpg");
    }

    if (student.house == "Slytherin") {
      klon.querySelector(".background").classList.add("slytherin");
      klon.querySelector("[data-img]").setAttribute("src", "img/slytherin.jpg");
    }

    if (student.house == "Ravenclaw") {
      klon.querySelector(".background").classList.add("ravenclaw");
      klon.querySelector("[data-img]").setAttribute("src", "img/ravenclaw.jpg");
    }

    //	add student to DOM
    container.appendChild(klon);
    console.log("Student added");
  });
}