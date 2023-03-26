async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
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
    window.location.href = 'html/home.html';
  } else {
   // const modalEl = document.querySelector('#msgModal');
    document.getElementById('errorMsg').innerHTML = `Error: ${body.msg}`;
    //modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
  }

}
