window.customElements.define(
  'app-product',
  class extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.render();
    }

    create() {
      const template = document.getElementById('product-template');
      const clone = document.importNode(template.content, true);

      return clone;
    }

    render() {
      const component = this.shadowRoot.querySelector('.component');
      if (component) this.shadowRoot.removeChild(component);

      this.shadowRoot.appendChild(this.create());
    }
  }
);

export default () => {
  const component = document.createElement('app-product');

  return component;
};
