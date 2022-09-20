import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.initCarousel();
  }
  render() {
    this.elem = createElement(` <!--Корневой элемент карусели-->
    <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
  
      <div class="carousel__inner">${this.slides
        .map((item) => {
          return `<div class="carousel__slide" data-id = ${item.id}>
      <img src="/assets/images/carousel/${
        item.image
      }" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${item.price.toFixed(2)}</span>
        <div class="carousel__title">${item.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
        })
        .join("")}</div></div>`);

    this.elem.addEventListener("click", this.onClick);
    this.elem.addEventListener("product-add", (event) => console.log(event));
  }

  initCarousel() {
    let position = 0;
    let carouselInner = this.elem.querySelector(".carousel__inner");
    let shift = 0;
    let next = this.elem.querySelector(".carousel__arrow_right");
    let prev = this.elem.querySelector(".carousel__arrow_left");

    position == 0 ? (prev.style.display = "none") : (prev.style.display = "");

    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".carousel__arrow_right")) {
        position++;
        shift -= carouselInner.offsetWidth;
        carouselInner.style.transform = `translateX(${shift}px)`;
      } else if (event.target.closest(".carousel__arrow_left")) {
        position--;
        shift += carouselInner.offsetWidth;
        carouselInner.style.transform = `translateX(${shift}px)`;
      }

      position >= this.slides.length - 1
        ? (next.style.display = "none")
        : (next.style.display = "");
      position == 0 ? (prev.style.display = "none") : (prev.style.display = "");
    });
  }

  onClick = (event) => {
    if (event.target.closest(".carousel__button")) {
      let btnClick = new CustomEvent("product-add", {
        detail: event.target.closest("[data-id]").dataset.id,
        bubbles: true,
      });
      this.elem.querySelector(".carousel__button").dispatchEvent(btnClick);
    }
  };
}
