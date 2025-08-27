export function initLogin() {
  // start global rule

  let email = document.getElementById("signin_email");
  let password = document.getElementById("signin_password");
  let loginBtn = document.getElementById("loginbtn");
  let incorrectMsg = document.getElementById("incorrectMsg");
  let RequiedInputs = document.getElementById("RequiedInputs");

  // end global rule
  let username;

  let users = [];
  if (JSON.parse(localStorage.getItem("users")) != null) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  /* to clear inputs and make isvalidClass none */
  function clear() {
    [email, password].forEach((e) => {
      e.value = null;
      e.classList.remove("is-valid", "is-invalid");
    });
  }
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (email.value !== "" && password.value !== "") {
      let vaildUser = isValidUser(email.value, password.value);

      if (vaildUser) {
        sessionStorage.setItem("currentUser", JSON.stringify(vaildUser));
        clear();
        Toastify({
          text: "Account login successfully!",
          duration: 1000,
          style: {
            background:
              "linear-gradient(to right, rgb(251, 86, 7), rgb(255, 140, 66))",
          },
        }).showToast();
        setTimeout(() => {
          window.location.href = "../home.html";
        }, 2000);
      } else {
        incorrectMsg.classList.remove("d-none");
        RequiedInputs.classList.add("d-none");
      }
    } else {
      RequiedInputs.classList.remove("d-none");
      incorrectMsg.classList.add("d-none");
    }
  });

  /* validation inputs */
  function isValidUser(emailInput, passwordInput) {
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === emailInput &&
        users[i].password === passwordInput
      ) {
        return users[i];
      }
    }
    return false;
  }
}
