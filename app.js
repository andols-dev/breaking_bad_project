const $modal = document.querySelector(".modal");
const $heading = document.querySelector(".heading");
const $searchBtn = document.querySelector("#searchbutton");
const $searchResult = document.querySelector(".search-result");

$searchBtn.addEventListener("click", queryCharacterInfo);

/* The function getCharacterInfo takes a name parameter. 
In this case the parameter is ${person.char_id} from 
the iteration of character in the function getAllCharacters.
*/
async function getCharacterInfo(name) {
  //console.warn(name);
  const url = "https://www.breakingbadapi.com/api/characters/";
  const newUrl = url + name;
  try {
    const response = await fetch(newUrl);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const character = await response.json();
    const $modalContent = document.querySelector(".modal-content");

    $modal.style.display = "block";
    $modalContent.innerHTML = character
      .map(
        person => `
        <div class="person_info">
          <h3>Full name: ${person.name}</h3>
          <h3>Birthday: ${person.birthday}</h3>
          <h3>Occupation: ${person.occupation}</h3>
          <h3>Status: ${person.status}</h3>
          <h3>Appearance: ${person.appearance}</h3>
          <h3>Portrayed by: ${person.portrayed}</h3>
        </div>
        
        <div class="person_img">
          <img src="${person.img}" />
        </div>
        <button class="close-modal-btn" onclick="$modal.style.display='none'">
        &times;
      </button>
    `).join("");
  } catch (error) {
    console.error(error);
  }
}
// Fetch info from Breaking Bad characters, set limit to 4
async function getAllCharacters() {
  const url = "https://www.breakingbadapi.com/api/characters?limit=4";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const character = await response.json();

    // Characters information will be shown here.
    const $showCase = document.querySelector(".showCase");

    // $heading.innerText = "Characters in Breaking Bad";

    // Iterate over character info and show it on the page
    $showCase.innerHTML = character
      .map(
        person => `
        <div class="person">
          <img class="charimg" src="${person.img}"/>
          <div className="more_info">
          
        </div> 
        <div class="charinfo">
          <h3>Nickname: ${person.nickname}</h3>
          <i class="fas fa-plus-square" title="More information" onclick="getCharacterInfo(${person.char_id})"></i>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error(error);
  }
}
// Search for a charachter
async function queryCharacterInfo() {
  const $searchInput = document.querySelector("#searchinput");
  const searchValue = $searchInput.value;

  // stop the function to run if there is no user input and show warning message
  if ($searchInput.value === "") {
    Swal.fire({
      title: "You need to enter a charachters name",
      icon: "error",
      confirmButtonText: "Try again"
    });
    return;
  }
  //console.log(searchValue);
  const url = "https://www.breakingbadapi.com/api/characters?name=";

  const newUrl = url + searchValue;
  //console.log('newurl:' + newUrl);
  try {
    const response = await fetch(newUrl);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const character = await response.json();

    $searchResult.innerHTML = character.map(
      person => `
    <div class="image">
      <img src="${person.img}"/>
    </div>
    <div class="info">
      <h3>Full name: ${person.name}</h3>
      <h3>Birthday: ${person.birthday}</h3>
      <h3>Occupation: ${person.occupation}</h3>
      <h3>Status: ${person.status}</h3>
      <h3>Appearance: ${person.appearance}</h3>
      <h3>Portrayed by: ${person.portrayed}</h3>
    </div>
    <button class="close-info-btn" onclick="$searchResult.innerHTML = ''">
        &times;
      </button>
    `);

    /* If the user doesn't provide a firstname and a lastname in the inputfield,
    an alert will show up prompting the user to input firstname and lastname */
    if (character == "") {
      //alert('you must enter both firstname and lastname');
      Swal.fire({
        title: "You need to enter both firstname and lastname",
        icon: "error",
        confirmButtonText: "Try again"
      });
    }
  } catch (error) {
    console.error(error);
  }
  // Clear the inputfield
  $searchInput.value = "";
}

// From start there will be 4 characters from Breaking Bad when a user visits the page
getAllCharacters();
