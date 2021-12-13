import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const Like = (props) => {
  const { liked, onLike } = props;

  const toggleButtonIcon = () => {
    return liked === true ? <FontAwesomeIcon icon={ fasHeart } /> : <FontAwesomeIcon icon={ farHeart } />;
  }

  return (
    <button className="btn btn-sm" onClick={ () => onLike() }>{ toggleButtonIcon() }</button>
  );
}
 
export default Like;
