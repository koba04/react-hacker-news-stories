import React from "react";
import { Comment } from "../hackerNews";

interface Props {
  comments: Comment[];
}

const HNComment = (props: Props) => {
  return (
    <ul>
      {props.comments.map(comment => (
        <li key={comment.id}>
          <p
            dangerouslySetInnerHTML={{
              __html: `${comment.text} (by ${comment.by})`
            }}
          />
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default HNComment;
