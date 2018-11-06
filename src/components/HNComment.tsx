import React, { Suspense } from "react";
import styled from "styled-components";
import { unstable_createResource as createResource } from "react-cache";
import { fetchHackerNewsComments, Comment } from "../hackerNews";

import Loading from "./Loading";

interface Props {
  commentIds: number[];
  onClose: () => void;
}

const commentsResource = createResource<Comment[]>(
  ids => {
    return fetchHackerNewsComments(ids);
  },
  ids => ids.sort().join()
);

const HNComment = (props: { commentIds: number[] }) => {
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
