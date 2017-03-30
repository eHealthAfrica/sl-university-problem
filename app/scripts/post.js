
class Post{
  constructor(){
    this.posts = [];
    this.API = 'http://127.0.0.1:5984';

    this.refreshPostList();
  }

  savePostInAPI(post) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', this.API + '/posts', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(post));
  }

  refreshPostList() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.API + '/posts/_all_docs?include_docs=true', false);
    xhr.send(null);

    let resp = JSON.parse(xhr.responseText);

    this.posts = [];
    for (let i = 0; i < resp.rows.length ; i++) {
      let doc = resp.rows[i];
      let newPost = {
        title: doc.doc.title,
        body: doc.doc.body,
        lastModified: doc.doc.lastModified,
        id: i
      }

      console.log(newPost);

      this.posts.push(newPost);
    }

    console.log("Done refreshing!");
    console.log(this.posts);
  }

  savePost(title, body) {  // ajax
    let post = {
      title: title,
      body: body,
      lastModified: registration.user
    }

    this.posts.push(post);
    this.savePostInAPI(post);
    console.log('Saved!')
    this.refreshPostList();
    console.log('Refreshed!');
    events.trigger(eventNames.saved, post);
  }

  getPost(id) {  // ajax
    return this.posts.filter((p) => p.id == id)[0];
  }
}

const posts = new Post();
