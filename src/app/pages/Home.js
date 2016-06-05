import React from "react";
import styles from "../styles/home.css";


export default class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <h1>Engineers</h1>
        <p className={styles.welcomeText}>Well, it's a start!</p>
        <a href="/components">Components</a>
      </div>
    );
  }
}
