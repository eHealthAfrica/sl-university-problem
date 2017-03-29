
const view = {
  registration: document.querySelector('div.registration'),
  edit: document.querySelector('div.edit'),
  list: document.querySelector('div.list'),

  addEvent: (el, type, handler) => {
    if (el.attachEvent)
      el.attachEvent('on'+type, handler);
    else
      el.addEventListener(type, handler);
  },
  
  removeEvent: (el, type, handler) => {
    if (el.detachEvent)
      el.detachEvent('on'+type, handler);
    else
      el.removeEventListener(type, handler);
  }
}
