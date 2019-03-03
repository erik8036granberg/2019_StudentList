"use strict";

let arrayOfStudents = [];
let arrayOfExpelled = [];
let arrayOfInSquad = [];
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
  bloodstatus: "-bloodstatus-",
  inSquad: "-inquisitorialSquad-",

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
      this.lastName.toLowerCase() +
      "_" +
      this.firstName.substring(0, 1).toLowerCase() +
      ".png";
    this.expelled = false;
    this.bloodstatus = "None";
    this.inSquad = false;
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

  document.querySelector("#expelled").addEventListener("click", expelledButton);
  document.querySelector("#enrolled").addEventListener("click", enrolledButton);
  getJson();
}

//	get json
async function getJson() {
  console.log("getJson");
  let Json = await fetch("students.json");
  let students = await Json.json();
  getJsonFam(students);
}

//	get families
async function getJsonFam(students) {
  console.log("getJsonFam");
  let JsonFam = await fetch("families.json");
  let families = await JsonFam.json();
  studentObject(students, families);
}

function studentObject(students, families) {
  console.log("studentObject");
  students.forEach(studentData => {
    // create, clone and add studentObject
    const student = Object.create(studentPrototype);
    student.setJSONdata(studentData);
    arrayOfStudents.push(student);
  });
  getHalfBloods(families);
  getPureBloods(families);
  setMuggleBloods();
  activeArray = arrayOfStudents;
  corrrectNames();
}

function getHalfBloods(families) {
  console.log("getHalfBloods");
  let halfBloods = families.half;
  let bloodLabel = "Halfblood";
  halfBloods.forEach(bloodName => {
    setBloodStatus(bloodName, bloodLabel);
  });
}

function getPureBloods(families) {
  console.log("getPureBloods");
  let pureBloods = families.pure;
  let bloodLabel = "Pureblood";
  pureBloods.forEach(bloodName => {
    setBloodStatus(bloodName, bloodLabel);
  });
}

function setBloodStatus(bloodName, bloodLabel) {
  console.log("setBloodStatus");
  let objIndex = arrayOfStudents.findIndex(obj => obj.lastName == bloodName);
  if (objIndex !== -1) {
    arrayOfStudents[objIndex].bloodstatus = bloodLabel;
  }
}

function setMuggleBloods() {
  console.log("setMuggleBloods");
  arrayOfStudents.forEach(student => {
    if (student.bloodstatus === "None") {
      student.bloodstatus = "Muggleblood";
    }
  });
}

function corrrectNames() {
  console.log("corrrectNames");
  arrayOfStudents.forEach(student => {
    let nameCorrect = student.image;

    if (student.lastName === "Macmillian") {
      student.image = "images/macmillan_e.png";
    }

    if (student.image === "images/-unknown-_l.png") {
      student.image = "img/noname.png";
    }
    if (student.image === "images/_h.png") {
      student.image = "images/granger_h.png";
    }

    if (student.image === "images/finch-fletchly_j.png") {
      student.image = "images/fletchley_j.png";
    }
    if (student.fullName === "Leanne -unknown-") {
      student.fullName = "Leanne";
    }

    if (student.lastName === "-unknown-") {
      student.lastName = "";
    }
  });
  activeArray = arrayOfStudents;
  addIdToStudents();
}

function addIdToStudents() {
  console.log("addIdToStudents");
  //add unique id to students
  arrayOfStudents.forEach(student => {
    const idMade = makeId(student.fullName);
    student.id = idMade;
  });
  activeArray = arrayOfStudents;
  filterStudents();
}

function makeId(input) {
  console.log("makeId");
  let idMade = "";
  for (let i = 0; i < input.length; i++) {
    idMade += input[i].charCodeAt(0);
  }
  return idMade;
}

function expelStudent(activeId) {
  console.log("expelStudent");
  //set expel-status to true
  let objIndex = arrayOfStudents.findIndex(obj => obj.id === activeId);
  arrayOfStudents[objIndex].expelled = true;
  let expelledStudent = arrayOfStudents[objIndex];
  arrayOfExpelled.unshift(expelledStudent);
  // arrayOfStudents.splice(objIndex, 1);

  console.log(arrayOfExpelled);

  //remove student from display
  arrayOfStudents = arrayOfStudents.filter(function (el) {
    return el.expelled === false;
  });
  activeArray = arrayOfStudents;
  filterStudents();
}

function joinInSq(StudentId) {
  console.log("joinInSq");

  let objIndex = arrayOfStudents.findIndex(obj => obj.id === StudentId);
  let inSquadStudent = arrayOfStudents[objIndex];

  if (
    inSquadStudent.bloodstatus === "Pureblood" ||
    (inSquadStudent.bloodstatus === "Halfblood" &&
      inSquadStudent.house === "Slytherin")
  ) {
    arrayOfStudents[objIndex].inSquad = true;
    arrayOfInSquad.unshift(inSquadStudent);
    activeArray = arrayOfStudents;
    filterStudents();
  } else {
    alert("No can do!");
  }
}

function exitInSq(StudentId) {
  console.log("exitInSq");

  let objIndex = arrayOfStudents.findIndex(obj => obj.id === StudentId);
  let inSquadStudent = arrayOfStudents[objIndex];
  arrayOfInSquad.splice(inSquadStudent);
  arrayOfStudents[objIndex].inSquad = false;
  activeArray = arrayOfStudents;
  filterStudents();
}

