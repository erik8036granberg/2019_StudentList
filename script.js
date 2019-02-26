"use strict";

let students;
let student;
const arrayOfStudents = [];
let activeArray;
let houseFilter = "All";
let sortBy = "None";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector("#all").addEventListener("click", filterAll);
  document
    .querySelector("#hufflepuff")
    .addEventListener("click", filterHufflepuff);
  document
    .querySelector("#gryffindor")
    .addEventListener("click", filterGryffindor);
  document
    .querySelector("#ravenclaw")
    .addEventListener("click", filterRavenclaw);
  document
    .querySelector("#slytherin")
    .addEventListener("click", filterSlytherin);
  document.querySelector("#firstname").addEventListener("click", sortFirstName);
  document.querySelector("#lastname").addEventListener("click", sortLastName);
  document.querySelector("#house").addEventListener("click", sortHouse);
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
  const studentPrototype = {
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
      this.middleName = studentData.fullname.substring(
        firstSpace + 1,
        lastSpace
      );
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
  activeArray = arrayOfStudents;
  filterStudents(houseFilter);
}

function filterAll() {
  houseFilter = "All";
  activeArray = arrayOfStudents;
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
    activeArray = arrayOfStudents.filter(function(student) {
      return student.house === houseFilter;
    });
    sortStudents();
  }
}

function sortFirstName() {
  sortBy = "firstName";
  sortStudents();
}

function sortLastName() {
  sortBy = "lastName";
  sortStudents();
}

function sortHouse() {
  sortBy = "house";
  sortStudents();
}

function sortStudents() {
  if (sortBy === "None") {
    displayStudents();
  }
  if (sortBy === "firstName") {
    activeArray.sort(function(a, z) {
      if (a.firstName < z.firstName) {
        return -1;
      } else {
        return 1;
      }
    });
    displayStudents();
  }
  if (sortBy === "lastName") {
    activeArray.sort(function(a, z) {
      if (a.lastName < z.lastName) {
        return -1;
      } else {
        return 1;
      }
    });
    displayStudents();
  }
  if (sortBy === "house") {
    activeArray.sort(function(a, z) {
      if (a.house < z.house) {
        return -1;
      } else {
        return 1;
      }
    });
    displayStudents();
  }
}

function displayStudents() {
  console.log("displayList");

  const template = document.querySelector("[data-template]");
  const container = document.querySelector("[data-container]");
  const background = document.querySelector("[data-background]");

  container.innerHTML = "";

  //	loop
  activeArray.forEach(student => {
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
    clone
      .querySelector("[data-img]")
      .setAttribute("src", "img/" + house_low + ".jpg");
    clone.querySelector(".background").classList.add(house_low);

    //	add student to DOM
    container.appendChild(clone);
  });
}

// Toto: remove expeled student from list
// Put expeled student to "expelled" list
