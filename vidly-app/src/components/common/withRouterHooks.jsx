import { useParams, useNavigate } from 'react-router-dom';

// Creating a Higher Order Component to make react-router-dom
// hooks available as props to class components
function withRouterHooks(Component) {
  const WithRouterHooks = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    return (
      <Component { ...props } match={ { params } } navigate={ navigate } />
    );
  };

  return WithRouterHooks;
}
 
export default withRouterHooks;
