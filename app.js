// selecting html elements
const trigger = document.querySelector(".search-trigger");
const form = document.querySelector("form");
const formInput = document.querySelector(".word-input");
const searchedWordEl = document.querySelector(".searched-word");
const soundBtn = document.querySelector(".sound-logo");
const resultContainer = document.querySelector(".result-container");

// activating the form by the clicking on the trigger button
trigger.addEventListener("click", () => {
  form.classList.add("active");
  formInput.focus();
  trigger.style.display = "none";
});

// let value = formInput.value;

// console.log(value);

// Listening to the submit event and getting the typed value
form.addEventListener("submit", (e) => {
  // preventing the form from submitting
  e.preventDefault();

  // cupturing the input word
  let word = formInput.value;
  formInput.value = "";

  // calling the sendRequest function and passing the input word
  sendRequest(word);
});

// Defining the sendRequest function as an async function
async function sendRequest(inputWord) {
  try {
    // sending the request using the fetch api
    let res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`
    );

    // converting the response into json
    let data = await res.json();

    console.log(data);

    // calling the output word funtion to ouput the typed word
    displayWord(searchedWordEl, data[0].word);

    let audioIndex;

    // using if statement to select the correct index for our audio
    // since the mp3 is not coming in a predictable index
    // when we search some words, the mp3 index is at position 1 others in 0 others in 3 etc
    if (data[0].phonetics[0].audio) {
      audioIndex = 0;
    } else if (data[0].phonetics[1].audio) {
      audioIndex = 1;
    } else if (data[0].phonetics[2].audio) {
      audioIndex = 2;
    } else {
      audioIndex = 3;
    }

    // calling the getSoundUrl and passing the sound url
    getSoundUrl(data[0].phonetics[audioIndex].audio);

    // Formating the result within the result container

    resultContainer.innerHTML = `

      <h3>Pronunciation</h3>

      <ul class="phonetic">
        <li>${data[0].phonetic}</li>
      </ul>

      <div class="line"></div>

    `;

    // the example variable
    let example = "";
    let synonym = "";
    let antonym = "";

    // loop through the result and getting partof speeches

    for (i = 0; i < data[0].meanings.length; i++) {
      resultContainer.innerHTML += `
        <h3>${data[0].meanings[i].partOfSpeech}</h3>


      `;
      // resultContainer.innerHTML += "<ol>";

      // example Loop

      for (j = 0; j < data[0].meanings[i].definitions.length; j++) {
        example =
          data[0].meanings[i].definitions[j].example === undefined
            ? ""
            : data[0].meanings[i].definitions[j].example;

        resultContainer.innerHTML += `
        <div class="def-list">
          <li>${data[0].meanings[i].definitions[j].definition}</li>

          <p class="example">${example}</p>
        </div>
          

        `;
      }

      // Synonym Loop
      resultContainer.innerHTML += `<h4>Synomys:</h4>`;
      for (k = 0; k < data[0].meanings[i].synonyms.length; k++) {
        synonyms =
          data[0].meanings[i].synonyms[k] === undefined
            ? ""
            : data[0].meanings[i].synonyms[k];
        resultContainer.innerHTML += `

        <a href="#" class="synonym" data-synonym='${data[0].meanings[i].synonyms[k]}'>[ ${data[0].meanings[i].synonyms[k]} ]</a>
         
          
        `;
      }

      // Antonym Loop
      resultContainer.innerHTML += `<h4>Antonyms:</h4>`;
      for (q = 0; q < data[0].meanings[i].antonyms.length; q++) {
        antonym =
          data[0].meanings[i].antonyms[q] === undefined
            ? ""
            : data[0].meanings[i].antonyms[q];
        resultContainer.innerHTML += `
   
        <a href="#" class="antonym" data-antonym='${data[0].meanings[i].antonyms[q]}'>[ ${data[0].meanings[i].antonyms[q]} ] </a>
             
           `;
      }

      resultContainer.innerHTML += `<div class="line"></div>`;
    }
  } catch (er) {
    alert(`Sorry, we could not find the word ${inputWord}, try another word !`);
  }
}

// function to display the searched word

function displayWord(htmlEl, word) {
  htmlEl.innerHTML = word;
}

let audioElement;

// adding the click event in order to play the mp3 audio
soundBtn.addEventListener("click", () => {
  // playing the audio
  audioElement.play();
});

// the get sound function helps us to get the url and pass it to the audio object
function getSoundUrl(url) {
  // creating the Audio object and passing the audio url
  audioElement = new Audio(url);
}

// const antonym =
//   document.querySelector(".antonym") === null
//     ? ""
//     : document.querySelector(".antonym");

// antonym.addEventListener("click", (e) => {
//   antonymData = antonym.getAttribute("data-antonym");

//   sendRequest(antonymData);
// });

// const synonym =
//   document.querySelector(".synonym") === null
//     ? ""
//     : document.querySelector(".synonym");

// synonym.addEventListener("click", (e) => {
//   synonymData = synonym.getAttribute("data-synonym");

//   sendRequest(synonymData);
// });
