import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
  }

  render() {
    this.div = document.createElement("div");

    this.div.innerHTML = `<div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>`;

    this.element = this.div.firstElementChild;

    this.initEventListeners();
  }

  initEventListeners() {
    this.element.addEventListener("click", this.onClick);
    document.addEventListener("keydown", this.onKeyDown);
  }

  open() {
    document.body.append(this.element);
    document.body.classList.add("is-modal-open");
  }

  setTitle(title) {
    const modalTitle = this.element.querySelector(".modal__title");
    modalTitle.innerHTML = title;
  }

  setBody(body) {
    const modalBody = this.element.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.append(body);
  }

  close() {
    this.element.remove();
    this.element.removeEventListener("keydown", this.onKeyDown);
    document.body.classList.remove("is-modal-open");
  }

  onClick = (event) => {
    if (event.target.closest(".modal__close")) {
      this.element.remove();
      document.body.classList.remove("is-modal-open");
      this.element.removeEventListener("click", this.onClick);
      document.removeEventListener("keydown", this.onKeyDown);
    }
  };

  onKeyDown = (event) => {
    if (event.code === "Escape") {
      this.element.remove();
      document.body.classList.remove("is-modal-open");
      this.element.removeEventListener("click", this.onClick);
      document.removeEventListener("keydown", this.onKeyDown);
    }
  };
}
