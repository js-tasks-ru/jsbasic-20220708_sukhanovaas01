/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 
 */

export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
  }

  render() {
    this.elem = document.createElement("TABLE");
    this.elem.insertAdjacentHTML(
      "beforeEnd",
      `<thead>        <tr>
    <th>Имя</th>
    <th>Возраст</th>
    <th>Зарплата</th>
    <th>Город</th>
    <th></th>
  </tr>
  </thead>`
    );
    this.elem.insertAdjacentHTML(
      "beforeEnd",
      `<tbody>${this.rows
        .map((item) => {
          return `<tr><td>${item.name}</td><td>${item.age}</td><td>${item.salary}
          </td><td>${item.city}</td><td><button class="remove-button">[x]</button></td></tr>`;
        })
        .join("")}</tbody>`
    );
    this.elem.addEventListener("click", this.onClick);
  }
  onClick(event) {
    if (event.target.tagName === "BUTTON") {
      event.target.closest("tr").remove();
    }
  }
}
