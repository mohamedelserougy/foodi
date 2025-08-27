import { initLogin } from "./login.js";
import { initSignup } from "./signup.js";
import { initHome } from "./home.js";
import { initProductDetails } from "./productDetails.js";
import { initcart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.id;

  let flag = sessionStorage.getItem("currentUser");

  switch (page) {
    case "login":
      initLogin();
      break;
    case "signup":
      initSignup();
      break;
    case "home":
      if (flag) {
        initHome();
      } else {
        window.location.href = "./index.html";
      }
      break;
    case "productDetails":
      if (flag) {
        initProductDetails();
      } else {
        window.location.href = "./index.html";
      }
      break;
    case "cart":
      if (flag) {
        initcart();
      } else {
        window.location.href = "./index.html";
      }
      break;
    default:
      console.log("No script for this page");
  }
});
