
// Registration Module
class Registration{
  constructor(){
    this.init();
  }

  hide() {
    view.registration.style = 'display: None;';
  }

  show() {
    view.registration.style = 'display: block;';
  }

  save(e) {
    e.preventDefault();
    let val = this.username.value;
    if (val !== '')
      this.user = val;
    else
      alert('You did not supply a username, X');
    
    events.trigger(eventNames.login);
  }

  bindEventHandlers() {
    view.addEvent(this.saveUser, 'click', this.save.bind(this));
  }

  init() {
    this.user = 'X Doe';
    this.saveUser = document.getElementById('saveUser');
    this.username = document.getElementById('username');
    this.bindEventHandlers();
    events.on(eventNames.login, this.hide.bind(this));
    events.on(eventNames.logout, this.show.bind(this));
  }
}

const registration = new Registration();