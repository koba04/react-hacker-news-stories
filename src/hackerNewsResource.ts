import { unstable_createResource as createResource } from "react-cache";

import {
  fetchHackerNews,
  fetchHackerNewsComments,
  Story,
  Comment
} from "./hackerNews";

export const storiesResource = createResource<number, Story[]>(fetchHackerNews);

export const commentsResource = createResource<number[], Comment[]>(
  fetchHackerNewsComments,
  ids => ids.sort().join()
);
