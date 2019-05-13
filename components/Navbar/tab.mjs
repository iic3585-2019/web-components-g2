import { htmlToNode } from '../../helpers.mjs'

const rawTemplate = `
<template id="tab-template">
  <div class="component">
    <div class="text"></div>

    <div class="items">
      <slot></slot>
    </div>
  </div>

  <style>
    .component {
      position: relative;
    }

    .text {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 48px;

      padding-right: 16px;
      padding-left: 16px;
    }

    .text.with-uri {
      cursor: pointer;
    }

    .text.with-uri:hover {
      background-color: red;
    }

    .items {
      display: none;

      position: absolute;
      top: 48px;
      right: 0;
      left: 0;

      background-color: #FFFFFF;
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    }

    .items.open {
      display: block;
    }
  </style>
</template>
`;

document.body.appendChild(htmlToNode(rawTemplate))

export default window.customElements.define(
  'app-tab',
  class extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.render();
    }

    get text() {
      return this.getAttribute('text');
    }

    set text(newText) {
      this.setAttribute('text', newText);

      this.render();
    }

    get uri() {
      return this.getAttribute('uri');
    }

    set uri(newURI) {
      this.setAttribute('uri', newURI);

      this.render();
    }

    create() {
      const template = document.getElementById('tab-template');
      const clone = document.importNode(template.content, true);

      const component = clone.querySelector('.component');
      const text = component.querySelector('.text');
      const items = component.querySelector('.items');

      // setting up <text>
      text.textContent = this.text || this.textContent;
      if (this.uri) {
        text.addEventListener('click', () => window.open(this.uri, '_blank'));
        text.classList.add('with-uri');
      }

      // setting up <items>
      if (this.text) {
        component.addEventListener('mouseover', () => {
          items.classList.add('open');
        });
        component.addEventListener('mouseout', () => {
          items.classList.remove('open');
        });
      }

      return clone;
    }

    render() {
      const component = this.shadowRoot.querySelector('.component');
      if (component) this.shadowRoot.removeChild(component);

      this.shadowRoot.appendChild(this.create());
    }
  }
);
