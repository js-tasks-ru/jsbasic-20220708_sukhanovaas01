function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let tr = table.rows[i];
    let td = tr.cells[i];
    td.style.backgroundColor = "red";
  }
}
