import './style.sass';

export default props => {
  const template = document.getElementById('product-template');
  const clone = document.importNode(template.content, true);

  const discount = clone.querySelector('.product__discount');
  discount.textContent = props.discount;

  const image = clone.querySelector('.product__image');
  image.src = props.image;

  const name = clone.querySelector('.product__name');
  name.textContent = props.name;
  const priceCreditCard = clone.querySelector('.product__price--credit-card');
  priceCreditCard.textContent = props.prices.creditCard;
  const priceOnline = clone.querySelector('.product__price--online');
  priceOnline.textContent = props.prices.online;
  const priceNormal = clone.querySelector('.product__price--normal');
  priceNormal.textContent = props.prices.normal;

  return clone;
};
