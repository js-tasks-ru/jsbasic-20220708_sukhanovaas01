function initCarousel() {
  let position = 0;
  let carousel = document.querySelector(".carousel");
  let carouselInner = carousel.querySelector(".carousel__inner");
  let shift = 0;
  let next = document.querySelector(".carousel__arrow_right");
  let prev = document.querySelector(".carousel__arrow_left");

  position == 0 ? (prev.style.display = "none") : (prev.style.display = "");

  carousel.addEventListener("click", (event) => {
    if (event.target.closest(".carousel__arrow_right")) {
      position++;
      shift -= carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(${shift}px)`;
    } else if (event.target.closest(".carousel__arrow_left")) {
      position--;
      shift += carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(${shift}px)`;
    }

    position >= 3 ? (next.style.display = "none") : (next.style.display = "");
    position == 0 ? (prev.style.display = "none") : (prev.style.display = "");
  });
}
