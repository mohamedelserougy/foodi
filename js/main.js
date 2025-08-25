import { initLogin } from "./login.js";
import { initSignup } from "./signup.js";
import { initHome } from "./home.js";
import { initProductDetails } from "./productDetails.js";
import { initcart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.id;

  switch (page) {
    case "login":
      initLogin();
      break;
    case "signup":
      initSignup();
      break;
    case "home":
      initHome();
      break;
    case "productDetails":
      initProductDetails();
      break;
    case "cart":
      initcart();
      break;
    default:
      console.log("No script for this page");
  }
});
