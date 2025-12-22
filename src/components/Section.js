 class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
     this._container = document.querySelector(containerSelector)
  }

 renderItems() {
  this._initialArray.forEach((item) => {
    const cardElement = this._renderer(item);
    this.addItem(cardElement);
  });
}

  addItem(element) {
    this._container.appendChild(element);
  }
}
export default Section;