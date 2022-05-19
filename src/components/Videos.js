import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";
import useVideList from "../hooks/useVideList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(0);
  const { videos, loading, error, hasMore } = useVideList(page);
  console.log(videos);
  return (
    <div className={classes.videos}>
      <InfiniteScroll dataLength={videos.length} hasMore={hasMore}
        next={() => setPage(page + 8)}
        loader={<h4>Loading...</h4>}
        className={classes.videos}
      >
        {loading ? <p>Loading...</p> : null}
        {error ? <p>Some error found!</p> : null}
        {
          videos.length > 0 ? videos.map((video, index) => {
            // console.log(video);
            return (

              video.noq > 0 ?
                (<Link to={`/quiz/${video.youtubeID}`} key={video.youtubeID}>
                  <Video Img={video.Img} title={video.title} noq={video.noq} youtubeID={video.youtubeID} />
                </Link>) :
                (
                  <Video Img={video.Img} title={video.title} noq={video.noq} youtubeID={index} key={video.youtubeID} />
                )

            )
          }
          ) : <p>Data Not found!</p>
        }

      </InfiniteScroll>

    </div>
  );
}
