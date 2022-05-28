import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Account.module.css";



export default function Account() {
  const { currentUser, Logout } = useAuth();
  // console.log(currentUser);
  return (
    <div className={classes.account}>
      <span className="material-icons-outlined" title="Account">
        account_circle
      </span>
      {
        currentUser ? (
          <>
            <p>{currentUser.displayName}</p>
            <button style={{
              backgroundColor: "transparent",
              border: "0px",
            }} onClick={Logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/signin">Signin</Link></>
        )
      }

      {/* <span className="material-icons-outlined" title="Logout"> logout </span> */}
    </div>
  );
}
