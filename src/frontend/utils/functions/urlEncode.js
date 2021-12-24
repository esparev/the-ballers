/**
 * Encodes the necessary characters to
 * parse it in a url
 * @param {string} str
 * @returns
 */
const urlEncode = (str) => {
  return str
    .replaceAll('#', '%23')
    .replaceAll('/', '%2F')
    .replaceAll(':', '%3A');
}

export default urlEncode;