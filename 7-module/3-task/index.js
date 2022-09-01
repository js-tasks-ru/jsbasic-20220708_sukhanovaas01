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
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    console.log("event.clientX", event.clientX);
    console.log("left", left);
    console.log(
      "this.elem.getBoundingClientRect",
      this.elem.getBoundingClientRect()
    );
    let leftRelative = left / this.elem.offsetWidth;
    console.log("leftRelative", leftRelative);
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;
    let sliderValue = document.querySelector(".slider__value");
    sliderValue.innerHTML = value;
    let deletedClass = document.querySelector(".slider__step-active");
    deletedClass.classList.remove("slider__step-active");
    this.spans[value].classList.add("slider__step-active");
    let thumb = this.elem.querySelector(".slider__thumb");
    thumb.style.left = `${valuePercents}%`;
    let progress = this.elem.querySelector(".slider__progress");
    progress.style.width = `${valuePercents}%`;

    let btnClick = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });
    this.elem.dispatchEvent(btnClick);
  };
}
