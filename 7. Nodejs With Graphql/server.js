import { config } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./src/graphql/schema.js";
import { resolvers } from "./src/graphql/resolvers.js";
import { connectToDB } from "./src/database/db.js";

config();

async function startServer() {
    await connectToDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT }
    });

    console.log(`Server started on: ${url}`);
}

startServer();