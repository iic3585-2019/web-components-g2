import tab from './tab.mjs';
import { htmlToNode } from '../../helpers.mjs'

const rawTemplate = `
<template id="navbar-template">
  <div class="component">
    <slot name="logo" class="logo"></slot>

    <slot></slot>
  </div>

  <style>
    .component {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;

      display: flex;
      align-items: center;

      font-family: 'Roboto', sans-serif;

      height: 48px;

      background-color: #FFFFFF;
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    }

    .ghost {
      height: 48px;
    }

    ::slotted(.logo) {
      width: 48px;
      height: 48px;
    }
  </style>
</template>
`;

document.body.appendChild(htmlToNode(rawTemplate))

export default window.customElements.define(
  'app-navbar',
  class extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.render();
    }

    create() {
      const template = document.getElementById('navbar-template');
      const clone = document.importNode(template.content, true);

      const component = clone.querySelector('.component');

      const ghost = htmlToNode('<div class="ghost" />');
      component.parentNode.insertBefore(ghost, component.nextSibling);

      return clone;
    }

    render() {
      const component = this.shadowRoot.querySelector('.component');
      if (component) this.shadowRoot.removeChild(component);

      this.shadowRoot.appendChild(this.create());
    }
  }
);
