/**
 * Encodes the necessary characters 
 * to parse it in a URL
 * @param {string} url - URL to encode
 * @returns encoded URL
 */
const urlEncode = (url) => {
  return url
    .replaceAll('#', '%23')
    .replaceAll('/', '%2F')
    .replaceAll(':', '%3A');
}

export default urlEncode;