import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render();
    this.scrollMenu();
    this.initEventListeners();
  }
  render() {
    this.elem = createElement(`<!--Корневой элемент RibbonMenu-->
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      
      <nav class="ribbon__inner">${this.categories
        .map((item) => {
          return `<a href="#" class="ribbon__item" data-id=${item.id}>${item.name}</a>`;
        })
        .join("")}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>`);
  }

  scrollMenu() {
    let ribbonInner = this.sub("inner");

    this.sub("arrow_left").classList.remove("ribbon__arrow_visible");

    ribbonInner.firstElementChild.classList += " ribbon__item_active";
    ribbonInner.lastElementChild.dataset.id += " ribbon__item_active";

    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".ribbon__arrow_right")) {
        ribbonInner.scrollBy(350, 0);
      }

      if (event.target.closest(".ribbon__arrow_left")) {
        console.log(event.target);
        ribbonInner.scrollBy(-350, 0);
      }
    });

    this.hideArrow(ribbonInner);
  }

  hideArrow(ribbonInner) {
    ribbonInner.addEventListener("scroll", (event) => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      scrollLeft < 1
        ? this.sub("arrow_left").classList.remove("ribbon__arrow_visible")
        : this.sub("arrow_left").classList.add("ribbon__arrow_visible");

      scrollRight < 1
        ? this.sub("arrow_right").classList.remove("ribbon__arrow_visible")
        : this.sub("arrow_right").classList.add("ribbon__arrow_visible");
    });
  }

  initEventListeners() {
    this.elem.addEventListener("click", this.onClick);
    this.elem.addEventListener("ribbon-select", (event) => console.log(event));
  }

  onClick = (event) => {
    if (event.target.classList.contains("ribbon__item")) {
      event.preventDefault();
      this.sub("item_active").classList.remove("ribbon__item_active");
      event.target.classList += " ribbon__item_active";

      let btnClick = new CustomEvent("ribbon-select", {
        detail: event.target.closest("[data-id]").dataset.id,
        bubbles: true,
      });
      this.sub("inner").dispatchEvent(btnClick);
    }
  };

  sub(reference) {
    return this.elem.querySelector(`.ribbon__${reference}`);
  }
}
