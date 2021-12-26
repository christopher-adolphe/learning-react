import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    try {
      const { data: posts } = await axios.get(apiEndpoint);

      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
  }

  handleAdd = async () => {
    const newPost = { title: 'New post title', body: 'New posts content' };

    try {
      const { data: post } = await axios.post(apiEndpoint, newPost);
      const posts = [post, ...this.state.posts];
      
      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdate = async post => {
    post.title += ' updated!';


    try {
      // With the `put()` method we need to pass the entire object we want to update for a given resource
      await axios.put(`${apiEndpoint}/${post.id}`, post);

      // With the `patch()` method we can specify the properties we want to update for a given resource
      // const { data: post } = await axios.patch(`${apiEndpoint}/${post.id}`, { title: post.title });

      const posts = [ ...this.state.posts ];
      const index = posts.indexOf(post);

      posts[index] = { ...post };
      this.setState({ posts });
;    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async post => {
    // Pessimistic Update
    // try {
    //   await axios.delete(`${apiEndpoint}/${post.id}`);

    //   // const posts = [ ...this.state.posts ];
    //   // const index = posts.indexOf(post);

    //   // posts.splice(index, 1);

    //   const posts = this.state.posts.filter(p => p.id !== post.id);

    //   this.setState({ posts });
    // } catch (error) {
    //   console.log(error);
    // }

    // Optimistic Update
    const initialPostsState = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);

    this.setState({ posts });

    try {
      await axios.delete(`${apiEndpoint}/${post.id}`);
      // throw new Error('Something went wrong while deleting post!');
    } catch (error) {
      // console.log(error);
      alert(error)
      this.setState({ posts: initialPostsState });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary mb-4" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
