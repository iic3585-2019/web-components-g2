export const find = (el, selector, callback) =>
  callback(el.querySelector(selector));
