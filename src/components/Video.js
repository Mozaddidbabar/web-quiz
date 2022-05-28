import classes from "../styles/Video.module.css";

export default function Video({Img, title, noq, youtubeID }) {
  return (
    <div className={classes.video}>
      <img
        src={Img}
        alt={title}
      />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Score : Not taken yet</p>
      </div>
    </div>
  );
}
