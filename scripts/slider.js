const slider = document.querySelector(".feed__items");
const prevButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

const scrollAmount = 280;

nextButton.addEventListener("click", () => {
  slider.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

prevButton.addEventListener("click", () => {
  slider.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});
