const $modal = document.querySelector(".modal");

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

    $modal.style.display = 'block';
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
        <div class="close-modal-btn" onclick="$modal.style.display='none'">
        &times;
      </div>
    ` 
      )
      .join(""); 
  } catch (error) {
    console.error(error);
  }
}

async function getAllCharacters() {
  const url = "https://www.breakingbadapi.com/api/characters";
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const character = await response.json();
    const $showCase = document.querySelector(".showCase");

    $showCase.innerHTML = character
      .map(
        person => `
    <div class="person">
    <img class="charimg" src="${person.img}"/>
    <div class="charinfo">
        <h3>${person.nickname}</h3>
        <div className="more_info">
    <i class="fas fa-info-circle" onclick="getCharacterInfo(${person.char_id})"></i>
    </div>
        
    </div>
    
    </div>
    `
      )
      .join("");
  } catch (error) {
    console.error(error);
  }
}

getAllCharacters();

