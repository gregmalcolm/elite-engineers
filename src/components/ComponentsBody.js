import React from 'react';


export default class ComponentsForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <body>{this.props.components.map(this.renderComponent)}</body>;
  }

  renderComponent(components) {
    return <tr key={components.name}><td>{components.name}</td></tr>;
  }
}
