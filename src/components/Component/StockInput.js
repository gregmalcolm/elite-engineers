import React from 'react';

export default class ComponentsStockInput extends React.Component {
  constructor() {
    super(...arguments);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.save(this.props.name, e.target.value);
  }

  render() {
    return (
      <input
        className="form-control"
        type="text"
        value={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}
