import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";
import useVideList from "../hooks/useVideList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(0);
  const { videos, loading, error, hasMore } = useVideList(page);
  return (
    <div className={classes.videos}>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Some error found!</p> : null}
      {
        videos.length > 0 ? videos.map((video) => {
          // console.log(video);
          return (
            <InfiniteScroll dataLength={videos.length} hasMore={hasMore}
              next={() => setPage(page + 8)}
              loader={<h4>Loading...</h4>}>
              <Link to="/quiz" key={video.youtubeID}>
                <Video title={video.title} noq={video.noq} youtubeID={video.youtubeID} />
              </Link>
            </InfiniteScroll>
          )
        }
        ) : <p>Data Not found!</p>
      }



    </div>
  );
}
