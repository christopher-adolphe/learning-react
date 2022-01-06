import React, { Component, Fragment } from 'react';
import MovieRow from './movieRow';
import UserContext from './userContext';

class MovieList extends Component {
  // Setting the `contextType` static property to the UserContext
  // to make it is also available outside the `render()` method of
  // the component so that we can then apply logic based on the context
  // in other methods of the component
  // NOTE: Alternatively, we can also set the `contextType` static property
  // outside the class definition by using the following syntax
  // MovieList.contextType = UserContext;
  static contextType = UserContext;

  componentDidMount() {
    // The `context` property will contain the value that has been
    // passed to the `UserContext.Provider`
    console.log('UserContext: ', this.context);
  }
  
  render() {
    return (
      <Fragment>
        <UserContext.Consumer>
          {/* Using the `UserContext` as a Consumer to get the data passed by the Provider */}
          {/* When using the context as a Consumer we need to return the content of the compent  */}
          {/* from a lambda function which will have the data as argument and therefore the data */}
          {/* can be accessed by the component */}
          {
            (userContext) => (<div>Movie List viewed by { userContext.currentUser ? userContext.currentUser.name : '' } | { userContext.currentUser ? userContext.currentUser.role : '' }</div>)
          }
        </UserContext.Consumer>

        <MovieRow />
      </Fragment>
    );
  }
}

// MovieList.contextType = UserContext;

export default MovieList;
