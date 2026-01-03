const searchInput = document.querySelector(".search");
const word = document.getElementById("word");
const phonetic = document.getElementById("phonetic");
const playButton = document.getElementById("play-button");

let audioUrl = ""; // audio link shu yerda saqlanadi

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

    console.log(data);

    data.map((data) => {
      word.textContent = data.word;
      phonetic.textContent = data.phonetic;

      audioUrl = data.phonetics.find((p) => p.audio)?.audio;
    });
  }
});
