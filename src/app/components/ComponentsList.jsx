import React from 'react';

import Component from "./Component";

export default class ComponentsList extends React.Component {
  render() {
    return (
      <div className="componentList">
        <Component name="Aberrant Shield Pattern Analysis" type="Data" />
        <Component name="Abnormal Compact Emission Data" type="Data" />
      </div>
    );
  }
}
