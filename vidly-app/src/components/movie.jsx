import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Movie = () => {
  const navigate = useNavigate();
  const params = useParams();

  const handleSave = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Movie Form { params.id }</h1>

          <button type="button" className="btn btn-primary" onClick={ handleSave }>Save</button>
        </div>
      </div>
    </div>
  );
}
 
export default Movie;
