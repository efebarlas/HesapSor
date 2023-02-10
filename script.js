const loginBtn = document.querySelector("#login-btn");
const loginModal = document.querySelector("#login-modal");
//const closeBtn = document.querySelector("#close");

loginBtn.addEventListener("click", function() {
  loginModal.style.display = "block";
});

//closeBtn.addEventListener("click", function() {
//  loginModal.style.display = "none";
//});

window.addEventListener("click", function(event) {
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
});

document.getElementById("signup-btn").addEventListener("click", function() {
    window.location.href = "signup.html";
  });