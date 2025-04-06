import { Column } from "@fck/lib/once-ui/ui/components/Column";
import { Heading } from "@fck/lib/once-ui/ui/components/Heading";
import { Text } from "@fck/lib/once-ui/ui/components/Text";

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        Page Not Found
      </Heading>
      <Text onBackground="neutral-weak">The page you are looking for does not exist.</Text>
    </Column>
  );
}
