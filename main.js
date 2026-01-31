let currentLang = null;

function init() {
  const select = document.getElementById("langSelect");

  LANGUAGES.forEach(lang => {
    const opt = document.createElement("option");
    opt.value = lang.id;
    opt.textContent = lang.name;
    select.appendChild(opt);
  });

  select.onchange = () => {
    currentLang = LANGUAGES.find(l => l.id === select.value);
  };

  currentLang = LANGUAGES[0];
}

function showWords() {
  const c = document.getElementById("content");
  c.innerHTML = "";

  currentLang.words.forEach(w => {
    c.innerHTML += `<p>${w.word} = ${w.meaning}</p>`;
  });
}

function quiz() {
  const c = document.getElementById("content");
  const w = currentLang.words[Math.floor(Math.random() * currentLang.words.length)];

  c.innerHTML = `
    <p>${w.word} の意味は？</p>
    <input id="ans">
    <button onclick="check('${w.meaning}')">答える</button>
  `;
}

function check(correct) {
  const a = document.getElementById("ans").value;
  alert(a === correct ? "正解" : "違う：" + correct);
}

init();
