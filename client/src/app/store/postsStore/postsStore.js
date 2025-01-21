import { makeAutoObservable } from 'mobx';
import PostService from 'shared/api/postService/postService';

export default class PostStore {
  post = [];

  isEditButtonClicked = false;

  constructor() {
    makeAutoObservable(this);
    this.isEditButtonClicked = false;
  }

  setEditButtonClicked(boolean) {
    this.isEditButtonClicked = boolean;
  }

  setPosts(post) {
    this.post = post;
  }

  async getPosts() {
    try {
      const response = await PostService.getLimitPosts();
      this.setPosts(response.data.reverse());
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  }

  async createOne(formData) {
    try {
      await PostService.createPost(formData);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteOne(data) {
    try {
      await PostService.deletePost(data);
    } catch (error) {
      console.error(error);
    }
  }

  async editOne(id, formData) {
    try {
      await PostService.editPost(id, formData);
    } catch (error) {
      console.error(error);
    }
  }
}
