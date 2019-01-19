export interface Story {
  id: number;
  rank: number;
  title: string;
  by: string;
  url: string;
  kids: [];
}

export interface Comment {
  id: number;
  by: string;
  text: string;
}

export const fetchHackerNews = async (count: number): Promise<Story[]> => {
  const ids = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  ).then(res => res.json());
  const stories: any = await Promise.all(
    ids.slice(0, count).map(
      async (id: number, index: number): Promise<Story> => {
        const story: Story = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        ).then(res => res.json());
        story.rank = index + 1;
        return story;
      }
    )
  );
  console.log(stories);
  return stories.sort((a: Story, b: Story) => a.rank - b.rank);
};

export const fetchHackerNewsComments = async (
  commentIds: number[]
): Promise<Comment[]> => {
  return Promise.all(
    commentIds.map(commentId =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
      ).then(res => res.json())
    )
  ).then(comments => comments.filter(Boolean));
};

export const filterStories = (
  stories: Story[],
  filterText: string
): Story[] => {
  const loweredFilterText = filterText.toLowerCase();
  return stories.filter(
    story =>
      !loweredFilterText ||
      story.title.toLowerCase().indexOf(loweredFilterText) !== -1 ||
      story.by.toLowerCase().indexOf(loweredFilterText) !== -1
  );
};
