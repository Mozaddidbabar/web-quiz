import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";
import { useEffect, useState } from 'react';



export default function useVideList(page) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([])
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        // datafetching 

        async function VideoFetch() {
            const database = getDatabase();
            const databaseRef = ref(database, "videos")
            const dataQuery = query(
                databaseRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(8)
            )
            try {
                setError(false)
                setLoading(false)
                const snapshot = await get(dataQuery)
                // console.log(snapshot.val());
                if (snapshot.exists()) {
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapshot.val())]
                    })
                }
                else {
                    setHasMore(false);
                }

            } catch (error) {
                console.log(error);
                setLoading(false)
                setError("Error found!")
            }


        }
        VideoFetch()

    }, [page])
    return {
        error,
        loading,
        videos,
        hasMore
    }
}
