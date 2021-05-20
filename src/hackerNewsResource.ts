
import useSWR from "swr";

import {
  fetchHackerNews,
  fetchHackerNewsComments,
} from "./hackerNews";

export const useStoriesResource = (count: number) => useSWR('storeis', () => fetchHackerNews(count), { suspense: true });

export const useCommentsResource = (ids: number[]) => useSWR(['comment', ids.sort()], (_, ids) => fetchHackerNewsComments(ids), { suspense: true });

