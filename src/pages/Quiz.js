import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Answers from "../components/Answers";
import MiniPlayer from "../components/MiniPlayer";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from '../contexts/AuthContext';
import useQuestions from "../hooks/useQuestions";

const initialState = null;
const reducer = (state, action) => {
  // const duplicateState = _.cloneDeep(state)
  // console.log(duplicateState);
  switch (action.type) {
    case "question_copy":
      action.value.forEach((question, index) => {
        question.options.forEach((option) => {
          option.checked = false;
        })
      })
      // console.log(action.value);
      return action.value
    case "answer":
      // const duplicate_state = { ...state }
      // console.log(duplicate_state);
      const duplicateState = _.cloneDeep(state)
      // console.log(duplicateState);

      duplicateState[action.currentQuestion].options[action.index].checked = action.value

      // console.log(duplicateState);
      return duplicateState;

    default:
      return state;
  }
}

export default function Quiz() {
  const { videoID } = useParams();
  const history = useNavigate();
  const { currentUser } = useAuth();
  const { error, loading, questions } = useQuestions(videoID);
  const [newQuestions, dispatch] = useReducer(reducer, initialState);
  const [currentQuestion, setCurrentQuestion] = useState(0)



  useEffect(() => {
    dispatch({
      type: "question_copy",
      value: questions,
    })
  }, [questions])
  // console.log(newQuestions, loading, error);
  function onHandleChange(e, index) {
    dispatch({
      type: "answer",
      value: e.target.checked,
      currentQuestion: currentQuestion,
      index: index
    })
  }
  function nextQuestion() {
    // console.log(questions.length);
    // console.log(currentQuestion);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1)
    }
  }

  function prevQuestion() {
    // console.log(questions.length);
    if (currentQuestion >= 1 && currentQuestion <= questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1)
    }
    // console.log(currentQuestion);
  }

  function percentang() {
    return questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  }
  // console.log(percentang());


  async function resultSubmit() {
    console.log(currentUser);
    const { uid } = currentUser;
    const db = getDatabase();
    const dbRef = ref(db, `result/${uid}`)
    // const dbConfiq = query(dbRef, {
    //   [videoID]: newQuestions
    // })
    await set(dbRef, {
      [videoID]: newQuestions
    });
    history("/result")

  }

  return (
    <>
      {loading && <p>Loading..</p>}
      {error && <p>Data not found.</p>}
      {!loading && !error && newQuestions && newQuestions.length > 0 && (
        <>
          <h1>{newQuestions[currentQuestion].title}</h1>
          {/* <h1>Pick three of your favorite Star Wars Flims</h1> */}
          <h4>Question can have multiple answers</h4>
          <Answers
            options={newQuestions[currentQuestion].options}
            onHandleChange={onHandleChange}
          />
          <ProgressBar
            nextQuestion={nextQuestion}
            prevQuestion={prevQuestion}
            progress={percentang()}
            submit={resultSubmit}
          />
          <MiniPlayer /></>
      )}

    </>
  );
}
