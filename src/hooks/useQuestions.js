import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from 'react';



export default function useQuestions(videoID) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([])
    // console.log(videoID);

    useEffect(() => {
        // datafetching 

        async function QuestionFetch() {
            const database = getDatabase();
            const databaseRef = ref(database, `quiz/${videoID}/questions`)
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
                    setQuestions((prevQuestions) => {
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
        QuestionFetch()

    }, [videoID])
    return {
        error,
        loading,
        questions,
    }
}
