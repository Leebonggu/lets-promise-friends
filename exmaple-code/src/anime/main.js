/**
 * 애니메이션 검색
 *
 * 사용할 API:
 * - url: `https://api.jikan.moe/v4/anime?q=${query}&page=1&limit=10`
 * - query: 검색어
 *
 * API 문서: https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch
 */

const results = document.querySelector('#results');
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();


  let result = ''

  try {
    const query = event.target.query.value

    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&page=1&limit=10`)
    result = await response.json();
  } catch(error) {
    console.log(error);
  }

  if (result) {
    return;
  }
  
}, false);

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    new Image().onload = () => {
      resolve(src)
    }
  })
}