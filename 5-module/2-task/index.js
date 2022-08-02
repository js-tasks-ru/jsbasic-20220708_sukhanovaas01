function toggleText() {
  document.addEventListener("click", (event) => {
    let button = document.querySelector(".toggle-text-button");
    if (event.target == button) {
      let text = document.querySelector("#text");
      text.hidden = !text.hidden;
    }
  });
}
