import { unstable_createResource } from "react-cache";
import { fetchHackerNews, fetchHackerNewsComments } from "./hackerNews";

export const storiesResouce = unstable_createResource(fetchHackerNews);
export const commentsResource = unstable_createResource(
  fetchHackerNewsComments,
  commentIds => commentIds.join()
);
