import React, { PropTypes } from 'react';

import CraftingComponent from './CraftingComponent';
import craftingComponent from '../models/craftingComponent';

const CraftingComponentsTable = ({components}) => (
  <table className="table">
    <thead>
      <tr>
        <th>Personal Stock</th>
        <th>Component</th>
        <th>Type</th>
        <th>Subtype</th>
        <th>Rarity</th>
        <th>Location</th>
        <th>Mission Reward</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(components).map(key =>
        <CraftingComponent key={key} componentId={key} component={components[key]} />
      )}
    </tbody>
  </table>
);

CraftingComponentsTable.propTypes = {
  components: PropTypes.shape(PropTypes.shape().isRequired).isRequired
};

CraftingComponentsTable.defaultProps = {
  components: craftingComponent.getAll()
};

export default CraftingComponentsTable;
