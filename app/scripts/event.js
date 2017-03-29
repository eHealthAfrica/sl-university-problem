
const eventNames = {
  loaded: 'LOADED',
  login: 'LOGIN',
  logout: 'LOGOUT',
  edit: 'EDIT',
  list: 'LIST',
  saved: 'SAVED'
}

// Event Module
class Event{
  constructor(){
    this.events = {};
  }

  on(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  off(eventName, fn) {
    if (this.events[eventName]) {
        for (var i = 0; i < this.events[eventName].length; i++) {
            if (this.events[eventName][i] === fn) {
                this.events[eventName].splice(i, 1);
                break;
            }
        };
    }
  }

  trigger(eventName, data) {
    if (this.events[eventName]) {
        this.events[eventName].forEach(function(fn) {
            fn(data);
        });
    }
  }
}

const events = new Event();
