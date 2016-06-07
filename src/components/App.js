import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const App = (props) => {
      //{' | '}
      //<Link to="/components">Components</Link>
  return (
    <div>
      <IndexLink to="/">Home</IndexLink>
      <br/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
