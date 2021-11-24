import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { useLoaderData } from 'remix';

const client = new ApolloClient({
  uri: 'https://graphql.bxjs.dev/v1/graphql',
  cache: new InMemoryCache(),
});

const BXJS_POSTS = gql`
  query GetExchangeRates {
    bxjsweekly_episodes {
      id
      name
    }
  }
`;

export let loader = async () => {
  const { error, data } = await client.query({ query: BXJS_POSTS });
  return { error, data };
};

export default function BxJSPosts() {
  const { error, data } = useLoaderData();

  if (error) return <p>Error :(</p>;

  return data.bxjsweekly_episodes.map(({ id, name }) => (
    <div key={id}>
      <p>
        {id}: {name}
      </p>
    </div>
  ));
}
