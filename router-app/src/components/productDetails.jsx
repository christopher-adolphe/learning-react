import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';

class ProductDetails extends Component {
  handleSave = () => {
    // Navigate to /products
    const { navigate } = this.props;
    
    navigate({ pathname: '/products' });
  };

  render() {
    const { id } = this.props.match.params;
    
    return (
      <div>
        <h1>Product Details - { id }</h1>
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default ProductDetails;
