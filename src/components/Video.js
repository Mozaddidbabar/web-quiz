import image from "../assets/images/3.jpg";
import classes from "../styles/Video.module.css";

export default function Video({ title, noq, youtubeID }) {
  return (
    <div className={classes.video}>
      <img src={image} alt={title} />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Score : Not taken yet</p>
      </div>
    </div>
  );
}
