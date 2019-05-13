import { htmlToNode } from '../../helpers.mjs'

const rawTemplate = `
<template id="product-template">
  <div class="component">
    <slot name="discount" class="discount"></slot>

    <slot name="image" class="image"></slot>

    <div class="body">
      <slot name="name" class="name"></slot>

      <slot name="price-credit" class="price price--credit"></slot>
      <div>
        Internet: <slot name="price-online" class="price price--online"></slot>
      </div>
      <div>
        Normal: <slot name="price-normal" class="price price--normal"></slot>
      </div>
    </div>
  </div>

  <style>
    .component {
      display: inline-flex;
      flex-direction: column;
      align-items: center;

      font-family: 'Roboto', sans-serif;

      border-radius: 2px;
    }

    .discount {
      align-self: flex-end;

      display: inline-block;

      font-size: 2rem;
      font-weight: bold;
      color: #FFFFFF;

      padding: .5rem .75rem;

      background-color: #F44336;
      border-radius: 2px;
    }

    ::slotted(.image) {
      padding: 1rem;
    }

    .body {
      padding-right: 1rem;
      padding-bottom: 1rem;
      padding-left: 1rem;
    }

    .name {
      font-size: 2rem;
      font-weight: bold;
    }

    .price--credit {
      font-size: 2rem;
      font-weight: bold;
      color: #2196F3;
    }

    .price--online {
      display: inline-block;
    }

    .price--normal {
      display: inline-block;

      text-decoration: line-through;
    }
  </style>
</template>
`;

document.body.appendChild(htmlToNode(rawTemplate))

export default window.customElements.define(
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
