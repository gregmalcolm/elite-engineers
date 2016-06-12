import React from 'react';

import ComponentsBodyContainer from '../containers/ComponentsBodyContainer';

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
          <ComponentsBodyContainer />
        </table>
      </div>
    );
  }
}
