export function initcart() {
  let displayPrice = document.querySelector(".totalPrice");
  let displaySubTotal = document.querySelector(".subTotal");
  let subTotal = 0;
  let totalPrice = 0;

  let cartCheckout = document.querySelector(".cartCheckout");
  console.log(cartCheckout);

  let { cart } = JSON.parse(sessionStorage.getItem("currentUser")) || {};
  console.log(cart);

  function updateTotalPrice() {
    subTotal = cart.reduce((acc, meal) => acc + meal.price, 0).toFixed(3);
    displaySubTotal.textContent = `${subTotal} $`;
    totalPrice = (subTotal * 1 + 4.99).toFixed(3);
    displayPrice.textContent = `${totalPrice} $`;
  }
  cartCheckout.innerHTML += cart
    .map((meal) => {
      return `<!-- Left side products -->
          
            <!-- Product card 1 -->
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
                        <button class="btn btn-outline-secondary" id= "decrease">-</button>
                        <input
                          type="number"
                          class="form-control text-center"
                          value="2"
                          min="1"
                        />
                        <button class="btn btn-outline-secondary" id = "increse">+</button>
                      </div>
                      <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-danger" id= "remove">
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
    })
    .join("");

  window.onload = updateTotalPrice();
}
