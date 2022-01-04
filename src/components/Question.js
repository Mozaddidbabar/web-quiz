import classes from "../styles/Question.module.css";
import Answers from "./Answers";

export default function Question({ answers }) {
  // console.log(answers);
  return (
    <div className={classes.question}>
      {
        answers.map((answer, index) => (
          <div>
            <div className={classes.qtitle} >
              <span className="material-icons-outlined"> help_outline </span>
              {/* Here goes the question from Learn with Sumit? */}
              {answer.title}
            </div>
            <Answers input={false} options={answer.options} key={index * 5} />
          </div>
        ))
      }

    </div>
  );
}
