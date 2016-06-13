import React from 'react';

import ComponentsStockInput from './StockInput';

export default class ComponentsRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const component = this.props.component;
    return (
      <tr key={component.name}>
        <td><ComponentsStockInput
          name={component.name}
          value={this.props.componentStock.personalStock}
          save={this.props.save}
        /></td>
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
  }
}
