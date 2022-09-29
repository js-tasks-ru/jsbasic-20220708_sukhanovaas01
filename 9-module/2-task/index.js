import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    let carousel = new Carousel(slides);
    document.querySelector(`[ data-carousel-holder ] `).append(carousel.elem);

    let ribbonMenu = new RibbonMenu(categories);
    document.querySelector(`[ data-ribbon-holder ] `).append(ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document
      .querySelector(`[ data-slider-holder ] `)
      .append(this.stepSlider.elem);

    let cartIcon = new CartIcon();
    document.querySelector(`[ data-cart-icon-holder ] `).append(cartIcon.elem);
    console.log(cartIcon);

    let cart = new Cart(cartIcon);
    console.log("cart", cart);
    console.log("cart.cartItems", cart.cartItems);

    const products = await this.showProducts();

    let productsGrid = new ProductsGrid(products);

    document
      .querySelector(`[ data-products-grid-holder ] `)
      .append(productsGrid.elem);
    console.log(products);

    this.addToCart(products, cart);
    this.filterSpiciness({ productsGrid, products });
  }

  async showProducts(cart) {
    const response = await fetch("products.json");

    const products = await response.json();

    return products;
  }

  addToCart(products, cart) {
    document.body.addEventListener("product-add", (event) => {
      console.log("event.detail", event.detail);
      console.log("products", products);
      let productToAdd = products.find(
        (product) => product.id === event.detail
      );
      console.log("productToAdd", productToAdd);

      if (productToAdd) {
        cart.addProduct(productToAdd);
      }
    });
  }

  filterSpiciness({ productsGrid, products }) {
    this.stepSlider.elem.addEventListener("slider-change", (event) => {
      console.log("event.detail", event.detail);
      console.log("productsGrid", productsGrid);

      productsGrid.updateFilter({ maxSpiciness: event.detail });
    });
  }
}
