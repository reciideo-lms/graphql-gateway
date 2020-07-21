import fetch, { Response } from 'node-fetch'

export function get<T> (url: string): Promise<T> {
  return fetch(url).then((response: Response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<T>
  })
}
