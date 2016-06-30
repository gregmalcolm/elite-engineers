import React, { PropTypes } from 'react';

const CraftingComponent = ({component}) => (
  <tr>
    <td></td>
    <td>{component.name}</td>
    <td>{component.type}</td>
    <td>{component.rarity}</td>
    <td>{component.subtype}</td>
    <td>{component["loc 1"]}</td>
    <td>{component["loc 2"]}</td>
    <td>{component["loc 3"]}</td>
    <td>{component["ship types"]}</td>
    <td>{component.info}</td>
    <td>{component.info2}</td>
  </tr>
);

CraftingComponent.propTypes = {
  component: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rarity: PropTypes.string.isRequired,
    subtype: PropTypes.string.isRequired,
    ["loc 1"]: PropTypes.string.isRequired,
    ["loc 2"]: PropTypes.string.isRequired,
    ["loc 3"]: PropTypes.string.isRequired,
    ["ship types"]: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    info2: PropTypes.string.isRequired
    //stock: PropTypes.number.isRequired
  }).isRequired
};

export default CraftingComponent;
