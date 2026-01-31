let currentLang = null;
let sentenceIndex = 0;
let currentSentence = null;
let userAnswer = [];
let shuffled = [];

function shuffle(arr) {
  return arr
    .map(v => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(o => o.v);
}

/* 言語選択画面 */
function init() {
  const area = document.getElementById("langButtons");

  LANGUAGES.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "lang-btn";
    btn.textContent = lang.name;
    btn.onclick = () => startLang(lang);
    area.appendChild(btn);
  });
}

function startLang(lang) {
  currentLang = lang;
  sentenceIndex = 0;
  document.getElementById("langTitle").textContent = lang.name;

  document.getElementById("langScreen").classList.add("hidden");
  document.getElementById("lessonScreen").classList.remove("hidden");

  loadSentence();
}

function back() {
  document.getElementById("lessonScreen").classList.add("hidden");
  document.getElementById("langScreen").classList.remove("hidden");
}

/* レッスン */
function loadSentence() {
  currentSentence = currentLang.sentences[sentenceIndex];
  userAnswer = [];

  document.getElementById("question").textContent = currentSentence.question;

  shuffled = shuffle([...currentSentence.answer]);
  renderChoices();
  renderAnswer();
}

function renderChoices() {
  const c = document.getElementById("choices");
  c.innerHTML = "";

  shuffled.forEach(word => {
    const btn = document.createElement("button");
    btn.className = "word-btn";
    btn.textContent = word;
    btn.onclick = () => {
      userAnswer.push(word);
      btn.disabled = true;
      renderAnswer();
    };
    c.appendChild(btn);
  });
}

function renderAnswer() {
  const a = document.getElementById("answerArea");
  a.innerHTML = userAnswer.map(w => `<span>${w}</span>`).join(" ");
}

function check() {
  const correct = currentSentence.answer.join(" ");
  const user = userAnswer.join(" ");

  if (user === correct) {
    sentenceIndex++;
    if (sentenceIndex < currentLang.sentences.length) {
      loadSentence();
    } else {
      alert("レッスン完了");
      back();
    }
  } else {
    alert("不正解\n正解: " + correct);
  }
}

init();
