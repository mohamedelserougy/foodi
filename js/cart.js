import { updateCartCount } from "./cartUtilite.js";
export function initcart() {
  let displayPrice = document.querySelector(".totalPrice");
  let displaySubTotal = document.querySelector(".subTotal");
  let cartCheckout = document.querySelector(".cartCheckout");
  let numItem = document.querySelector(".numItem");
  let btnCheckout = document.querySelector(".checkOut");



  
  let { cart } = JSON.parse(sessionStorage.getItem("currentUser")) || {};

  /* update price */
  function updateTotalPrice() {
    let subTotal = cart
      .reduce((acc, meal) => acc + meal.price * meal.quantity, 0)
      .toFixed(3);

    displaySubTotal.textContent = `${subTotal} $`;

    let totalPrice = (subTotal * 1 + 4.99).toFixed(3);
    displayPrice.textContent = cart.length === 0 ? `0.00 $` : `${totalPrice} $`;
  }

  function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    updateTotalPrice();
    updateCartCount();
  }

  /* change local and session storage */
  function saveCart() {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
    currentUser.cart = cart;
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((user) =>
      user.id === currentUser.id ? currentUser : user
    );
    localStorage.setItem("users", JSON.stringify(users));
  }

  function renderCart() {
    cartCheckout.innerHTML = cart
      .map((meal) => {
        return `
          <div class="card mb-3 shadow-sm">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <img
                  style="object-fit: cover; height: 150px;"
                  src="${meal.image}"
                  class="img-fluid rounded-start"
                  alt="product-image"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body d-flex justify-content-between">
                  <div>
                    <h5 class="card-title fw-bold">${meal.name}</h5>
                    <p class="card-text text-muted">
                      price : <span class="fw-bold"> ${meal.price}$</span>
                    </p>
                  </div>
                  <div class="d-flex flex-column align-items-end">
                    <div
                      class="input-group input-group-sm mb-2"
                      style="width: 110px"
                    >
                      <button class="btn btn-outline-secondary decrease">-</button>
                      <input
                        type="number"
                        class="form-control text-center quantityInput"
                        value=${meal.quantity}
                        min="1"
                      />
                      <button class="btn btn-outline-secondary increase">+</button>
                    </div>
                    <div class="d-flex align-items-center">
                      <button class="btn btn-sm btn-outline-danger remove">
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      })
      .join("");

    /* remove item  */
    document.querySelectorAll(".remove").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        cart.splice(index, 1);
        saveCart();
        renderCart();
        updateTotalPrice();
        updateCartCount();
        Toastify({
          text: "meal removed successfully!",
          duration: 1000,
          style: {
            background:
              "linear-gradient(to right, rgb(251, 86, 7), rgb(255, 140, 66))",
          },
        }).showToast();
      });
    });

    /* decrease quantity */
    document.querySelectorAll(".decrease").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
          document.querySelectorAll(".quantityInput")[index].value =
            cart[index].quantity;
          saveCart();
          updateTotalPrice();
          Toastify({
            text: "meal quantity decreased successfully!",
            duration: 1000,
            style: {
              background:
                "linear-gradient(to right, rgb(251, 86, 7), rgb(255, 140, 66))",
            },
          }).showToast();
        }
      });
    });

    /* increase quantity */
    document.querySelectorAll(".increase").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        cart[index].quantity++;
        document.querySelectorAll(".quantityInput")[index].value =
          cart[index].quantity;
        saveCart();
        updateTotalPrice();
        Toastify({
          text: "meal quantity increased successfully!",
          duration: 1000,
          style: {
            background:
              "linear-gradient(to right, rgb(251, 86, 7), rgb(255, 140, 66))",
          },
        }).showToast();
      });
    });
  }

  btnCheckout.addEventListener("click", () => {
    Toastify({
      text: "order placed successfully",
      duration: 1000,
      style: {
        background:
          "linear-gradient(to right, rgb(251, 86, 7), rgb(255, 140, 66))",
      },
    }).showToast();
    clearCart();
    setTimeout(() => {
      window.location.href = "orderDone.html";
    }, 1500);
  });

  window.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
    updateTotalPrice();
  });
}
