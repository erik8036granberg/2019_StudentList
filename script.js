"use strict";

let arrayOfStudents = [];
let arrayOfExpelled = [];
let activeArray;
let houseFilter = "All";
let sortBy = "None";

// prototype "template"
const studentPrototype = {
  fullName: "-student name-",
  firstName: "-student firstname-",
  middleName: "-student middlename-",
  lastName: "-student firstname-",
  house: "-student house-",
  crest: "-house crest-",
  image: "-image-",
  expelled: "-expelled-",
  blooodstatus: "-blooodstatus-",
  inquisitorialSquad: "-inquisitorialSquad-",

  setJSONdata(studentData) {
    const firstSpace = studentData.fullname.indexOf(" ");
    const lastSpace = studentData.fullname.lastIndexOf(" ");
    let name = this.fullName;

    this.fullName = studentData.fullname;
    this.firstName = studentData.fullname.substring(0, firstSpace);
    this.middleName =
      " " + studentData.fullname.substring(firstSpace + 1, lastSpace) + " ";
    this.lastName = studentData.fullname.substring(lastSpace + 1);
    this.house = studentData.house;
    this.crest = "img/" + this.house.toLowerCase() + ".jpg";
    this.image =
      "images/" +
      this.firstName.toLowerCase() +
      "_" +
      this.lastName.substring(0, 1).toLowerCase() +
      ".jpg";
    this.expelled = false;
    this.blooodstatus = "?";
    this.inquisitorialSquad = false;
  }
};

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
  let Json = await fetch("http://petlatkea.dk/2019/hogwarts/students.json");
  let students = await Json.json();
  studentObject(students);
}

function studentObject(students) {
  students.forEach(studentData => {
    // create, clone and add studentObject
    const student = Object.create(studentPrototype);
    student.setJSONdata(studentData);
    arrayOfStudents.push(student);
  });
  addIdToStudents();
}

function addIdToStudents() {
  //add unique id to students
  arrayOfStudents.forEach(student => {
    const idMade = makeId(student.fullName);
    student.id = idMade;
  });
  activeArray = arrayOfStudents;
  filterStudents(houseFilter);
}

function makeId(input) {
  let idMade = "";
  for (let i = 0; i < input.length; i++) {
    idMade += input[i].charCodeAt(0);
  }
  return idMade.substring(0, 7);
}

function expelStudent(badStudentId) {
  //set expel-status to true
  let objIndex = arrayOfStudents.findIndex(obj => obj.id == badStudentId);
  arrayOfStudents[objIndex].expelled = true;

  let expelledStudent = arrayOfStudents[objIndex];
  arrayOfExpelled.push(expelledStudent);

  console.log(arrayOfExpelled);

  //remove student from display
  arrayOfStudents = arrayOfStudents.filter(function(el) {
    return el.expelled === false;
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

  activeArray.forEach(student => {
    console.log(student);
    let clone = template.content.cloneNode(true);

    let house_low = student.house;
    house_low = house_low.toLowerCase();

    clone.querySelector("[data-id]").textContent = student.id;
    clone.querySelector("[data-firstname]").textContent = student.firstName;
    clone.querySelector("[data-middlename]").textContent = student.middleName;
    clone.querySelector("[data-lastname]").textContent = student.lastName;
    clone.querySelector("[data-house]").textContent = student.house;
    clone.querySelector("[data-img]").setAttribute("alt", student.house);
    clone
      .querySelector("[data-img]")
      .setAttribute("src", "img/" + house_low + ".jpg");
    clone.querySelector(".background").classList.add(house_low);

    clone.querySelector(".expel").addEventListener("click", () => {
      expelStudent(student.id);
    });

    container.appendChild(clone);
  });
}

// Toto: remove expeled student from list
// Put expeled student to "expelled" list
