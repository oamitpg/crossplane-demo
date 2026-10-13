import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { HomePageWidgetBlueprint } from '@backstage/plugin-home-react/alpha';
import { ButtonLink, Flex, Text } from '@backstage/ui';

const Welcome = () => (
  <Flex direction="column" gap="4">
    <Flex direction="column" gap="1">
      <Text variant="title-medium" weight="bold">
        Welcome to the Lab portal
      </Text>
      <Text variant="body-medium" color="secondary">
        Find any service and its owner, read its docs, check how it is deployed,
        and stand up something new, all in one place.
      </Text>
    </Flex>
    <Flex gap="2" style={{ flexWrap: 'wrap' }}>
      <ButtonLink href="/catalog" variant="primary">
        Browse the catalog
      </ButtonLink>
      <ButtonLink href="/docs?filters[user]=owned" variant="secondary">
        My documentation
      </ButtonLink>
      <ButtonLink href="/create" variant="secondary">
        Create a service
      </ButtonLink>
      <ButtonLink href="/catalog-graph" variant="secondary">
        Explore the graph
      </ButtonLink>
    </Flex>
  </Flex>
);

const welcomeWidget = HomePageWidgetBlueprint.make({
  name: 'lab-welcome',
  params: {
    name: 'LabWelcome',
    title: 'Welcome',
    description: 'Introduction and shortcuts to the main areas of the portal',
    components: async () => ({
      Content: Welcome,
    }),
  },
});

export const homeModule = createFrontendModule({
  pluginId: 'home',
  extensions: [welcomeWidget],
});
