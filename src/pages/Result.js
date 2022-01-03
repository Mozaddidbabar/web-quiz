import _ from 'lodash';
import { useParams } from "react-router-dom";
import Analysis from "../components/Analysis";
import Summary from "../components/Summary";
import { useAuth } from '../contexts/AuthContext';
import useAnswer from "../hooks/useAnswer";
import useResult from "../hooks/useResult";

export default function Result(props) {
  const { videoID } = useParams();
  const { currentUser } = useAuth()
  const { uid } = currentUser;

  const { result, error, loading } = useResult(videoID, uid)
  // console.log(result, error, loading);
  const { answers } = useAnswer(videoID)
  // console.log(answers);

  function makeResult() {
    let mark = 0;
    if (result.length > 0 && answers.length > 0) {


      result.forEach((questions, index1) => {
        const checkedIndex = [];
        const correctIndex = [];
        // console.log(index1);
        questions.options.forEach((option, index2) => {
          // console.log(option, index2);
          // console.log(option, index2);
          if (option.checked) checkedIndex.push(index2);
          if (answers[index1].options[index2].correct) correctIndex.push(index2)
        })
        // console.log("checked", checkedIndex, 'correct', correctIndex);
        if (_.isEqual(correctIndex, checkedIndex)) {
          mark = mark + 5
        }
        // console.log(_.isEqual(correctIndex, checkedIndex));

      })
    }
    return mark;
  }

  const score = makeResult()
  console.log(score);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Summary score={score} />
      <Analysis />
    </>
  );
}
