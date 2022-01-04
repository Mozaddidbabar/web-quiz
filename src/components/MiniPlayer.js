import { useRef, useState } from "react";
import ReactPlayer from 'react-player/youtube';
import classes from "../styles/MiniPlayer.module.css";
export default function MiniPlayer({ videoID, title }) {
  const playerRef = useRef()
  const [status, setStatus] = useState(false)

  function togglePlayer() {
    if (!status) {
      playerRef.current.classList.remove(classes.floatingBtn);
      setStatus(true)
    } else {
      playerRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }

  return (
    <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={playerRef}>
      <span className={`material-icons-outlined ${classes.open}`} onClick={togglePlayer}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span className={`material-icons-outlined ${classes.close}`} onClick={togglePlayer}>
        {" "}
        close{" "}
      </span>
      {/* <img src={`https://img.youtube.com/vi/${videoID}/hqdefault.jpg`} alt={title} /> */}
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoID}`}
        playing={status}
        controls
        width="300px"
        height="168px"
      // className={classes.player}
      // className={classes.player}
      />
      <p>{title}</p>

    </div>
  );
}
