import React from 'react';

import ComponentsPersonalStockInput from './ComponentsPersonalStockInput';

export default class ComponentsBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <tbody>{this.props.components.map(this.renderComponent)}</tbody>;
  }

  renderComponent(components) {
    return (
      <tr key={components.name}>
        <td><ComponentsPersonalStockInput /></td>
        <td>{components.name}</td>
        <td>{components.type}</td>
        <td>{components.rarity}</td>
        <td>{components.subtype}</td>
        <td>{components["loc 1"]}</td>
        <td>{components["loc 2"]}</td>
        <td>{components["loc 3"]}</td>
        <td>{components["ship types"]}</td>
        <td>{components.info}</td>
        <td>{components.info2}</td>
      </tr>
    );
  }
}
