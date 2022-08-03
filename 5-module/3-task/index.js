function initCarousel() {
  let position = 0;

  let carousel = document.querySelector(".carousel");
  console.log("carousel =", carousel);

  let carouselInner = carousel.querySelector(".carousel__inner"); //его надо сдвигать на ширину слайда

  let shift = 0;
  let shift1 = 0;
  let next = document.querySelector(".carousel__arrow_right");
  let prev = document.querySelector(".carousel__arrow_left");
  position == 0 ? (prev.style.display = "none") : (prev.style.display = "");

  carousel.addEventListener("click", (event) => {
    console.log("eventTarget =", event.target);

    if (event.target.closest(".carousel__arrow_right")) {
      // проверка <img> на соответствие нужному родителю
      position++;
      shift += carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(${-shift}px)`; // как двигать вперед
    } else if (event.target.closest(".carousel__arrow_left")) {
      position--;
      shift -= carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(${-shift}px)`; // назад
    }
    position >= 3 ? (next.style.display = "none") : (next.style.display = "");
    position == 0 ? (prev.style.display = "none") : (prev.style.display = "");
  });
  console.log("shift =", shift);
}
