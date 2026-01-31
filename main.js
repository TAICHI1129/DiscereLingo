document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("courseList");
  list.innerHTML = "";

  LANGUAGES.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "course";
    btn.textContent = lang.name;
    btn.onclick = () => {
      alert(lang.name);
    };
    list.appendChild(btn);
  });
});
