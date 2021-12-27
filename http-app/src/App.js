import React, { Component } from "react";
import logger from './services/logService';
import { ToastContainer } from 'react-toastify';
import http from './services/httpService';
import config from './config.json';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

// Sentry.init({
//   dsn: "https://c75342b9bc2149eca2b3dc56155a44fc@o1099728.ingest.sentry.io/6124497",
//   integrations: [new Integrations.BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

// Using the `init()` function from the `logService` module to initialize `Raven-js`
logger.init();

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    try {
      const { data: posts } = await http.get(config.apiEndpoint);

      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
  }

  handleAdd = async () => {
    const newPost = { title: 'New post title', body: 'New posts content' };

    try {
      const { data: post } = await http.post(config.apiEndpoint, newPost);
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
      await http.put(`${config.apiEndpoint}/${post.id}`, post);

      // With the `patch()` method we can specify the properties we want to update for a given resource
      // const { data: post } = await http.patch(`${config.apiEndpoint}/${post.id}`, { title: post.title });

      const posts = [ ...this.state.posts ];
      const index = posts.indexOf(post);

      posts[index] = { ...post };
      this.setState({ posts });
;    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async post => {
    // Pessimistic Update: We perform backend calls before updating the state of a component
    // try {
    //   await http.delete(`${config.apiEndpoint}/${post.id}`);

    //   // const posts = [ ...this.state.posts ];
    //   // const index = posts.indexOf(post);

    //   // posts.splice(index, 1);

    //   const posts = this.state.posts.filter(p => p.id !== post.id);

    //   this.setState({ posts });
    // } catch (error) {
    //   console.log(error);
    // }

    // Optimistic Update: We update the state of the component before performing backend calls.
    // If something goes wrong, we reset the state to its initiate value

    // 1. Keeping a reference of the original state
    const initialPostsState = this.state.posts;

    // 2. Applying the logic to update the state and the UI of the component
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      // 3. Performing the call to the backend to update the database
      await http.delete(`${config.apiEndpoint}/${post.id}`);
      // throw new Error('Something went wrong while deleting post!');
    } catch (error) {
      // Expected errors (404: not found, 400: bad request) -> CLIENT ERRORS
      // In these case we should display a specific error message
      if (error.response && error.response.status === 404) {
        alert('Sorry, this post has already been deleted!');
      }
      // Unexpected errors (Network down, server is down, database is down, bug in the code)
      // In these case we should log theses errors and display a generic and friendly error message
      // else {
      //   console.log(error);
      //   alert('Sorry, an unexpected error occurred.');
      // }
      

      // 4. Reverting the state and UI of the component to the original state
      // in case something went wrong
      this.setState({ posts: initialPostsState });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
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
