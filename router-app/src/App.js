import React, { Component } from "react";
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import AdminPosts from "./components/admin/posts";
import Users from "./components/admin/users";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
import "./App.css";

// Using the `Route` component to register the different
// routes of our React application. The `Route` component
// take 2 props `path` and `element`. When the url in
// the browser matches the specified path, the corresponding
// component is then rendered
class App extends Component {
  render() {
    // Creating a wrapper component for the `ProductDetails`
    // component so that we can use the `useParams` hook from
    // `react-router-dom` with a class component. Using
    // object destructuring to copy the props from the wrapper
    // component to the `ProductDetails` component and adding a
    // new `match` property which is contain the url parameters
    // obtained from the `useParams` hook

    // Alternatively, the the `ProductDetails` component can
    // be converted into a stateless functional component where
    // the `useParams` hook could the be used directly
    const ProductDetailsWrapper = (props) => {
      const params = useParams();
      // Using the `useNavigate()` hook to navigate programmatically
      const navigate = useNavigate();

      return <ProductDetails { ...{ ...props, match: { params }, navigate } } />
    };

    return (
      <div>
        <NavBar />

        <div className="content">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="products" element={ <Products /> } />
            <Route path="products/:id" element={ <ProductDetailsWrapper /> } />
            <Route path="posts/:year/:month" element={ <Posts /> } />
            <Route path="admin" element={ <Dashboard /> }>
              <Route path="admin/posts" element={ <AdminPosts /> } />
              <Route path="admin/users" element={ <Users /> } />
            </Route>
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
