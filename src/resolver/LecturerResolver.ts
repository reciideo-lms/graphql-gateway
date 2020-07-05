import {Query, ResolverInterface} from 'type-graphql';
import {Lecturer} from '../entities/Lecturer';
import fetch, {Response} from 'node-fetch';

// @ts-ignore
export class LecturerResolver implements ResolverInterface<Lecturer> {
    private readonly baseUrl = process.env.LECTURER_BASE_URL

    @Query(() => [Lecturer])
    async getAllLecturer(): Promise<Lecturer[]> {
        // @ts-ignore
        return fetch<Lecturer[]>(`${this.baseUrl}/lecturer`).then((response: Response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            // @ts-ignore
            return response.json<Lecturer[]>()
        })
    }
}
