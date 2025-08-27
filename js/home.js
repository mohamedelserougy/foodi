import { data } from "./dataProduct.js";
import { updateCartCount } from "../utilites/cartUtilite.js";
import { showLoading } from "../utilites/loading.js";
import { goCartPage, logout } from "../models/models.js";

export function initHome() {
  let next = document.getElementById("next");
  let previous = document.getElementById("previous");
  let slider = document.getElementById("slider");
  let sliderTitle = document.getElementById("sliderTitle");
  let sliderText = document.getElementById("sliderText");
  let sliderBtn = document.getElementById("sliderBtn");
  let product = document.getElementById("diplayProduct");
  let buttons = document.querySelectorAll(".filter-btn");
  let priceInput = document.getElementById("priceInput");
  let cartPage = document.querySelector(".cartPage");
  let numItem = document.querySelector(".numItem");
  let btnLogout = document.querySelector(".logout");

  let { cart } = JSON.parse(sessionStorage.getItem("currentUser")) || {};

  let sliderarr = [
    {
      image: "../images/6db6a08046242c265ee4fe6a7935e17a54331b22.png",
      title: "Welcome to Foodi",
      text: "Your favorite meals delivered right to your doorstep. Explore our menu and order now!",
      button: "Order Now",
    },
    {
      image: "../images/meal-1.jpg",
      title: "Fresh & Delicious",
      text: "We serve only the freshest ingredients to make every meal unforgettable.",
    },
    {
      image: "../images/meal-2.jpg",
      title: "Fast Delivery",
      text: "Hot meals, delivered quickly and safely right to your door.",
    },
    {
      image: "../images/meal-3.jpg",
      title: "Taste the Difference",
      text: "Discover flavors that bring joy to your table every single time.",
    },
    {
      image: "../images/meal-4.jpg",
      title: "Special Offers",
      text: "Enjoy exclusive discounts and deals on your favorite meals today!",
    },
  ];

  let currentindex = 0;

  next.addEventListener("click", () => {
    currentindex < sliderarr.length - 1 ? currentindex++ : (currentindex = 0);
    updateContent(currentindex);
  });

  previous.addEventListener("click", () => {
    currentindex > 0 ? currentindex-- : (currentindex = sliderarr.length - 1);
    updateContent(currentindex);
  });

  function updateContent(index) {
    sliderTitle.style.opacity = 0;
    sliderText.style.opacity = 0;
    sliderBtn.style.opacity = 0;

    setTimeout(() => {
      slider.style.backgroundImage = `url(${sliderarr[index].image})`;
      sliderTitle.textContent = sliderarr[index].title;
      sliderText.textContent = sliderarr[index].text;
      if (sliderarr[index].button) {
        sliderBtn.textContent = sliderarr[index].button;
        sliderBtn.style.display = "inline-block";
      } else {
        sliderBtn.style.display = "none";
      }

      sliderTitle.style.opacity = 1;
      sliderText.style.opacity = 1;
      sliderBtn.style.opacity = 1;
    }, 300);
  }
  sliderBtn.addEventListener("click", () => {
    let targetSection = document.getElementById("meals");
    targetSection.scrollIntoView({ behavior: "smooth" });
  });

  /* prev code of filter  */
  // btnpizza.addEventListener("click", () => {
  //   const filteredData = data.filter((item) => {
  //     return item.category === "Pizza";
  //   });
  //   displayData(filteredData);
  // });

  // apply.addEventListener("click", () => {
  //   const filteredData = data.filter((item) => item.price <= priceInput.value);
  //   displayData(filteredData);
  // });

  /* filteration*/
  let currentCategory = "All";

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      await showLoading();
      currentCategory = btn.getAttribute("data-category");
      applyFilters();

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  priceInput.addEventListener("input", applyFilters);

  function applyFilters() {
    let filteredData = data;

    if (currentCategory !== "All") {
      filteredData = filteredData.filter(
        (item) => item.category === currentCategory
      );
    }

    if (priceInput.value) {
      filteredData = filteredData.filter(
        (item) => item.price <= priceInput.value
      );
    }

    filteredData.length ? displayData(filteredData) : displayData(data);
  }

  function displayData(products) {
    product.innerHTML = products
      .map((item) => {
        return `
      <div class="col-sm-12 col-md-6 col-lg-3 p-2">
        <div class="card">
          <div class="image position-relative">
            <img
              style="object-fit: cover; height: 200px;"
              src="${item.image}"
              class="card-img-top"
              alt="${item.name}"
            />
            <i
              class="fa-solid fa-heart position-absolute end-0 top-0 m-2 fs-2 heart"
              style="color: #fb4407"
            ></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            🔥 ${item.calories} Calories
            <div class="d-flex justify-content-between align-items-center mt-2">
              <p class="price fw-bold mt-2 fs-4">${item.price}$</p>
              <div class="links d-flex gap-4">
                <i class="fa-solid fa-eye fs-4 showProduct" ></i>
                <i class="fa-solid fa-cart-plus fs-4 productCheckout"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
      })
      .join("");

    document.querySelectorAll(".showProduct").forEach((eye, index) => {
      eye.addEventListener("click", () => {
        let meal = products[index];
        sessionStorage.setItem("selectedMeal", JSON.stringify(meal));
        window.location.href = `productDetails.html`;
      });
    });

    document.querySelectorAll(".productCheckout").forEach((cartt, index) => {
      cartt.addEventListener("click", () => {
        let meal = products[index];

        /* to get current user  */
        let currentUser =
          JSON.parse(sessionStorage.getItem("currentUser")) || {};
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
    });
  }

  cartPage.addEventListener("click", goCartPage);
  btnLogout.addEventListener("click", logout);

  window.addEventListener("DOMContentLoaded", () => {
    displayData(data);
    updateCartCount();
  });
}
