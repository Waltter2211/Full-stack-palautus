import '@testing-library/jest-native/extend-expect';

import { Text, TextInput, Pressable, View, FlatList, Image } from 'react-native';
import { render, fireEvent, screen } from '@testing-library/react-native';

const repositories = {
    totalCount: 8,
    pageInfo: {
      hasNextPage: true,
      endCursor:
        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
      startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
    },
    edges: [
      {
        node: {
          id: 'jaredpalmer.formik',
          fullName: 'jaredpalmer/formik',
          description: 'Build forms in React, without the tears',
          language: 'TypeScript',
          forksCount: 1619,
          stargazersCount: 21856,
          ratingAverage: 88,
          reviewCount: 3,
          ownerAvatarUrl:
            'https://avatars2.githubusercontent.com/u/4060187?v=4',
        },
        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
      },
      {
        node: {
          id: 'async-library.react-async',
          fullName: 'async-library/react-async',
          description: 'Flexible promise-based React data loader',
          language: 'JavaScript',
          forksCount: 69,
          stargazersCount: 1760,
          ratingAverage: 72,
          reviewCount: 3,
          ownerAvatarUrl:
            'https://avatars1.githubusercontent.com/u/54310907?v=4',
        },
        cursor:
          'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
      },
    ],
  };

  const RepositoryItem = ({ ownerAvatarUrl, fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage }) => {
      return (
        <View testID="repositoryItem">
          <View>
            <View>
              <Image source={{uri: ownerAvatarUrl}}></Image>
            </View>
            <View>
              <Text>{fullName}</Text>
              <Text>{description}</Text>
              <Text>{language}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{stargazersCount}</Text>
              <Text>Stars</Text>
            </View>
            <View>
              <Text>{forksCount}</Text>
              <Text>Forks</Text>
            </View>
            <View>
              <Text>{reviewCount}</Text>
              <Text>Reviews</Text>
            </View>
            <View>
              <Text>{ratingAverage}</Text>
              <Text>Rating</Text>
            </View>
          </View>
        </View>
      )
    }

    const RepositoryListContainer = ({ repositories }) => {
      const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];
    
      return (
        <FlatList
          data={repositoryNodes}
          // ...
        />
      );
    };
    
    const RepositoryList = () => {
      const { repositories } = useRepositories();
    
      return <RepositoryListContainer repositories={repositories} />;
    };

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        // Add your test code here
        render(<RepositoryListContainer repositories={repositories} />)
        render(<RepositoryItem fullName='fullName' description='description' language='language' />)

        const repositoryItems = screen.getAllByTestId('repositoryItem');
        const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

        screen.debug(repositoryItems, firstRepositoryItem, secondRepositoryItem)
        expect(screen.getByText('fullName')).toBeDefined();
        expect(screen.getByText('description')).toBeDefined();
        expect(screen.getByText('language')).toBeDefined();
        expect(screen.getByText('Stars')).toBeDefined();
        expect(screen.getByText('Forks')).toBeDefined();
        expect(screen.getByText('Reviews')).toBeDefined();
        expect(screen.getByText('Rating')).toBeDefined();
      });
    });
  });