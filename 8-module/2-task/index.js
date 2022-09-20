import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();

    this.filterData();
  }
  render() {
    this.elem = createElement(`<div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>`);
  }

  filterData() {
    console.log(
      "0",
      this.elem.querySelector(".products-grid__inner").innerHTML
    );
    this.elem.querySelector(".products-grid__inner").innerHTML = "";
    console.log(
      "1",
      this.elem.querySelector(".products-grid__inner").innerHTML
    );

    for (let product of this.products) {
      if (product.nuts && this.filters.noNuts) {
        continue;
        // continue означает переход от проверки продукта по всем 4 параметрам к другому продукту
        // в случае, если оба условия истинны
      }
      if (!product.vegeterian && this.filters.vegeterianOnly) {
        continue;
      }
      if (product.spiciness > this.filters.maxSpiciness) {
        continue;
      }
      if (product.category != this.filters.category && this.filters.category) {
        continue;
      }

      let card = new ProductCard(product);
      this.elem.querySelector(".products-grid__inner").append(card.elem);
    }
  }
  updateFilter(filters) {
    Object.assign(this.filters, filters);

    this.filterData();
  }
}
