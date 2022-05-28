import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers({ options = [], onHandleChange, input }) {
  // console.log(options);
  return (
    <div className={classes.answers}>
      {
        input ?
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
          :
          options.map((option, index) => {
            return <Checkbox
              className={`${classes.answer} ${option.correct ? `${classes.correct}` : option.checked ? `${classes.wrong}` : null
                }`
              }
              text={option.title}
              key={index}
              defaultChecked={option.checked || option.correct}
              disabled
            />
          })
      }

    </div>
  );
}
