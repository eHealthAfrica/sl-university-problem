
class Post{
  constructor(){
    this.posts = [];
    this.API = 'https://127.0.0.1:5984';

    this.refreshPostList();
  }

  savePostInAPI(post) {
    //Send post to the API via XHR (AJAX)
  }

  refreshPostList() {
    //Get all the posts from the API and return them
  }

  savePost(title, body) {  // ajax
    //Save one post, called from outside
  }

  getPost(id) {  // ajax
    return this.posts.filter((p) => p.id == id)[0];
  }
}

const posts = new Post();
