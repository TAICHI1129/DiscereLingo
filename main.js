let state = "lang";
let langIndex = 0;
let sentenceIndex = 0;
let currentWords = [];
let correct = "";

const langButtons = document.getElementById("langButtons");
const quiz = document.getElementById("quiz");

LANGUAGES.forEach((lang, i) => {
  const btn = document.createElement("button");
  btn.textContent = lang.name;
  btn.onclick = () => selectLanguage(i);
  langButtons.appendChild(btn);
});

function selectLanguage(i) {
  langIndex = i;
  state = "quiz";
  document.getElementById("langSelect").style.display = "none";
  quiz.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  currentWords = [];
  document.getElementById("answerBox").textContent = "";
  document.getElementById("wordButtons").innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";

  const s = LANGUAGES[langIndex].sentences;
  sentenceIndex = Math.floor(Math.random() * s.length);

  const q = s[sentenceIndex];
  correct = q.lang;

  document.getElementById("question").textContent = q.jp;

  const words = q.lang.split(" ").sort(() => Math.random() - 0.5);

  words.forEach(w => {
    const b = document.createElement("button");
    b.textContent = w;
    b.onclick = () => {
      currentWords.push(w);
      b.style.display = "none";
      updateAnswer();
    };
    document.getElementById("wordButtons").appendChild(b);
  });
}

function updateAnswer() {
  document.getElementById("answerBox").textContent = currentWords.join(" ");
}

document.getElementById("backBtn").onclick = () => {
  if (!currentWords.length) return;
  const w = currentWords.pop();
  [...document.querySelectorAll("#wordButtons button")]
    .find(b => b.textContent === w && b.style.display === "none")
    .style.display = "";
  updateAnswer();
};

document.getElementById("checkBtn").onclick = () => {
  if (currentWords.join(" ") === correct) {
    alert("正解");
  } else {
    alert("不正解\n正解: " + correct);
  }
  document.getElementById("nextBtn").style.display = "inline";
};

document.getElementById("nextBtn").onclick = loadQuestion;
