import React from 'react';


export default class ComponentsForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ({this.props.components.map(this.renderComponent)});
  }

  renderComponent(components) {
    return <tr key={components.name}><td>{components.name}</td></tr>;
  }
}
