let current_count = 5;
const countjob = setInterval("countDown()", 1000);

window.addEventListener('DOMContentLoaded', (event) => {
   console.log('DOM fully loaded and parsed');
   element = document.querySelector('.revealGame');
   element.style.visibility = 'hidden';
   document.body.style.backgroundImage = 'none';
   countjob;
});

function countDown() {
    console.log('in the countdown');
    document.getElementById("container",).innerHTML = `<h2> ${current_count}</h2>`;
    if (current_count > 0) {
    current_count--;
    } else {
    clearInterval(countjob);
    document.getElementById("container",).innerHTML = `<h2> </h2>`;
    element = document.querySelector('.revealGame');
    element.style.visibility = 'visible';
    document.body.style.backgroundImage = "url(space.webp)";
    }
}