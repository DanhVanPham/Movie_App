import React from "react";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">Movies App</Link>
      </div>
      <div className={styles.right}>
        <div className={styles.search}>
          <input type="text" placeholder="Search movie" />
          <Search />
        </div>
        <p className={styles.link}>
          <Link to="/explore">Explore</Link>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
