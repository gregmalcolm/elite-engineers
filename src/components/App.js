import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import Heading from './Heading';
import Sidebar from './Sidebar';

const App = (props) => {
  return (
    <div>
      <div className="container-fluid">
        <Heading />
        <div className="row">
          <div id="sidebar-column" className="col-md-2">
            <Sidebar />
          </div>
          <div id="content-column" className="col-md-10">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
