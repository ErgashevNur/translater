const searchInput = document.querySelector(".search");
const slider = document.querySelector(".slider");
const word = document.getElementById("word");
const phonetic = document.getElementById("phonetic");
const playButton = document.getElementById("play-button");
const modeIcon = document.getElementById("mode-icon");
const mode = document.getElementById("dark-mode-toggle");
const select = document.getElementById("font-select");
const elUl = document.getElementById("ul");
const elUlVerb = document.getElementById("ulVerb");
const synonm = document.getElementById("synonym");
const verbExample = document.getElementById("verbExample");
const notData = document.getElementById("not-found");
const mainData = document.getElementById("data");
const firstPage = document.querySelector(".firstPage");

let audioUrl = "";
playButton.addEventListener("click", () => {
  const audio = new Audio(audioUrl);
  audio.play();
});

searchInput.addEventListener("keydown", async function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    event.preventDefault();

    word.textContent = "...";
    phonetic.textContent = "...";
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value}`
    );
    const data = await res.json();

    if (data.title) {
      notData.style.display = "flex";
      mainData.style.display = "none";
      firstPage.style.display = "none";
    } else {
      notData.style.display = "none";
      mainData.style.display = "block";
      firstPage.style.display = "none";
    }

    data.map((data) => {
      word.textContent = data.word;
      phonetic.textContent = data.phonetic;

      console.log(data);

      elUl.innerHTML = data.meanings[0].definitions
        .map((data) => {
          return `
        <li>
         <p>${data.definition}</p>
        </li>
        `;
        })
        .join("");

      const findVerb = data.meanings.find(
        (data) => data.partOfSpeech === "verb" || data.partOfSpeech === "adverb"
      );

      const verbText = findVerb.definitions;

      verbExample.innerHTML = verbText
        .map((data) => {
          return `
        <li>
         <p>${data.definition}</p>
        </li>
        `;
        })
        .join("");

      elUlVerb.innerHTML = verbText
        .map((data) => {
          return `
        <li>
         <p>${data.definition}</p>
        </li>
        `;
        })
        .join("");

      audioUrl = data.phonetics.find((p) => p.audio)?.audio;
      synonm.textContent = data.meanings[0].synonyms;
    });
  }
});

const qwerty = [1, 12, 3, 4, 5, 56, 7, 8];

console.log(qwerty);

// Mode holati uchun yozgan kodim
if (localStorage.getItem("mode")) {
  document.body.classList.add("dark-mode");
  modeIcon.innerHTML = `<i class="fa-solid fa-sun"  style="font-size: 24px; color: #a445ed;"></i>`;
}
slider.addEventListener("click", () => {
  if (mode.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("mode", "dark-mode");
    modeIcon.innerHTML = `<i class="fa-solid fa-sun"  style="font-size: 24px; color: #a445ed;"></i>`;
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.removeItem("mode");
    modeIcon.innerHTML = `<i class="theme fa-solid fa-moon" style="font-size: 24px"></i>`;
  }
});

// Font uchun yozgan kodim
const savedFont = localStorage.getItem("data-font");
if (savedFont) {
  document.body.setAttribute("data-font", savedFont);
  select.value = savedFont; // select dropdown bilan moslashtirish
}
select.addEventListener("click", () => {
  localStorage.setItem("data-font", select.value);

  document.body.setAttribute("data-font", select.value);
});
