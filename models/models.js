export function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "./index.html";
}

export function goCartPage() {
  window.location.href = "cart.html";
}
