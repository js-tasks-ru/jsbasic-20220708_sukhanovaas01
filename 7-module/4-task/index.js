import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.render();

    this.spanCollection(value);
    this.setValue(value);
    this.initEventListeners();
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
    console.log(this.elem);
  }

  spanCollection(value) {
    for (let i = 0; i < this.steps; i++) {
      this.sub("steps").insertAdjacentHTML("afterBegin", `<span></span>`);
    }
    this.spans = this.sub("steps").querySelectorAll("span");
  }

  setValue(value) {
    this.value = value;
    let valuePercents = (value / this.segments) * 100;
    this.sub("thumb").style.left = `${valuePercents}%`;
    this.sub("progress").style.width = `${valuePercents}%`;
    this.sub("value").innerHTML = value;

    if (this.sub("step-active")) {
      this.sub("step-active").classList.remove("slider__step-active");
    }
    this.sub("steps").children[this.value].classList.add("slider__step-active");
  }

  initEventListeners() {
    this.elem.addEventListener("click", this.onClick);
    this.elem.addEventListener("pointerdown", this.onPointerDown);
  }

  onClick = (event) => {
    let leftRelative =
      (event.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    this.setValue(Math.round(leftRelative * this.segments));

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  };

  onPointerDown = (event) => {
    event.preventDefault();
    document.addEventListener("pointermove", this.onPointerMove);
    this.elem.addEventListener("pointerup", this.onPointerUp);
    // возможно сюда стоит дописать логику, чтобы решить проблему
  };

  onPointerMove = (event) => {
    event.preventDefault();

    let leftRelative =
      (event.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    leftRelative < 0 ? (leftRelative = 0) : leftRelative;

    leftRelative > 1 ? (leftRelative = 1) : leftRelative;

    let leftPercents = leftRelative * 100;
    this.sub("thumb").style.left = `${leftPercents}%`;
    this.sub("progress").style.width = `${leftPercents}%`;
    this.elem.classList.add("slider_dragging");
  };

  onPointerUp = (event) => {
    document.removeEventListener("pointermove", this.onPointerMove);

    let leftRelative =
      (event.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    this.setValue(Math.round(leftRelative * this.segments));

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
    this.onDragStop();
  };

  onDragStop() {
    this.sub("thumb").ondragstart = function () {
      return false;
    };
  }

  sub(reference) {
    return this.elem.querySelector(`.slider__${reference}`);
  }
}
