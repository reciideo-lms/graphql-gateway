import "reflect-metadata"
import {ApolloServer} from 'apollo-server';
import {buildSchema} from 'type-graphql';
import {LecturerResolver} from './resolver/LecturerResolver';

async function bootstrap(): Promise<void> {
    const schema = await buildSchema({
        resolvers: [
            LecturerResolver
        ],
        emitSchemaFile: {
            commentDescriptions: true,
            sortedSchema: true,
        }
    })

    const server = new ApolloServer({
        schema
    })

    server.listen()
        .then(({url}) => console.log(`Server ready at ${url}`));
}

bootstrap()
