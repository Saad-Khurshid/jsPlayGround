import React from "react";

const Like = (props) => {
  let classes = props.liked ? "fa fa-heart" : "fa fa-heart-o";

  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={props.onLike}
      aria-hidden={true}
    />
  );
};

export default Like;
