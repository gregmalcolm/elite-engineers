import React from 'react';
import ComponentRow from '../../components/Component/Row';

export default class ComponentTableBodyContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.props = { component: {} };
  }
  render() {
    return (
      <ComponentRow
        component={this.props.component}
      />
    );
  }
}
