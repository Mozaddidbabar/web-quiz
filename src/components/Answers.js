import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers({ options = [], onHandleChange }) {
  // console.log(options);
  return (
    <div className={classes.answers}>
      {
        options.map((option, index) => {
          return <Checkbox
            className={classes.answer}
            text={option.title}
            key={index}
            value={index}
            checked={option.checked}
            onChange={(e) => onHandleChange(e, index)}
          />
        })
      }

    </div>
  );
}
