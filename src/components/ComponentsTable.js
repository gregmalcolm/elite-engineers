import React from 'react';

import ComponentsTableBodyContainer from '../containers/ComponentsTableBodyContainer';

export default class ComponentsTable extends React.Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Personal Stock</th>
            <th>Component</th>
            <th>Type</th>
            <th>Rarity</th>
            <th>Subtype</th>
            <th>Loc 1</th>
            <th>Loc 2</th>
            <th>Loc 3</th>
            <th>Ship Types</th>
            <th colspan="2">Info</th>
          </tr>
        </thead>
        <ComponentsTableBodyContainer />
      </table>
    );
  }
}
