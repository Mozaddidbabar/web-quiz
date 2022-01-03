import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from 'react';



export default function useAnswer(videoID) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([])
    // console.log(videoID);

    useEffect(() => {
        // datafetching 

        async function AnswerFetch() {
            const database = getDatabase();
            const databaseRef = ref(database, `answers/${videoID}/questions`)
            const dataQuery = query(
                databaseRef,
                orderByKey(),
            )
            try {
                setError(false)
                setLoading(false)
                const snapshot = await get(dataQuery)
                // console.log(snapshot.val());
                if (snapshot.exists()) {
                    setAnswers((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(snapshot.val())]
                    })
                }
                else {
                    console.log("Data not found");
                }

            } catch (error) {
                console.log(error);
                setLoading(false)
                setError("Error found!")
            }


        }
        AnswerFetch()

    }, [videoID])
    return {
        error,
        loading,
        answers,
    }
}
