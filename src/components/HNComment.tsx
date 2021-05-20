import React from "react";
import { useCommentsResource } from "../hackerNewsResource";

interface Props {
  commentIds: number[];
}

const HNComment = (props: Props) => {
  const { data: comments } = useCommentsResource(props.commentIds);
  return (
    <ul>
      {comments &&
        comments.map(comment => (
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
