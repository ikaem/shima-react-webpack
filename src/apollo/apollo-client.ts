import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";

export interface LoggedUserInterface {
  _id: string;
  name: string;
  email: string;
}

const gqlEndpoint = process.env.API_GRAPHQL;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        loggedUser: {
          read: (cachedLoggedUser: LoggedUserInterface) => {
            if (!cachedLoggedUser)
              return {
                _id: "",
                name: "",
                email: "",
              };
            return cachedLoggedUser;
          },
        },
      },
    },
  },
});
const httpLink = createHttpLink({
  uri: gqlEndpoint,
  // uri: "http://localhost:6000/graphql",
});

const client = new ApolloClient({
  cache,
  link: httpLink,
});

export default client;
