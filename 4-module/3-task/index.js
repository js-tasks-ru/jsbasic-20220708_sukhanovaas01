function highlight(table) {
  for (let tr of table.rows) {
    if (tr.cells[1].innerHTML < "18") {
      tr.style.textDecoration = "line-through";
    }
    if (tr.cells[3].dataset.available === "true") {
      tr.classList.add("available");
    } else if (tr.cells[3].dataset.available === "false") {
      tr.classList.add("unavailable");
    } else {
      tr.hidden = true;
    }
    if (tr.cells[2].innerHTML === "f") {
      tr.classList.add("female");
    } else if (tr.cells[2].innerHTML === "m") {
      tr.classList.add("male");
    }
  }
}
