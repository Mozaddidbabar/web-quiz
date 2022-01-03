import { Link } from "react-router-dom";
// import logo from "../assets/images/logo-bg.png";
import classes from "../styles/Nav.module.css";
import Account from "./Account";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Guess_Quiz_Logo.png" alt="Learn with Sumit Logo" />
            <h3>React Quiz App</h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
