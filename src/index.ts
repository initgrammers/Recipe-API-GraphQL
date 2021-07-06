import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Container } from 'typedi';
import * as TypeOrm from 'typeorm';
import { UserResolver, CategoryResolver, RecipeResolver } from "./resolvers";


TypeOrm.useContainer(Container);

const main = async () => {
    try {
        const app = express();

    app.get('/', (_, res) => {
        res.send("Hello, Welcome to Apollo Server, with Graphql and TypeORM, for test api please visit '/graphql'");
    });


    await TypeOrm.createConnection();

    
    const schema = await buildSchema({
        resolvers: [UserResolver, CategoryResolver, RecipeResolver],
        container: Container,
        emitSchemaFile: true
    })

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app, path: "/graphql" });

    const port = process.env.SERVER_PORT || 5000;

    app.listen(port, () =>  
        console.log("Server on port 5000"),
    );
    } catch (error) {
        console.log(error)
    }
    
    
}

main()