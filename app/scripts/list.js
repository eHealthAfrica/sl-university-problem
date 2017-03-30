
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
    console.log("show ran");
    view.list.style = 'display: block;';
    this.prepareTable();
  }

  create(e) {
    e.preventDefault();
    events.trigger(eventNames.edit);
  }

  prepareTable() {
    if (posts.posts.length == 0) {
      console.log('posts is empty');

      this.table.style = 'display: None;';
      this.postLess.style = 'display: block;';
    }
    else {
      console.log('posts is not empty');

      this.table.style = 'display: block;';
      this.postLess.style = 'display: None;';

      //show posts
      for (var i = 0; i < posts.posts.length; i++) {
        this.postCreate(posts.posts[i]);
      }

      // bind event handlers
      this.bindTableRowClick();
    }
  }

  postCreate(post) {
    console.log('Creating post');
    console.log(post);

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

const list = new List();
