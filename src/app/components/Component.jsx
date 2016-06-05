import React from 'react';

export default class Component extends React.Component {
  render() {
    return (
      <div className="component">
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}
