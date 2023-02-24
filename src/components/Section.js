class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  setItem(element) {
    this._container.append(element);
  }
}

export { Section };
