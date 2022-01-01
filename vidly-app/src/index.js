import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import './index.css';
import App from './App';
import Movies from './components/movies';
import Movie from './components/movie';
import Customers from './components/customers';
import Rentals from './components/rentals';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import NotFound from './components/notFound';
import reportWebVitals from './reportWebVitals';

const MovieWrapper = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  return <Movie { ...{ ...props, match: { params }, navigate } } />
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> }>
          <Route index element={ <Movies /> } />
          <Route path="movies/:id" element={ <MovieWrapper /> } />
          <Route path="movies/new" element={ <MovieWrapper /> } />
          <Route path="movies" element={ <Movies /> } />
          <Route path="customers" element={ <Customers /> } />
          <Route path="rentals" element={ <Rentals /> } />
          <Route path="login" element={ <LoginForm /> } />
          <Route path="register" element={ <RegisterForm /> } />
          <Route path="logout" element={ <Logout /> } />
          <Route path="not-found" element={ <NotFound /> } />
          <Route path="*" element={ <NotFound /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
