import { person, social } from '@fck/lib/once-ui/content';

import { Status } from '@fck/lib/observability/status';
import { Flex } from './Flex';
import { IconButton } from './IconButton';
import { SmartLink } from './SmartLink';
import { Text } from './text';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      position="relative"
      fillWidth
      padding="8"
      horizontal="center"
      mobileDirection="column"
      className="footer"
    >
      <Flex
        className="mobile"
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="space-between"
        vertical="center"
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
          <Text onBackground="neutral-weak">
            {/* Usage of this template requires attribution. Please don't remove the link to Once UI. */}
            / Build your portfolio with{' '}
            <SmartLink
              style={{ marginLeft: '-0.125rem' }}
              href="https://once-ui.com/templates/magic-portfolio"
            >
              Once UI
            </SmartLink>
          </Text>
        </Text>
        <Flex gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              )
          )}
        </Flex>
      </Flex>
      <Status />
      <Flex height="80" show="s" />
    </Flex>
  );
};
