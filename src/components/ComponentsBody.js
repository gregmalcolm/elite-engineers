import React from 'react';


export default class ComponentsForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <tbody>{this.props.components.map(this.renderComponent)}</tbody>;
  }

  renderComponent(components) {
    return <tr key={components.name}><td>{components.name}</td></tr>;
  }
}
