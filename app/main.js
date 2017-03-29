// useful resource: https://plainjs.com/

const eventNames = {
  loaded: 'LOADED',
  login: 'LOGIN',
  logout: 'LOGOUT',
  edit: 'EDIT',
  list: 'LIST',
  saved: 'SAVED'
}

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

class Post{
  constructor(){
    this.posts = [];
    this.API = '';
  }

  getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = () => {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
  }

  postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
  }

  savePost(title, body) {  // ajax
    let post = {
      id: this.posts.length + 1,
      title: title,
      body: body,
      lastModified: registration.user
    }

    this.posts.push(post);
    events.trigger(eventNames.saved, post);
  }

  getPost(id) {  // ajax
    return this.posts.filter((p) => p.id == id)[0];
  }
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

// List Module
class List{
  constructor(){
    this.init();
  }

  hide() {
    view.list.style = 'display: None;';
    this.unbindTableRowClick();
  }

  show() {
    view.list.style = 'display: block;';
    this.prepareTable();
  }

  create(e) {
    e.preventDefault();
    events.trigger(eventNames.edit);
  }

  prepareTable() {
    if (posts.posts.length == 0) {
      this.table.style = 'display: None;';
      this.postLess.style = 'display: block;';
    }
    else {
      this.table.style = 'display: block;';
      this.postLess.style = 'display: None;';

      // bind event handlers
      this.bindTableRowClick();
    }
  }

  postCreate(post) {
    let tableRow = document.createElement('tr');
    tableRow.id = post.id;
    this.tableRowIds.push(post.id);
    
    let rowTitle = document.createElement('td');
    rowTitle.innerText = post.title;
    
    let rowLastModifiedBy = document.createElement('td');
    rowLastModifiedBy.innerText = post.lastModified;

    tableRow.appendChild(rowTitle);
    tableRow.appendChild(rowLastModifiedBy);
    document.getElementById('tbody').appendChild(tableRow);
  }

  edit(id) {
    events.trigger(eventNames.edit, id);
  }

  bindTableRowClick() {
    this.tableRowIds.forEach((id) => {
      view.addEvent(document.getElementById(id), 'click', this.edit.bind(this, id))
    });
  }

  unbindTableRowClick() {
    this.tableRowIds.forEach((id) => {
      view.removeEvent(document.getElementById(id), 'click', this.edit.bind(this, id))
    });
  }

  bindEventHandlers() {
    view.addEvent(this.createButton, 'click', this.create.bind(this));
  }

  init() {
    this.createButton = document.getElementById('create');
    this.table = document.querySelector('table');
    this.postLess = document.getElementById('postless');
    this.tableRowIds = [];
    this.bindEventHandlers();

    events.on(eventNames.login, this.show.bind(this));
    events.on(eventNames.list, this.show.bind(this));
    events.on(eventNames.edit, this.hide.bind(this));
    events.on(eventNames.saved, this.postCreate.bind(this));
  }
}

// Edit Module
class Edit{
  constructor(){
    this.init();
  }

  hide() {
    view.edit.style = 'display: None;';
  }

  show() {
    view.edit.style = 'display: block;';
  }

  list(e) {
    e.preventDefault();
    events.trigger(eventNames.list);
  }

  edit(id) {
    if (typeof id === 'number'){
      let post = posts.getPost(id);
      this.postTitle.value = post.title;
      this.postBody.value = post.body;
    }
  }

  save(e) {
    e.preventDefault();

    // save the post
    if (this.postTitle.value !== '' && this.postBody.value !== '') {
      posts.savePost(this.postTitle.value, this.postBody.value);
    }
  }

  postSave() {
    this.postTitle.value = '';
    this.postBody.value = '';
  }

  bindEventHandlers() {
    view.addEvent(this.listPosts, 'click', this.list.bind(this));
    view.addEvent(this.savePost, 'click', this.save.bind(this));
  }

  init() {
    this.listPosts = document.getElementById('listPosts');
    this.postTitle = document.getElementById('title');
    this.postBody = document.getElementById('body');
    this.savePost = document.getElementById('savePost');

    this.bindEventHandlers()
    events.on(eventNames.edit, this.show.bind(this));
    events.on(eventNames.edit, this.edit.bind(this));
    events.on(eventNames.list, this.hide.bind(this));
    events.on(eventNames.saved, this.postSave.bind(this));
  }
}


const events = new Event();
const registration = new Registration();
const posts = new Post();
const list = new List();
const edit = new Edit();


// wait for document to load
document.addEventListener('DOMContentLoaded', events.trigger(eventNames.loaded));
