import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const abortController = new AbortController();

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    mode: "cors",
    signal: abortController.signal,
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ networkError }) => {
  if (!networkError) {
    return;
  }

  // resolve networkErro
});

const graphQLClient = new ApolloClient({
  //link: from([authLink.concat(httpLink), errorLink]),
  link: authLink.concat(errorLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default graphQLClient;
