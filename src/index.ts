import 'reflect-metadata'
import {ApolloServer} from 'apollo-server';
import {buildSchema} from 'type-graphql';
import {LecturerResolver} from './resolver/LecturerResolver';
import {Cache} from './util/Cache';
import {Container} from 'typedi';


const cache = new Cache(
    parseInt(process.env.CACHE_TTL) || 3600,
    parseInt(process.env.CACHE_PERIOD) || 600
)
Container.set({
    id: 'cache',
    factory: () => cache
})

async function bootstrap(): Promise<void> {
    const schema = await buildSchema({
        resolvers: [
            LecturerResolver
        ],
        container: Container,
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
