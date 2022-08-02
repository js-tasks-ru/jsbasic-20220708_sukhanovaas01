function toggleText() {
  let button = document.querySelector(".toggle-text-button");

  button.addEventListener("click", (event) => {
    let text = document.querySelector("#text");

    if (event.target == button) {
      text.hidden = !text.hidden;
    }
  });
}
