import { Link } from "react-router-dom";
import useVideList from "../hooks/useVideList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";

export default function Videos() {
  const videoList = useVideList();
  // console.log(videoList.videos);
  const { videos } = videoList;
  return (
    <div className={classes.videos}>
      {
        videos.map((video) => {
          // console.log(video);
          return <Link to="/quiz" key={video.youtubeID}>
            <Video title={video.title} noq={video.noq} youtubeID={video.youtubeID} />
          </Link>
        }
        )
      }


    </div>
  );
}
