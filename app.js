const trigger = document.querySelector(".search-trigger");
const form = document.querySelector("form");

trigger.addEventListener("click", () => {
  form.classList.add("active");
  trigger.style.display = "none";
});
