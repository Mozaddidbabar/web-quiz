import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from 'react';



export default function useResult(videoID, uid) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([])
    // console.log(videoID);

    useEffect(() => {
        // datafetching 

        async function ResultFetch() {
            const database = getDatabase();
            const databaseRef = ref(database, `result/${uid}/${videoID}`)
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
                    setResult((prevQuestions) => {
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
        ResultFetch()

    }, [videoID, uid])
    return {
        error,
        loading,
        result,
    }
}
