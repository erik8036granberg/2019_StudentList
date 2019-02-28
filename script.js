"use strict";

let arrayOfStudents = [];
let arrayOfExpelled = [];
let showexpelled = false;
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
    this.image = "images/" + this.lastName.toLowerCase() + "_" +
      this.firstName.substring(0, 1).toLowerCase() + ".png";
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

  document.querySelector("#expelled").addEventListener("click", expelledButton);
  document.querySelector("#enrolled").addEventListener("click", enrolledButton);
}

//	get json
async function getJson() {
  let Json = await fetch("students.json");
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
  filterStudents();
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
  arrayOfExpelled.unshift(expelledStudent);

  console.log(arrayOfExpelled);

  //remove student from display
  arrayOfStudents = arrayOfStudents.filter(function (el) {
    return el.expelled === false;
  });
  activeArray = arrayOfStudents;
  filterStudents();
}

function enrolledButton() {
  activeArray = arrayOfStudents;
  showexpelled = false;
  document.querySelector("#enrolled").classList.remove("statusoff");
  document.querySelector("#expelled").classList.remove("statuson");
  document.querySelector("#expelled").classList.add("statusoff");
  filterStudents();
}

function expelledButton() {
  activeArray = arrayOfExpelled;
  showexpelled = true;
  document.querySelector("#expelled").classList.add("statuson");
  document.querySelector("#enrolled").classList.remove("statuson");
  document.querySelector("#enrolled").classList.add("statusoff");

  filterStudents();
}

function filterAll() {
  houseFilter = "All";
  if (showexpelled == false) {
    activeArray = arrayOfStudents;
    filterStudents();
  } else {
    activeArray = arrayOfExpelled;
  }
  filterStudents();
}

function filterHufflepuff() {
  houseFilter = "Hufflepuff";
  filterStudents();
}

function filterGryffindor() {
  houseFilter = "Gryffindor";
  filterStudents();
}

function filterRavenclaw() {
  houseFilter = "Ravenclaw";
  filterStudents();
}

function filterSlytherin() {
  houseFilter = "Slytherin";
  filterStudents();
}

function filterStudents() {
  if (showexpelled == false) {
    if (houseFilter === "All") {
      sortStudents(arrayOfStudents);
    } else {
      activeArray = arrayOfStudents.filter(function (student) {
        return student.house === houseFilter;
      });
      sortStudents();
    }
  } else {
    if (houseFilter === "All") {
      sortStudents(arrayOfExpelled);
    } else {
      activeArray = arrayOfExpelled.filter(function (student) {
        return student.house === houseFilter;
      });
      sortStudents();
    }
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
    activeArray.sort(function (a, z) {
      if (a.firstName < z.firstName) {
        return -1;
      } else {
        return 1;
      }
    });
    displayStudents();
  }
  if (sortBy === "lastName") {
    activeArray.sort(function (a, z) {
      if (a.lastName < z.lastName) {
        return -1;
      } else {
        return 1;
      }
    });
    displayStudents();
  }
  if (sortBy === "house") {
    activeArray.sort(function (a, z) {
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
    console.log("dislay list");
    console.log(activeArray);
    let clone = template.content.cloneNode(true);

    //indsætter eventlistner på article-class
    clone.querySelector(".student_name").addEventListener("click", () => {
      showModal(student);
    });

    clone.querySelector("[data-firstname]").textContent = student.firstName;
    clone.querySelector("[data-middlename]").textContent = student.middleName;
    clone.querySelector("[data-lastname]").textContent = student.lastName;
    clone.querySelector("[data-house]").textContent = student.house;
    clone.querySelector("[data-crest]").src = student.crest;

    if (student.expelled === false) {
      clone.querySelector(".expel").addEventListener("click", () => {
        expelStudent(student.id);
      });
    } else {
      clone.querySelector(".expel").remove();
    }
    container.appendChild(clone);
  });
  countStudents();
}

//viser modal ved at skite i css (opasity), og starter skjulModal
function showModal(student) {
  modal.classList.add("vis");
  modal.querySelector("#closemodal").addEventListener("click", hideModal);
  document.querySelector("#modal").addEventListener("click", hideModal);

  modal.querySelector("[data-firstname]").textContent = student.firstName;
  modal.querySelector("[data-middlename]").textContent = student.middleName;
  modal.querySelector("[data-lastname]").textContent = student.lastName;
  modal.querySelector("[data-house]").textContent = student.house;
  modal.querySelector("[data-crest]").src = student.crest;

  let nameCor = student.image;
  if (student.lastName === "Finch-Fletchly") {
    nameCor = "images/" + nameCor.substring(nameCor.indexOf("-") + 1.);
    nameCor = nameCor.replace(/ly/i, "ley");
  }
  if (student.lastName === "Macmillian") {
    nameCor = nameCor.replace(/Macmillian_e/i, "macmillan_e");
  }


  modal.querySelector("[data-image]").src = nameCor;

  if (student.expelled === false) {
    modal.querySelector(".expel").addEventListener("click", () => {
      expelStudent(student.id);
    });
  } else {
    modal.querySelector(".expel").remove();
  }

}

//skjuler modal ved slå css "vis" fra
function hideModal() {
  modal.classList.remove("vis");
  modal.querySelector("#closemodal").removeEventListener("click", hideModal)
}



function countStudents() {
  const countAll = arrayOfStudents.length;
  document.querySelector("#student_counter").textContent = countAll;

  const hufflepuffArray = arrayOfStudents.filter(function (el) {
    return el.house === "Hufflepuff";
  });
  document.querySelector("#hufflepuff_counter").textContent =
    hufflepuffArray.length;

  const gryffindorArray = arrayOfStudents.filter(function (el) {
    return el.house === "Gryffindor";
  });
  document.querySelector("#gryffindor_counter").textContent =
    gryffindorArray.length;

  const ravenclawArray = arrayOfStudents.filter(function (el) {
    return el.house === "Ravenclaw";
  });

  document.querySelector("#ravenclaw_counter").textContent =
    ravenclawArray.length;

  const slytherinArray = arrayOfStudents.filter(function (el) {
    return el.house === "Slytherin";
  });
  document.querySelector("#slytherin_counter").textContent =
    slytherinArray.length;

  const countExpelled = arrayOfExpelled.length;
  document.querySelector("#expelled_counter").textContent = countExpelled;
}