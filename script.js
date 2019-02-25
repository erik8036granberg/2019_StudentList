"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    getJson();
}

//	get json
async function getJson() {
    //	get jsonData content
    let JSON = await fetch("students.json");
    JSON = await JSON.json();
    //	test json-import
    console.log(JSON);
}

function objectTemplate() {
    // prototype "template"
    let petPrototype = {
        type: "-animal type-",
        name: "-pet name-",
        says: "-a sound-",
        greet() {
            return (`${this.name} the ${this.type} says: ${this.says} `);
        },
        age: 0,
        setJSONdata(jsonData) {
            this.type = jsonData.type;
            this.name = jsonData.name;
            this.says = jsonData.says;
            this.age = jsonData.age;
        }
    }
}