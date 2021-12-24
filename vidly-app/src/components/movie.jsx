import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';

// const Movie = () => {
//   const navigate = useNavigate();
//   const params = useParams();

//   const handleSave = () => {
//     navigate('/');
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col">
//           <h1 className="mb-4">Movie Form { params.id }</h1>

//           <button type="button" className="btn btn-primary" onClick={ handleSave }>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// }

class Movie extends Form {
  state = {
    data: {
      title: '',
      genre: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const genres = [ { _id: '', name: '' }, ...getGenres() ];
    
    if (id) {
      const movie = getMovie(id);
      const data = {
        title: movie.title,
        genre: movie.genre.name,
        numberInStock: `${movie.numberInStock}`,
        dailyRentalRate: `${movie.dailyRentalRate}`
      }

      this.setState({ data, genres });
    }
    
    this.setState({ genres });
  }

  // genreSchema = {
  //   _id: Joi.string().required(),
  //   name: Joi.string().required()
  // }

  schema = {
    title: Joi.string().required().label('Name'),
    genre: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate')
  };

  doSubmit = () => {
    const { navigate } = this.props;
    const movie = { ...this.state.data };
    const genre = this.state.genres.find(genre => genre.name === movie.genre);

    if (!genre) {
      return;
    }

    movie.genre = { ...genre };

    saveMovie(movie);
    
    navigate({ pathname: '/movies' });
  };

  render() {
    const { genres } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h1 className="mb-4">Movie Form</h1>

            <form onSubmit={ this.handleSubmit }>
              { this.renderFormInput('Title', 'title') }
              { this.renderFormSelect('Genre', 'genre', genres) }
              { this.renderFormInput('Number in Stock', 'numberInStock') }
              { this.renderFormInput('Rate', 'dailyRentalRate') }
              { this.renderFormButton('Save') }
            </form>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Movie;
