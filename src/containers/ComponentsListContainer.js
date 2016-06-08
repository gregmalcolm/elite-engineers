import React from 'react';

import ComponentsList from '../components/ComponentsList';

var $ = require('jquery');

export default class Component extends React.Component {
  constructor() {
    super();
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
    return <ComponentsList components={this.state.components} />;
  }
}
