import React from 'react';

import ComponentsTable from '../components/ComponentsTable';

export default class ComponentsPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Components</h1>
        <ComponentsTable />
      </div>
    );
  }
}
