export async function showLoading(time = 0.5) {
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) {
    loadingOverlay.classList.add("active");
  }
  await new Promise((resolve) => setTimeout(resolve, time * 1000));
  if (loadingOverlay) {
    loadingOverlay.classList.remove("active");
  }
}
