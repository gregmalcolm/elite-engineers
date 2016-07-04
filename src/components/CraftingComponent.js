import React, { PropTypes } from 'react';

import ComponentStock from './ComponentStock';

class CraftingComponent extends React.Component {
  render() {
    const {componentId, component} = this.props;
    return (
      <tr>
        <td><ComponentStock componentId={componentId} /></td>
        <td>{component.name}</td>
        <td>{component.type}</td>
        <td>{component.subtype}</td>
        <td>{component.rarity}</td>
        <td>{component.location.join('\n')}</td>
        <td>{component.missionReward ? "Yes" : "No"}</td>
      </tr>
    );
  }
}

CraftingComponent.propTypes = {
  componentId: PropTypes.string.isRequired,
  component: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    subtype: PropTypes.string.isRequired,
    rarity: PropTypes.number.isRequired,
    location: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    missionReward: PropTypes.oneOfType([
        React.PropTypes.string, // Why does the validator think this is a string?!?
        React.PropTypes.bool
    ]).isRequiredRequired
  }).isRequired
};

export default CraftingComponent;
