import './style.sass';

export default props => {
  const template = document.getElementById('rating-template');
  const clone = document.importNode(template.content, true);

  const star = clone.querySelector('.star');

  for (let i = 0; i < props.currentValue; i++) {
    const starClone = document.importNode(star, true);

    clone.appendChild(starClone);
  }

  for (let i = 0; i < props.maxValue - props.currentValue; i++) {
    const starClone = document.importNode(star, true);
    starClone.classList.add('star--inactive');

    clone.appendChild(starClone);
  }

  star.remove();

  return clone;
};
