'use client';

import Column from '@fck/components/ui/Column';
import Heading from '@fck/components/ui/Heading';
import SmartImage from '@fck/components/ui/SmartImage';
import SmartLink from '@fck/components/ui/SmartLink';
import Tag from '@fck/components/ui/Tag';
import Text from '@fck/components/ui/Text';
import Flex from '@fck/components/ui/Flex';

import { formatDate } from '@fck/lib/once-ui/utils/formatDate';

interface PostProps {
  post: any;
  thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
  const tags = post.metadata.tag.split(',').map((tag: string) => tag.trim());

  return (
    <SmartLink
      fillWidth
      className="hover"
      unstyled
      key={post.slug}
      href={`/blog/${post.slug}`}
    >
      <Flex
        position="relative"
        mobileDirection="column"
        fillWidth
        paddingY="12"
        paddingX="16"
        gap="32"
      >
        {post.metadata.image && thumbnail && (
          <SmartImage
            priority
            maxWidth={20}
            className="image"
            sizes="640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="m"
            src={post.metadata.image}
            alt={'Thumbnail of ' + post.metadata.title}
            aspectRatio="16 / 9"
          />
        )}
        <Column position="relative" fillWidth gap="8" vertical="center">
          <Heading as="h2" variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt &&
              formatDate(post.metadata.publishedAt, false)}
          </Text>
          {tags.length > 0 && (
            <Flex gap="8">
              {tags.map((tag: string, index: number) =>
                index < 3 ? (
                  <Tag key={index} label={tag} variant="neutral" />
                ) : null
              )}
            </Flex>
          )}
        </Column>
      </Flex>
    </SmartLink>
  );
}
