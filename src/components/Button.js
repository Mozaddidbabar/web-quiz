import classes from "../styles/Button.module.css";

export default function Button({ className, children, ...props }) {
  return <button className={`${classes.button} ${className}`} {...props}>{children}</button>;
}
