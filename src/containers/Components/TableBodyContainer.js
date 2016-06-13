import React from 'react';
import ComponentsTableBody from '../../components/Components/TableBody';

export default class ComponentTableBodyContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { components: [] };
  }
  componentDidMount() {
    $.ajax({
      url: "/data/components.json",
      dataType: 'json',
      success: function(data) {
        this.setState({components: data});
      }.bind(this)
    });
  }

  render() {
    return (
      <ComponentsTableBody
        components={this.state.components}
      />);
  }
}