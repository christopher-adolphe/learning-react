import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import withRouterHooks from './common/withRouterHooks';
import Form from './common/form';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import AppContext from '../context/appContext';

class Movie extends Form {
  static contextType = AppContext;
  
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
    const { onToggleLoader } = this.context;

    try {
      onToggleLoader(true);
      await this.populateGenres();
      await this.populateMovie();
    } catch (error) {
      console.log(error);
    } finally {
      onToggleLoader(false);
    }
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;

      if (!movieId) {
        return;
      }

      const { data: movie } = await getMovie(movieId);

      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      const { navigate } = this.props;

      if (error.response && error.response.status === 404) {
        const { data: message } = error.response;

        toast.error(message);
        navigate({ pathname: '/not-found' });
      }
    }
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
 
export default withRouterHooks(Movie);
