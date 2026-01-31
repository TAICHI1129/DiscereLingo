let currentLang = null;
let sentenceIndex = 0;
let currentSentence = null;
let shuffled = [];
let userAnswer = [];

function init() {
  const list = document.getElementById("langList");
  list.innerHTML = "";

  LANGUAGES.forEach(lang => {
    const btn = document.createElement("button");
    btn.textContent = lang.name;
    btn.onclick = () => startLang(lang);
    list.appendChild(btn);
  });

  document.getElementById("nextBtn").onclick = nextSentence;
}

function startLang(lang) {
  currentLang = lang;
  sentenceIndex = 0;

  document.getElementById("langTitle").textContent =
    `${lang.name} / ${lang.author}`;

  document.getElementById("langScreen").classList.add("hidden");
  document.getElementById("lessonScreen").classList.remove("hidden");

  loadSentence();
}

function loadSentence() {
  currentSentence = currentLang.sentences[sentenceIndex];
  userAnswer = [];

  document.getElementById("question").textContent =
    currentSentence.question;

  shuffled = shuffle([...currentSentence.answer]);

  renderAnswer();
  renderChoices();
}

function renderChoices() {
  const area = document.getElementById("choices");
  area.innerHTML = "";

  shuffled.forEach(word => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.onclick = () => {
      userAnswer.push(word);
      renderAnswer();
    };
    area.appendChild(btn);
  });
}

function renderAnswer() {
  const area = document.getElementById("answerArea");
  area.innerHTML = "";

  userAnswer.forEach(w => {
    const span = document.createElement("span");
    span.textContent = w;
    area.appendChild(span);
  });
}

function nextSentence() {
  sentenceIndex++;
  if (sentenceIndex >= currentLang.sentences.length) {
    alert("終了");
    location.reload();
    return;
  }
  loadSentence();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

init();
