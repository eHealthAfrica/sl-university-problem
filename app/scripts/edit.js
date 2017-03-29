
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
    } else {
      this.postTitle.value = '';
      this.postBody.value = '';
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


const edit = new Edit();
