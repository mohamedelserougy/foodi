import { updateCartCount } from "./cartUtilite.js";

export function initProductDetails() {
  let mealsDetails = document.getElementById("mealDetails");

  let numItem = document.querySelector(".numItem");
  let { cart } = JSON.parse(sessionStorage.getItem("currentUser")) || {};

  updateCartCount();

  /* get product from local storage */
  let meal = JSON.parse(sessionStorage.getItem("selectedMeal"));
  console.log(meal);

  mealsDetails.innerHTML += `<div class="col-md-4">
            <div class="image mt-5">
              <img
              style="object-fit: cover; height: 400px;"
                class="rounded-2"
                src="${meal.image}"
                alt=""
              />
            </div>
          </div>
          <div class="col-md-8">
            <div class="inner mt-5">
              <h3>M${meal.name}</h3>

              <p>Category : ${meal.category}</p>
              <p>🔥${meal.calories} Calories</p>
              <p class="price my-3">
                price : <span class="fw-bold">${meal.price}$</span>
              </p>

              <p class="my-3 w-75">
                ${meal.description}
              </p>

              <button class="btn px-3 fw-semibold py-2 cart">
                Add to cart
              </button>
            </div>
          </div>`;

  let cartbtn = document.querySelector(".cart");

  cartbtn.addEventListener("click", () => {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
    currentUser.cart = currentUser.cart || [];

    if (!currentUser.cart.some((item) => item.id === meal.id)) {
      currentUser.cart.push(meal);
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      Toastify({
        text: "item added to cart successfully!.",
        duration: 1000,
        style: {
          background:
            "linear-gradient(to right, rgb(251, 86, 7), rgb(255, 140, 66))",
        },
      }).showToast();
      updateCartCount();
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let updatedUsers = users.map((user) => {
        if (user.email === currentUser.email) {
          return { ...user, cart: currentUser.cart };
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      Toastify({
        text: "item is already in cart !",
        duration: 1000,
        style: {
          background:
            "linear-gradient(to right, rgb(251, 86, 7), rgb(255, 140, 66))",
        },
      }).showToast();
    }
  });
}
