import React, {useState} from "react";

console.log("Test");

const BASE = "/127.0.0.1:5000/";

const form = document.querySelector('#url-form'); 

const [bias, setBias] = useState("None")

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent the form from submitting normally

  const formData = new FormData(form);
  const url = formData.get('id'); // get the value of the "id" input field

  fetch(BASE +`/url/${url}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setBias(data)
    })
    .catch(error => console.error(error));
});

function toggleInputType(toggleType) {
    let inputDiv = document.getElementById("input");
    let articlePasteButton = document.getElementById("paste-article");
    let linkPasteButton = document.getElementById("paste-link");
  
    if (toggleType == "link") {
      inputDiv.innerHTML = ``;
      articlePasteButton.style += "";
      linkPasteButton.style = "";
    } else {
      inputDiv.innerHTML = ``;
      articlePasteButton.style = "";
      linkPasteButton.style += "";
    }
  }