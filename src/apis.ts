import { PromiseType } from "./types"

const LIMIT = 1

const generateEndPointWithQueryParams = (endPoint: string, queryParams: string | number) => {
  return `${endPoint}?${queryParams}`
}



export const getTopAnime = generateEndPointWithQueryParams('https://api.jikan.moe/v4/top/anime', LIMIT)
export const getTopManga = generateEndPointWithQueryParams('https://api.jikan.moe/v4/top/manga', LIMIT)
export const getTopPeople = generateEndPointWithQueryParams('https://api.jikan.moe/v4/top/people', LIMIT)
export const getTopCharacters = generateEndPointWithQueryParams('https://api.jikan.moe/v4/top/characters', LIMIT)
export const getTopReviews = generateEndPointWithQueryParams('https://api.jikan.moe/v4/top/reviews', LIMIT)

export const fetchGetTopAnime = () => fetch(getTopAnime).then(res => res.json())
export const fetchGetTopManga = () => fetch(getTopManga).then(res => res.json())
export const fetchGetTopPeople = () => fetch(getTopPeople).then(res => res.json())
export const fetchGetTopCharacters = () => fetch(getTopCharacters).then(res => res.json())
export const fetchGetTopReviews = () => fetch(getTopReviews).then(res => res.json())

const CALL_ARRAY = [
  fetchGetTopAnime(),
  fetchGetTopCharacters(),
  fetchGetTopManga(),
  // fetchGetTopPeople(),
  // fetchGetTopReviews()
]

export const getPromiseCallByType = (type: PromiseType) => {
  switch(type) {
    case 'all': {
      return Promise.all(CALL_ARRAY)
    }
    case 'race': {
      return Promise.race(CALL_ARRAY)
    }
    case 'any': {
      return Promise.any(CALL_ARRAY)
    }
    case 'settled': {
      return Promise.allSettled(CALL_ARRAY)
    }
    default:
      return 'init'
  }
}