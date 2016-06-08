import React from 'react';


export default class ComponentsForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <tr>{this.props.components.map(this.renderComponent)}</tr>;
  }

  renderComponent(components) {
    return <td>{components.name}</td>;
  }
}
