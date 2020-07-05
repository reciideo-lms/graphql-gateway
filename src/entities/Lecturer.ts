import {Field, ID, ObjectType} from 'type-graphql';
import {LecturerPlatform} from './LecturerPlatform';

@ObjectType()
export class Lecturer {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    forename: string;

    @Field(() => String)
    surname: string;

    @Field(() => String)
    username: string;

    @Field(() => String, {nullable: true})
    description: string;

    @Field(() => [LecturerPlatform], {nullable: true})
    platforms: LecturerPlatform[]

    @Field(() => String)
    updatedAt: Date;

    @Field(() => String)
    createdAt: Date;
}
