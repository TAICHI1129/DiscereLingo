const screenLang = document.getElementById("screen-lang");
const screenQuiz = document.getElementById("screen-quiz");
const langButtons = document.getElementById("lang-buttons");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const checkBtn = document.getElementById("check");

const state = {
  langIndex: 0,
  sentenceIndex: 0,
  answer: [],
  selected: []
};

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function showLanguages() {
  langButtons.innerHTML = "";
  LANGUAGES.forEach((lang, i) => {
    const btn = document.createElement("button");
    btn.textContent = lang.name;
    btn.onclick = () => startLang(i);
    langButtons.appendChild(btn);
  });
}

function startLang(i) {
  state.langIndex = i;
  state.sentenceIndex = 0;
  screenLang.classList.add("hidden");
  screenQuiz.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const lang = LANGUAGES[state.langIndex];
  const s = lang.sentences[state.sentenceIndex];

  state.answer = s.lang.split(" ");
  state.selected = [];

  questionEl.textContent = s.jp;
  choicesEl.innerHTML = "";

  shuffle(state.answer).forEach(word => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.onclick = () => toggleWord(btn, word);
    choicesEl.appendChild(btn);
  });
}

function toggleWord(btn, word) {
  if (btn.classList.contains("selected")) {
    btn.classList.remove("selected");
    state.selected = state.selected.filter(w => w !== word);
  } else {
    btn.classList.add("selected");
    state.selected.push(word);
  }
}

checkBtn.onclick = () => {
  if (state.selected.join(" ") === state.answer.join(" ")) {
    state.sentenceIndex++;
    if (state.sentenceIndex >= LANGUAGES[state.langIndex].sentences.length) {
      alert("完了");
      location.reload();
    } else {
      loadQuestion();
    }
  } else {
    alert("違う");
  }
};

showLanguages();
