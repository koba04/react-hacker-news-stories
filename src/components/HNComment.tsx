import React from "react";
import { Comment } from "../hackerNews";
import { commentsResource } from "../hackerNewsResource";

interface Props {
  commentIds: number[];
}

const HNComment = (props: Props) => {
  const comments = commentsResource.read(props.commentIds);
  return (
    <ul>
      {comments.map(comment => (
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
