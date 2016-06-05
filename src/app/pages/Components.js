// Note: This is Components as in Engineering Components, not React Components.

import React from "react";
import styles from "../styles/components.css";

import ComponentsList from "../components/ComponentsList";

export default class ComponentsPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Components</h1>
        <ComponentsList />
      </div>
    );
  }
}
