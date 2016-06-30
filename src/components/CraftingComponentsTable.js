import React, { PropTypes } from 'react';

import CraftingComponent from './CraftingComponent';
import craftingComponent from '../models/craftingComponent';

const CraftingComponentsTable = ({components}) => (
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
        <th colSpan="2">Info</th>
      </tr>
    </thead>
    <tbody>
      {components.map(component =>
        <CraftingComponent key={component.name} component={component} />
      )}
    </tbody>
  </table>
);

CraftingComponentsTable.propTypes = {
  components: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired
};

CraftingComponentsTable.defaultProps = {
  components: craftingComponent.getAll()
};

export default CraftingComponentsTable;
