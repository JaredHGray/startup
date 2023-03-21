function loginIndex() {
    const nameEl = document.querySelector("#username");
    const passEl = document.querySelector('#password');
    const userInfo = {name: nameEl.value, login: passEl.value}
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    window.location.href = "html/home.html";
  }

function login() {
  const nameEl = document.querySelector("#username");
  const passEl = document.querySelector('#password');
  const userInfo = {name: nameEl.value, login: passEl.value}
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  window.location.href = "home.html";
}