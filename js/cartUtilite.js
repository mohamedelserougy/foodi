export function updateCartCount() {
  let numItem = document.querySelector(".numItem");
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
  let cart = currentUser.cart || [];

  if (cart.length === 0) {
    numItem.classList.add("d-none");
  } else {
    numItem.classList.remove("d-none");
    numItem.textContent = cart.length;
  }
}
