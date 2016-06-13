import React from 'react';

import ComponentRowContainer from '../../containers/Component/RowContainer';

export default class ComponentsTableBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <tbody>{this.props.components.map(this.renderComponent)}</tbody>;
  }

  renderComponent(component) {
    return <ComponentRowContainer key={component.name} component={component}/>
  }
}
