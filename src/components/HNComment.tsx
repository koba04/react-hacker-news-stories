import React from "react";
import { unstable_createResource as createResource } from "react-cache";
import { fetchHackerNewsComments, Comment } from "../hackerNews";

interface Props {
  commentIds: number[];
}

const commentsResource = createResource<Comment[]>(
  ids => {
    return fetchHackerNewsComments(ids);
  },
  ids => ids.sort().join()
);

const HNComment = (props: Props) => {
  const comments = commentsResource.read(props.commentIds);
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
