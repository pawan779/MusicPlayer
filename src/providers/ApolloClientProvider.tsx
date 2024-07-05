import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
  uri: "https://blasar.us-east-a.ibm.stepzen.net/api/sad-camel/__graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      "apikey blasar::local.net+1000::91e831977f604adb97a4986f923238073d6abb470691d8242f1ae4b66996032c",
  },
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
