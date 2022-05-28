import classes from "../styles/Question.module.css";
import Answers from "./Answers";

export default function Question({ answers }) {
  // console.log(answers);
  return (
    <div className={classes.question}>
      {
        answers.map((answer, index) => (
          <div>
            <div className={classes.qtitle} key={Math.random(80)}>
              <span className="material-icons-outlined"> help_outline </span>
              {answer.title}
            </div>
            <Answers input={false} options={answer.options} key={Math.random(10)} />
          </div>
        ))
      }

    </div>
  );
}
