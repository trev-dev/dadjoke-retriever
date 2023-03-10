import axios from 'axios';

/**
 * @typedef {Object} JokeData
 * @property {string} id
 * @property {string} joke
 * @property {number} status
 */

/**
 * Retrieve one high quality joke.
 *
 * @returns {JokeData} A joke from icanhazdadjoke.com
 */
export async function getJoke() {
  const { data } = await axios.get('https://icanhazdadjoke.com', {
    headers: {
      'Accept': 'application/json'
    }
  });
  return data;
}

/**
 * Get any number of bad-...I mean *rad* jokes.
 *
 * @param {number} count - The number of jokes to get
 * @returns {Promise<JokeData[]>} - A promise of an array of joke objects
 */
export async function getJokes(count) {
  /** @type {JokeData[]} */
  let promises = [];

  let i = 0;
  for (i; i < count; i++) {
    promises.push(getJoke());
  }

  return Promise.all(promises)
}
