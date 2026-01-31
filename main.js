let currentLang = null;

function init() {
  const area = document.getElementById("langButtons");

  LANGUAGES.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "lang-btn";
    btn.textContent = lang.name + " / " + lang.author;
    btn.onclick = () => selectLang(lang);
    area.appendChild(btn);
  });
}

function selectLang(lang) {
  currentLang = lang;
  document.getElementById("lessonTitle").textContent = lang.name;

  document.getElementById("langScreen").classList.add("hidden");
  document.getElementById("learnScreen").classList.remove("hidden");
}

function backToLang() {
  document.getElementById("learnScreen").classList.add("hidden");
  document.getElementById("langScreen").classList.remove("hidden");
}

function startWords() {
  const c = document.getElementById("content");
  c.innerHTML = "";
  currentLang.words.forEach(w => {
    c.innerHTML += `<p><strong>${w.word}</strong> = ${w.meaning}</p>`;
  });
}

function quiz() {
  const c = document.getElementById("content");
  const w = currentLang.words[Math.floor(Math.random() * currentLang.words.length)];
  c.innerHTML = `
    <p><strong>${w.word}</strong></p>
    <input id="ans">
    <button onclick="check('${w.meaning}')">答える</button>
  `;
}

function check(correct) {
  const a = document.getElementById("ans").value;
  alert(a === correct ? "正解！" : "違う：" + correct);
}

init();

