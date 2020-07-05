import {Field, ID, ObjectType} from 'type-graphql';

@ObjectType()
export class LecturerPlatform {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    platform: string;

    @Field(() => String)
    url: string;
}
