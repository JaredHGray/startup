async function loginUser() {
  loginOrCreate(`/api/auth/login`, `html/`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`, ``);
}

async function loginOrCreate(endpoint, location) {
  const userName = document.querySelector("#username")?.value;
  const password = document.querySelector('#password')?.value;
  
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ userName: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  const body = await response.json();
  console.log("status: " + response?.status)
  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    //window.location.href = 'html/home.html';
    window.location.href = `${location}home.html`;
  } else {
    document.getElementById('errorMsg').innerHTML = `Error: ${body.msg}`;
  }

}
