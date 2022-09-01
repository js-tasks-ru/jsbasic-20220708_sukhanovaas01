import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
  }
  render() {
    this.elem = createElement(`<div class="slider">

   <!--Ползунок слайдера с активным значением-->
   <div class="slider__thumb" style="left: 50%;">
     <span class="slider__value">1</span>
   </div>

   <!--Заполненная часть слайдера-->
   <div class="slider__progress" style="width: 50%;"></div>

   <!--Шаги слайдера-->
   <div class="slider__steps">
   </div>
 </div>`);

    this.spanCollection();
    this.initEventListeners();
  }

  initEventListeners() {
    this.elem.addEventListener("click", this.onClick);
    this.elem.addEventListener("pointerdown", this.onPointerDown);
  }

  spanCollection() {
    const activeStep = this.elem.querySelector(".slider__steps");

    for (let i = 0; i < this.steps; i++) {
      activeStep.insertAdjacentHTML("afterBegin", `<span></span>`);
    }

    this.spans = activeStep.querySelectorAll("span");

    this.spans[this.value].classList.add("slider__step-active");
  }

  onClick = (event) => {
    let thumb = this.elem.querySelector(".slider__thumb");
    thumb.ondragstart = () => false;
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;
    let sliderValue = document.querySelector(".slider__value");
    sliderValue.innerHTML = value;
    let deletedClass = document.querySelector(".slider__step-active");
    deletedClass.classList.remove("slider__step-active");
    this.spans[value].classList.add("slider__step-active");
    thumb.style.left = `${valuePercents}%`;
    let progress = this.elem.querySelector(".slider__progress");
    progress.style.width = `${valuePercents}%`;

    let btnClick = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });
    this.elem.dispatchEvent(btnClick);
  };

  onPointerDown = (event) => {
    event.preventDefault();
    document.addEventListener("pointermove", this.onPointerMove);
    this.elem.addEventListener("pointerup", this.onPointerUp);
  };

  onPointerMove = (event) => {
    event.preventDefault();
    document.addEventListener("pointermove", this.onPointerMove);
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }
    let leftPercents = leftRelative * 100;
    let sliderValue = document.querySelector(".slider__value");
    let thumb = this.elem.querySelector(".slider__thumb");
    thumb.style.left = `${leftPercents}%`;
    let progress = this.elem.querySelector(".slider__progress");
    progress.style.width = `${leftPercents}%`;
    this.elem.classList.add("slider_dragging");
  };

  onPointerUp = (event) => {
    document.removeEventListener("pointermove", this.onPointerMove);
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    this.elem.classList.remove("slider_dragging");

    let btnClick = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });
    this.elem.dispatchEvent(btnClick);
  };
}
