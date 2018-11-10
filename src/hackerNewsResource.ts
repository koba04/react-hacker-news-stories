import { unstable_createResource as createResource } from "react-cache";

import {
  fetchHackerNews,
  fetchHackerNewsComments,
  Story,
  Comment
} from "./hackerNews";

export const storiesResource = createResource<Story[]>((count: number) => {
  return fetchHackerNews(count);
});

export const commentsResource = createResource<Comment[]>(
  ids => {
    return fetchHackerNewsComments(ids);
  },
  ids => ids.sort().join()
);
