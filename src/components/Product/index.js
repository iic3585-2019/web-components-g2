import { find } from '@/helpers';

const create = props => {
  const template = document.getElementById('product-template');
  const clone = document.importNode(template.content, true);

  find(clone, '.discount', el => (el.textContent = props.discount));
  find(clone, '.image', el => (el.src = props.image));
  find(clone, '.name', el => (el.textContent = props.name));
  find(clone, '.price--credit', el => (el.textContent = props.prices.credit));
  find(clone, '.price--online', el => (el.textContent = props.prices.online));
  find(clone, '.price--normal', el => (el.textContent = props.prices.normal));

  return clone;
};

window.customElements.define(
  'app-product',
  class extends HTMLElement {
    constructor(props) {
      super();

      this.attachShadow({ mode: 'open' });
    }

    get props() {
      return this._props;
    }

    set props(props) {
      this._props = props;

      this.render();
    }

    render() {
      while (this.shadowRoot.firstChild)
        this.shadowRoot.removeChild(this.shadowRoot.firstChild);

      this.shadowRoot.appendChild(create(this.props));
    }
  }
);

export default props => {
  const component = document.createElement('app-product');
  component.props = props;

  return component;
};