function enrolledButton() {
  console.log("enrolledButton");
  activeArray = arrayOfStudents;
  showexpelled = false;
  houseFilter = "All";
  document.querySelector("#enrolled").classList.remove("statusoff");
  document.querySelector("#expelled").classList.remove("statuson");
  document.querySelector("#expelled").classList.add("statusoff");
  filterStudents();
}

function expelledButton() {
  console.log("expelledButton");
  activeArray = arrayOfExpelled;
  showexpelled = true;
  houseFilter = "All";
  document.querySelector("#expelled").classList.add("statuson");
  document.querySelector("#enrolled").classList.remove("statuson");
  document.querySelector("#enrolled").classList.add("statusoff");

  filterStudents();
}

function filterAll() {
  console.log("filterAll");
  houseFilter = "All";
  if (showexpelled === false) {
    activeArray = arrayOfStudents;
    filterStudents();
  } else {
    activeArray = arrayOfExpelled;
  }
  filterStudents();
}

function filterHufflepuff() {
  console.log("filterHufflepuff");
  houseFilter = "Hufflepuff";
  filterStudents();
}

function filterGryffindor() {
  console.log("filterGryffindor");
  houseFilter = "Gryffindor";
  filterStudents();
}

function filterRavenclaw() {
  console.log("filterRavenclaw");
  houseFilter = "Ravenclaw";
  filterStudents();
}

function filterSlytherin() {
  console.log("filterSlytherin");
  houseFilter = "Slytherin";
  filterStudents();
}

function filterStudents() {
  console.log("filterStudents");
  if (showexpelled === false) {
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
  console.log("sortFirstName");
  sortBy = "firstName";
  sortStudents();
}

function sortLastName() {
  console.log("sortLastName");
  sortBy = "lastName";
  sortStudents();
}

function sortHouse() {
  console.log("sortHouse");
  sortBy = "house";
  sortStudents();
}

function sortStudents() {
  console.log("sortStudents");
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
  console.log("displayStudents");

  const template = document.querySelector("[data-template]");
  const container = document.querySelector("[data-container]");
  container.innerHTML = "";

  activeArray.forEach(student => {
    let clone = template.content.cloneNode(true);

    clone.querySelector(".student_name").addEventListener("click", () => {
      displayModal(student.id);
      console.log("Display - sendt id er: " + student.id);
    });

    clone.querySelector("[data-firstname]").textContent = student.firstName;
    clone.querySelector("[data-middlename]").textContent = student.middleName;
    clone.querySelector("[data-lastname]").textContent = student.lastName;
    clone.querySelector("[data-house]").textContent = student.house;
    clone.querySelector("[data-crest]").src = student.crest;

    if (showexpelled === false) {
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

function displayModal(StudentId) {
  console.log("displayModal");
  console.log("Modal - modtaget id er: " + StudentId);

  let ActiveId = StudentId;

  document.querySelector("#modal").classList.add("show");

  const modalTemplate = document.querySelector("[data-modalTemplate]");
  const modalContainer = document.querySelector("[data-modalContainer]");
  modalContainer.innerHTML = "";

  activeArray.forEach(student => {
    let clone = modalTemplate.content.cloneNode(true);

    if (student.id === ActiveId) {
      clone.querySelector("#closemodal").addEventListener("click", hideModal);
      clone.querySelector("[data-modalfirstname]").textContent =
        student.firstName;
      clone.querySelector("[data-modalmiddlename]").textContent =
        student.middleName;
      clone.querySelector("[data-modallastname]").textContent =
        student.lastName;
      clone.querySelector("[data-modalhouse]").textContent = student.house;
      clone.querySelector("[data-modalcrest]").src = student.crest;

      clone.querySelector("[data-modalimage]").src = student.image;

      if (student.expelled === false) {
        clone.querySelector(".modalexpel").addEventListener("click", () => {
          expelStudent(ActiveId);
          hideModal();
        });
      } else {
        clone.querySelector(".modalExpel").remove();
      }

      clone.querySelector("[data-modalbloodstatus]").textContent =
        student.bloodstatus;

      if (student.inSquad === false) {
        clone.querySelector(".insquad").textContent = "Join InSquad";
        clone.querySelector(".insquad").addEventListener("click", () => {
          joinInSq(ActiveId);
          hideModal();
        });
      }
      if (student.inSquad === true) {
        clone.querySelector(".insquad").textContent = "Exit InSquad";
        clone.querySelector(".insquad").addEventListener("click", () => {
          exitInSq(ActiveId);
          hideModal();
        });
      }

      let houseColor = student.house.toLowerCase();
      console.log(houseColor);
      clone.querySelector(".modalexpel").classList.add(houseColor + "bg");
      clone.querySelector(".insquad").classList.add(houseColor + "bg");
      clone.querySelector("#house_bg").classList.add(houseColor);


      modalContainer.appendChild(clone);
    }
  });
}

//hide modal
function hideModal() {
  console.log("hideModal");
  document.querySelector("#closemodal").removeEventListener("click", hideModal);
  document.querySelector("#modal").classList.remove("show");
}

function countStudents() {
  console.log("countStudents");
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

  const countInSquad = arrayOfInSquad.length;
  document.querySelector("#insquad_counter").textContent = countInSquad;

  console.log("arrayOfExpelled");
  console.log(arrayOfExpelled);
  console.log("arrayOfInSquad");
  console.log(arrayOfInSquad);
}