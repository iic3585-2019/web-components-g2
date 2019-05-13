import { htmlToNode } from '../../helpers.mjs'

const rawTemplate = `
<template id="rating-template">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <div class="component">
    <slot name="star" class="star"></slot>
  </div>

  <style>
    .star {
      color: #FFC107;

      cursor: pointer;
    }

    .star--inactive {
      opacity: .5;
    }
  </style>
</template>
`

document.body.appendChild(htmlToNode(rawTemplate))

export default window.customElements.define(
  'app-rating',
  class extends HTMLElement {
    constructor(props) {
      super();

      // copies and removes the slotted star for future uses
      const star = this.querySelector('*[slot="star"]');
      this.star = document.importNode(star, true);
      star.remove();

      this.attachShadow({ mode: 'open' });
      this.render();
    }

    get currentValue() {
      return this.getAttribute('current-value');
    }

    set currentValue(newCurrentValue) {
      this.setAttribute('current-value', newCurrentValue);

      this.render();
    }

    get maxValue() {
      return this.getAttribute('max-value');
    }

    set maxValue(newMaxValue) {
      this.setAttribute('max-value', newMaxValue);

      this.render();
    }

    create(props) {
      const template = document.getElementById('rating-template');
      const clone = document.importNode(template.content, true);

      const component = clone.querySelector('.component');

      for (let i = 0; i < props.maxValue; i++) {
        const starClone = document.importNode(this.star, true);
        starClone.classList.add('star');
        starClone.addEventListener('click', () => (this.currentValue = i + 1));

        if (i >= props.currentValue) starClone.classList.add('star--inactive');

        component.appendChild(starClone);
      }

      return clone;
    }

    render() {
      const component = this.shadowRoot.querySelector('.component');
      if (component) this.shadowRoot.removeChild(component);

      this.shadowRoot.appendChild(
        this.create({
          currentValue: Number(this.currentValue),
          maxValue: Number(this.maxValue),
        })
      );
    }
  }
);
