import React from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

function Playground() {
  const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
  });
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app </h2>
      </div>
    </ApolloProvider>
  );
}

export default Playground;
