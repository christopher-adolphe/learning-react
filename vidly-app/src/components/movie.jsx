import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
// import { getGenres } from '../services/fakeGenreService';
// import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

class Movie extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      amountInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    amountInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate')
  };

  async componentDidMount() {
    const { navigate } = this.props;
    const genres = [ ...await getGenres() ];
    
    this.setState({ genres });

    const movieId = this.props.match.params.id;

    if (movieId === 'new') {
      return;
    }

    const movie = await getMovie(movieId);
    
    if (!movie) {
      navigate({ pathname: '/not-found' });

      return;
    }

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      amountInStock: movie.amountInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = async () => {
    const { navigate } = this.props;
    const movie = { ...this.state.data };

    movie.amountInStock = parseInt(movie.amountInStock);
    movie.dailyRentalRate = parseInt(movie.dailyRentalRate);

    await saveMovie(movie);
    
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
              { this.renderFormSelect('Genre', 'genreId', genres) }
              { this.renderFormInput('Number in Stock', 'amountInStock', 'number') }
              { this.renderFormInput('Rate', 'dailyRentalRate', 'number') }
              { this.renderFormButton('Save') }
            </form>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Movie;
