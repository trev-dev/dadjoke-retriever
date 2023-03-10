import axios from 'axios';

/**
 * @typedef {Object} JokeData
 * @property {string} id
 * @property {string} joke 
 * @property {number} status
 */

/**
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
