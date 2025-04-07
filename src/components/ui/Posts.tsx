import Grid from '@fck/components/ui/Grid';
import type { getPosts } from '@fck/lib/once-ui/utils/utils';
import Post from './Post';

type PostData = ReturnType<typeof getPosts>[0];

interface PostsProps {
  range?: [number] | [number, number];
  columns?: '1' | '2' | '3';
  thumbnail?: boolean;
  allBlogs: PostData[];
}

export default function Posts({
  range,
  columns = '1',
  thumbnail = false,
  allBlogs,
}: PostsProps) {
  const blogsToDisplay = range
    ? allBlogs.slice(range[0] - 1, range[1])
    : allBlogs;

  return (
    <>
      {blogsToDisplay.length > 0 && (
        <Grid
          columns={columns}
          mobileColumns="1"
          fillWidth
          marginBottom="40"
          gap="m"
        >
          {blogsToDisplay.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} />
          ))}
        </Grid>
      )}
    </>
  );
}
