import React, { PropTypes } from 'react';

// TODO: Show correct page in sidebar on startup
class Sidebar extends React.Component {
  render() {
    return (
      <ul className="sidebar-nav">
          <li><a href="the-dweller">The Dweller</a></li>
          <li><a href="#">Viewer</a></li>
          <li><a href="calculator">Calculator</a></li>
          <li><a href="components">Components</a></li>
      </ul>
    );
  }
}

Sidebar.propTypes = {
};

export default Sidebar;
