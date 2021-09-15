import useSWR from 'swr'
import fetcher from './fetch'

// export function useCurrentUser() {
//   const { data, mutate } = useSWR(() => '/api/user', fetcher)
//   const user = data ? data.user : null
//   return [user, { mutate }]
// }

// export function useUser(id) {
//   const { data } = useSWR(`/api/users/${id}`, fetcher)
//   return data?.user
// }
export function useLeaderboard(categoryId) {
  const { data, mutate } = useSWR(
    `/api/leaderboard?categoryId=${categoryId}`,
    fetcher
  )
  return { leaderboard: data?.leaderboard || null, mutate }
}
