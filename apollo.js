require('graphql-import-node');
const {ApolloServer} = require("@apollo/server");
const {startStandaloneServer} = require("@apollo/server/standalone");
const schema = require('./schema.graphql');
const {buildASTSchema} = require("graphql/utilities");

async function bootstrap() {
    const typeDefs = buildASTSchema(schema);
    const books = [
        {
            title: 'The Awakening',
            author: 'Kate Chopin',
        },
        {
            title: 'City of Glass',
            author: 'Paul Auster',
        },
    ];
    const resolvers = {
        Query: {
            books: () => books,
        },
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const {url} = await startStandaloneServer(server, {
        listen: {port: 9090},
    });
    console.log(`🚀  Server ready at: ${url}`);
}

bootstrap();
