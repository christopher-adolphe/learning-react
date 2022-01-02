import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import authenticationService from '../../services/authenticationService';

const ProtectedRoute = ({ path, element: Component, ...rest }) => {
  return (<Route { ...rest } element={ authenticationService.getUser() ? <Component /> : <Navigate to="/login" /> } />);
}
 
export default ProtectedRoute;
