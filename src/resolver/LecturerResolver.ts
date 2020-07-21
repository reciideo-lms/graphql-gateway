import { Query, ResolverInterface } from 'type-graphql'
import { Lecturer } from '../entities/Lecturer'
import { Cache } from '../util/Cache'
import { get } from '../util/Fetch'
import { Container } from 'typedi'

// @ts-ignore
export class LecturerResolver implements ResolverInterface<Lecturer> {
  private readonly baseUrl = process.env.LECTURER_BASE_URL
  private readonly cache: Cache

  constructor () {
    this.cache = Container.get<Cache>('cache')
  }

  @Query(() => [Lecturer])
  async getAllLecturer (): Promise<Lecturer[]> {
    return this.cache.get('lecturerAll', () => {
      return get<Lecturer[]>(`${this.baseUrl}/lecturer`)
    })
  }
}
