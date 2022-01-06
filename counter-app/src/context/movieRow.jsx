import React, { useContext } from 'react';
import UserContext from './userContext';
import CartContext from './cartContext';

function MovieRow(props) {
  // Using the `useContext()` hook to get the data passed to the
  // `UserContext` by the Provider
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  console.log('CurrentUser in functional Component: ', userContext);
  console.log('CartContext in functional Component: ', cartContext);

  return (
    <div>
      <p>Movie row: { userContext.currentUser ? userContext.currentUser.name : '' } | { userContext.currentUser ? userContext.currentUser.role : '' }</p>
      {
        (cartContext && cartContext.length) ? (
          <ul>
            {
              cartContext.map((item, index) => <li key={ `${item.name}-${index}`}>{ item.name } - MUR { item.price }</li>)
            }
          </ul>
        ) : null
      }
    </div>
  );
}

export default MovieRow;
