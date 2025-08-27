export function initSignup() {
  /* start global rules */
  let userName = document.getElementById("signup_name");
  let email = document.getElementById("signup_email");
  let password = document.getElementById("signup_password");
  let confirmPassword = document.getElementById("signup_confirmpass");
  let btnSignUp = document.getElementById("btnSignUp");
  let users = [];
  /* end global rules */

  /* to read or retrive data */
  if (JSON.parse(localStorage.getItem("users")) != null) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  /* to sign up */

  btnSignUp.addEventListener("click", addUser);

  /* create single user  */
  function addUser(e) {
    e.preventDefault();
    if (
      validation("mesName", userName) &&
      validation("mesEmail", email) &&
      validation("mesPassword", password) &&
      match() &&
      isExist()
    ) {
      let singleUser = {
        name: userName.value,
        email: email.value,
        password: password.value,
        cart: [],
      };

      /*  push single user to array and store in localStorage */
      users.push(singleUser);
      localStorage.setItem("users", JSON.stringify(users));
      Toastify({
        text: "Account created successfully! You can now log in.",
        duration: 1000,
        style: {
          background:
            "linear-gradient(to right, rgb(251, 86, 7), rgb(255, 140, 66))",
        },
      }).showToast();
      clear();

      setTimeout(function () {
        window.location.href = "../index.html";
      }, 2000);
    }
  }

  /* to clear inputs and make isvalidClass none */
  function clear() {
    [userName, email, password, confirmPassword].forEach((e) => {
      e.value = null;
      e.classList.remove("is-valid", "is-invalid");
    });
  }

  /* validation name and password */
  function validation(msgID, ele) {
    let text = ele.value;

    let message = document.getElementById(msgID);
    let regex = {
      signup_name: /^[A-Za-z\u0600-\u06FF ]{3,50}$/,
      signup_email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org)$/,
      signup_password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
    };

    if (regex[ele.id].test(text)) {
      ele.classList.add("is-valid");
      ele.classList.remove("is-invalid");
      message.classList.add("d-none");

      return true;
    } else {
      ele.classList.add("is-invalid");
      ele.classList.remove("is-valid");
      message.classList.remove("d-none");

      return false;
    }
  }
  /* validation if email is exist or not  */
  function isExist() {
    let message = document.getElementById("existMess");

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email.value) {
        message.classList.remove("d-none");
        return false;
      }
    }

    message.classList.add("d-none");
    return true;
  }

  function match() {
    let message = document.getElementById("mesMatchPass");
    if (password.value === confirmPassword.value) {
      message.classList.add("d-none");
      return true;
    } else {
      message.classList.remove("d-none");
    }
  }

  userName.addEventListener("input", (e) => {
    validation("mesName", e.target);
  });
  email.addEventListener("input", (e) => {
    validation("mesEmail", e.target);
  });
  password.addEventListener("input", (e) => {
    validation("mesPassword", e.target);
  });
}
