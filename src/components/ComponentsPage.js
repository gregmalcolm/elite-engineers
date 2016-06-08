import React from 'react';

import ComponentsListContainer from '../containers/ComponentsListContainer'

export default class ComponentsPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Components</h1>
        <table>
          <thead>
            <tr>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>
            <ComponentsListContainer />
          </tbody>
        </table>
      </div>
    );
  }
}
