import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Layout.module.css";
import Nav from "./Nav";

export default function Layout({ children }) {
  const val = useAuth()
  console.log(val);
  return (
    <>
      <Nav />
      <main className={classes.main}>
        <div className={classes.container}>{children}</div>
      </main>
    </>
  );
}
