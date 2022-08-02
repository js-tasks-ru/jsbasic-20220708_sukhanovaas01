function toggleText() {
  document.addEventListener("click", (event) => {
    let button = document.querySelector(".toggle-text-button");
    if (event.target == button) {
      console.log(event.target == button);
      console.log(button);
      let text = document.querySelector("#text");
      text.hidden = !text.hidden;
    } else {
      return;
    }
  });
}
